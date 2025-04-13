let customerName = document.querySelector('#customerName');
let ProductName = document.querySelector('#ProductName');
let orderDate = document.querySelector('#orderDate');

let submitOrder = document.querySelector('#submitOrder');
let errorSpan = document.querySelector('#error');
let targetTable = document.querySelector('table');
let updateForm = document.querySelector('#updateForm');
let popupForm = document.querySelector('#popupForm');

async function fetchOrders() {
    const response = await fetch("http://localhost:3000/orders");
    const orders = await response.json();
    return orders;
}

function displayOrders(orders) {
    targetTable.innerHTML = `
        <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Items</th>
            <th>Actions</th>
        </tr>
    `;

    orders.forEach((order) => {
        const itemsList = order.items ? 
            order.items.map(item => 
                `${item.productName} (${item.quantity})`
            ).join(', ') : 
            order.productname;

        targetTable.innerHTML += `
            <tr>
                <td>${order.id}</td>
                <td>${order.customerName || order.customername}</td>
                <td>${order.orderDate || order.date}</td>
                <td>$${order.totalAmount || (order.quantity * order.price)}</td>
                <td>
                    <select class="status-select" data-id="${order.id}">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>${itemsList}</td>
                <td>
                    <button class="edit-btn" data-id="${order.id}">Edit</button>
                    <button class="delete-btn" data-id="${order.id}">Delete</button>
                </td>
            </tr>
        `;
    });

    // Add event listeners for status changes
    addStatusChangeListeners();
}

function addStatusChangeListeners() {
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', async (e) => {
            const orderId = e.target.dataset.id;
            const newStatus = e.target.value;
            
            try {
                const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: newStatus })
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Status Updated',
                        text: 'Order status has been updated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update order status'
                });
            }
        });
    });
}

// Handle table actions (Edit and Delete)
targetTable.addEventListener("click", async (event) => {
    const target = event.target;
    const orderId = target.dataset.id;

    if (target.classList.contains('delete-btn')) {
        handleDelete(orderId);
    } else if (target.classList.contains('edit-btn')) {
        handleEdit(orderId);
    }
});

async function handleDelete(orderId) {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#088178',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
        try {
            const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                const orders = await fetchOrders();
                displayOrders(orders);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Order has been deleted.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete order'
            });
        }
    }
}

async function handleEdit(orderId) {
    try {
        const response = await fetch(`http://localhost:3000/orders/${orderId}`);
        const order = await response.json();
        
        // Show update form
        document.getElementById('updateCustomerName').value = order.customerName || order.customername;
        document.getElementById('updateOrderDate').value = order.orderDate || order.date;
        document.getElementById('updateForm').dataset.orderId = orderId;
        popupForm.style.display = 'flex';
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load order details'
        });
    }
}

// Update form submission
updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const orderId = e.target.dataset.orderId;
    
    const updatedOrder = {
        customerName: document.getElementById('updateCustomerName').value,
        orderDate: document.getElementById('updateOrderDate').value
    };

    try {
        const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedOrder)
        });

        if (response.ok) {
            popupForm.style.display = 'none';
            const orders = await fetchOrders();
            displayOrders(orders);
            
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Order has been updated successfully',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update order'
        });
    }
});

// Close update form
document.getElementById('cancel').addEventListener('click', () => {
    popupForm.style.display = 'none';
});

// Initialize orders display
fetchOrders().then(displayOrders);


