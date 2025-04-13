let CartContainer = document.querySelector(".products");
let checkoutBtn = document.createElement("button");
let totalAmount = 0;

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  CartContainer.innerHTML = ""; // Clear container first
  totalAmount = 0;

  if (cart.length === 0) {
    CartContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <a href="shop.html" class="shop-now-btn">Start Shopping</a>
      </div>
    `;
    return;
  }

  // Display cart items
  cart.forEach((product) => {
    // Remove $ sign and convert to number for calculation
    const priceNumber = parseFloat(product.price.replace('$', ''));
    const itemTotal = (priceNumber * product.quantity).toFixed(2);
    totalAmount += parseFloat(itemTotal);

    CartContainer.innerHTML += `
    <div class="product" data-id="${product.id}">
            <div class="image">
                <img src="${product.image}" alt="">
            </div>
            <div class="details">
                <div class="head">
                    <h3>${product.title}</h3>
                    <p id="cancel">x</p>
                </div>
                <div class="tail">
                    <p>per each ${product.price}</p>
                    <p class="total-price">Total: $${itemTotal}</p>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span class="quant">${product.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                </div>
            </div>
        </div>`;
  });

  // Add total amount and checkout button
  CartContainer.innerHTML += `
    <div class="cart-summary">
      <h3>Total Amount: $${totalAmount.toFixed(2)}</h3>
    </div>`;

  checkoutBtn.className = "checkout-btn";
  checkoutBtn.textContent = "Checkout";
  CartContainer.appendChild(checkoutBtn);

  addCartEventListeners();
}

function addCartEventListeners() {
  const plusBtns = document.querySelectorAll(".plus");
  const minusBtns = document.querySelectorAll(".minus");
  const cancelBtns = document.querySelectorAll("#cancel");

  // Plus button handlers
  plusBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const productDiv = this.closest('.product');
      const productId = productDiv.dataset.id;
      updateQuantity(productId, 1);
    });
  });

  // Minus button handlers  
  minusBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const productDiv = this.closest('.product');
      const productId = productDiv.dataset.id;
      updateQuantity(productId, -1);
    });
  });

  // Cancel button handlers
  cancelBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const productDiv = this.closest('.product');
      removeFromCart(productDiv.dataset.id);
    });
  });

  // Checkout handler
  checkoutBtn.addEventListener('click', handleCheckout);
}

async function handleCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    Swal.fire({
      icon: 'warning',
      title: 'Please Login',
      text: 'You need to be logged in to checkout',
      confirmButtonColor: '#088178',
      timer: 5000
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../html/login.html";
      }
    });
    return;
  }

  try {
    // Create a single order with multiple items
    const order = {
      id: generateOrderId(),
      customerId: currentUser.id,
      customerName: currentUser.username,
      orderDate: new Date().toISOString().split('T')[0],
      totalAmount: totalAmount.toFixed(2),
      status: "pending",
      items: cart.map(item => ({
        productId: item.id,
        productName: item.title,
        quantity: item.quantity,
        price: parseFloat(item.price.replace('$', '')),
        subtotal: (parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)
      }))
    };

    // Verify stock and update quantities
    for (let item of order.items) {
      const response = await fetch(`http://localhost:3000/products/${item.productId}`);
      const product = await response.json();
      
      if (parseInt(product.quantity) < item.quantity) {
        alert(`Not enough stock for ${item.productName}`);
        return;
      }

      // Update product quantity
      await fetch(`http://localhost:3000/products/${item.productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: (parseInt(product.quantity) - item.quantity).toString()
        })
      });
    }

    // Create the order
    await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order)
    });

    // Clear cart and refresh display
    localStorage.removeItem("cart");
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Order placed successfully!',
      confirmButtonColor: '#088178',
      timer: 5000, // Increased from 3000 to 5000 ms
      timerProgressBar: true, // Added progress bar
      showConfirmButton: true,
      confirmButtonText: 'Continue Shopping'
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = 'shop.html';
      }
    });
    displayCart();

  } catch (error) {
    console.error("Checkout failed:", error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Checkout failed. Please try again.',
      confirmButtonColor: '#088178',
      timer: 5000, // Increased from 3000 to 5000 ms
      timerProgressBar: true, // Added progress bar
      showConfirmButton: true
    });
  }
}

function generateOrderId() {
  return Math.random().toString(36).substr(2, 9);
}

function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id === productId);
  
  if (index !== -1) {
    const newQuantity = cart[index].quantity + change;
    if (newQuantity > 0) {
      cart[index].quantity = newQuantity;
      
      // Update total price immediately in the DOM
      const productDiv = document.querySelector(`.product[data-id="${productId}"]`);
      const totalPriceElement = productDiv.querySelector('.total-price');
      const priceNumber = parseFloat(cart[index].price.replace('$', ''));
      const newTotal = (priceNumber * newQuantity).toFixed(2);
      totalPriceElement.textContent = `Total: $${newTotal}`;
      
      localStorage.setItem("cart", JSON.stringify(cart));
      
      // Update quantity display
      const quantityElement = productDiv.querySelector('.quant');
      quantityElement.textContent = newQuantity;

      // Update total amount in the DOM
      totalAmount = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')) * item.quantity, 0);
      const cartSummaryElement = document.querySelector('.cart-summary h3');
      if (cartSummaryElement) {
        cartSummaryElement.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
      }
    }
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); // Refresh display
}

// Initialize cart display
displayCart();


