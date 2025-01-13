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
              <button>Add To Cart</button>
            </div>
          </div>
        </div>
      `;
    });
  })

