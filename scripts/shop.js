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
  
  Swal.fire({
    icon: 'success',
    title: 'Added to Cart!',
    text: 'Product has been added to your cart',
    showConfirmButton: false,
    timer: 1500,
    position: 'top-end',
    toast: true
  });
}









