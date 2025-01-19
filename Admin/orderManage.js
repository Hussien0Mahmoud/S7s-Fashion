
let customerName=document.querySelector('#customerName')
let ProductName=document.querySelector('#ProductName')
let orderDate=document.querySelector('#orderDate')

let submitOrder=document.querySelector('#submitOrder')
let errorSpan=document.querySelector('#error')
let targetTable=document.querySelector('table')



async function fetchOrders() {
    const response = await fetch("http://localhost:3000/orders");
    const orders = await response.json();
    return orders;
  }
  //   console.log("ffffffffffff"
  fetchOrders().then((orders) => {
    // console.log(orders)
    orders.forEach((order) => {
      targetTable.innerHTML += `
                  <tr>
                      <td>${order.id}</td>
                      <td>${order.customername}</td>
                      <td>${order.productname}</td>
                      <td>${order.date}</td>
                      <td>
                          <button id="delBtn" data-id="${order.id}">delet</button>
                          <button id="upBtn"  data-id="${order.id}">update</button>
                      </td>
                  </tr>
          `;
    });
  });



  
async function fetchOrder(id) {
    const response = await fetch(`http://localhost:3000/orders/${id}`);
    const orders = await response.json();
    return orders;
  }
  
  async function updateOrders(id) {
    let popupForm = document.getElementById("popupForm");
    let updateForm = document.getElementById("updateForm");
    
    popupForm.style.display = "flex";
    
    let updateCustomerName = document.querySelector("#updateCustomerName");
    let updateProductName = document.querySelector("#updateProductName");
    let updateOrderDate = document.querySelector("#updateOrderDate");
    
    let order = await fetchOrder(id)
    updateCustomerName.value=order.customername
    updateProductName.value=order.productname
    updateOrderDate.value=order.date
  
   
  
    updateForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const updateOrder = async (body,id) => {
        const res = await fetch(`http://localhost:3000/orders/${id}`, {
            method: "put",
            body: JSON.stringify(body),
            })
      }
    const order = {
        customername: updateCustomerName.value,
        productname: updateProductName.value,
        date: updateOrderDate.value
    };
    updateOrder(order,id)
      popupForm.style.display = "none";
    });
  }
  
  targetTable.addEventListener("click", async (event) => {
      
      if (event.target && event.target.id === "delBtn") {
        const orderId = event.target.getAttribute("data-id"); 
        const row = event.target.closest("tr"); 
  
        const confirmDelete = confirm("Are you sure you want to delete this order?");
        if (!confirmDelete) return;
  
          await fetch(`http://localhost:3000/orders/${orderId}`, {
            method: "DELETE",
          });
  
            row.remove();
            console.log(`Order with ID ${orderId} deleted successfully.`);
  
      }
  
      if (event.target && event.target.id === "upBtn") {
        const orderId = event.target.getAttribute("data-id"); 
        await updateOrders(orderId)
  
      }
  
    });
  
    let cancel = document.getElementById("cancel");
    cancel.addEventListener('click',()=>{
      document.getElementById("popupForm").style.display="none"
  
    })
  



















// submitOrder.addEventListener("click",(e)=>{
//     let customerNameValue = customerName.value.trim();
//     let ProductNameValue = ProductName.value.trim();
//     let orderDateValue = orderDate.value.trim();
//     if(customerNameValue=="" || ProductNameValue==""  || orderDateValue==""){
//         e.preventDefault();
//         errorSpan.innerText="Please fill all fields";
//     }
//     let createdTr= document.createElement('tr');


//     let createdCustomerName= document.createElement('td');
//     createdCustomerName.innerText=customerNameValue
//     createdTr.appendChild(createdCustomerName)
//     targetTable.appendChild(createdTr)
//     customerName.value=" "

//     let createdProductName= document.createElement('td');
//     createdProductName.innerText=ProductNameValue
//     createdTr.appendChild(createdProductName)
//     targetTable.appendChild(createdTr)
//     customerName.value=" "

//     let createdOrderDate= document.createElement('td');
//     createdOrderDate.innerText=orderDateValue
//     createdTr.appendChild(createdOrderDate)
//     targetTable.appendChild(createdTr)
//     customerName.value=" "


//     let createdCustomerAction= document.createElement('td');
//     let delButton = document.createElement("button");
//     delButton.innerText="Delete"
//     createdCustomerAction.appendChild(delButton)
//     createdTr.appendChild(createdCustomerAction)
//     targetTable.appendChild(createdTr)
   


//     delButton.addEventListener('click',function(){
//         targetTable.removeChild(createdTr)
//     })
    
// })












