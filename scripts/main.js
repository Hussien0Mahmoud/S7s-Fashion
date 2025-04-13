let ProductCards = document.querySelector(".cards");
let shopNowBtn = document.querySelector("header button");

async function fetchProducts() {
  const response = await fetch("http://localhost:3000/products");
  const products = await response.json();
  return products;
}

// Display only 6 products on home page
fetchProducts()
  .then((products) => {
    // Clear existing card
    ProductCards.innerHTML = "";
    
    // Get first 6 products with status "approved"
    const approvedProducts = products.filter(product => product.status === "approved");
    const displayProducts = approvedProducts.slice(0, 4);

    displayProducts.forEach((product) => {
      ProductCards.innerHTML += `
        <div class="card">
            <img src="${product.image}" alt="product Image" />
            <div class="details">
              <h2>${product.title}</h2>
              <p>
                ${product.description}
              </p>
              <div class="price-btn">
                <h5>${product.price}</h5>
                <button class="add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Add To Cart</button>
              </div>
            </div>
          </div>
        `;
    });

    // Add event listeners to all "Add To Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const product = {
          id: button.dataset.id,
          title: button.dataset.title,
          price: button.dataset.price,
          image: button.dataset.image,
          quantity: 1,
        };

        addToCart(product);
      });
    });
  });

// Function to add a product to local storage
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}

// Add click handler for "Shop Now" button
shopNowBtn.addEventListener("click", () => {
  window.location.href = "./html/shop.html";
});