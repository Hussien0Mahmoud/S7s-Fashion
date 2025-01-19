
let ProductContainer = document.querySelector(".product-container");
let ProductCards = document.querySelector(".cards");

async function fetchProducts() {
  const response = await fetch("http://localhost:3000/products");
  const products = await response.json();
  return products;
}

fetchProducts()
  .then((products) => {
    products.forEach((product) => {
      // Render the product cards
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
        };

        addToCart(product);
      });
    });
  });

// Function to add a product to local storage
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}




  




