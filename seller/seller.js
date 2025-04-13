let currentUserString = localStorage.getItem("currentUser");
const currentUser = JSON.parse(currentUserString);

function checkAuthority(allowedRoles) {
  if (currentUserString) {
    return allowedRoles.includes(currentUser.userrole);
  }
  return false; 
}

if(!checkAuthority(["seller"])){
  window.location.href = "../index.html";
}

let productTitle = document.querySelector("#productTitle");
let productDescription = document.querySelector("#productDescription");
let productPrice = document.querySelector("#productPrice");
let productImage = document.querySelector("#productImage");
let productQuantity = document.querySelector("#productQuantity");

let submitProduct = document.querySelector("#submitProduct");
let errorSpan = document.querySelector("#error");
let targetTable = document.querySelector("table");

// Update fetchProducts to only get seller's products
async function fetchProducts() {
  try {
    const response = await fetch(`http://localhost:3000/products`);
    const products = await response.json();
    // Filter products by seller ID
    return products.filter(product => product.sellerid === currentUser.id);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to fetch products',
      confirmButtonColor: '#088178'
    });
    return [];
  }
}

// Update the add product function
submitProduct.addEventListener("click", async (e) => {
  e.preventDefault();
  let productTitleValue = productTitle.value.trim();
  let productDescriptionValue = productDescription.value.trim();
  let productPricevalue = productPrice.value.trim();
  let productImageValue = productImage.value.trim();
  let productQuantityValue = productQuantity.value.trim();

  if (!productTitleValue || !productDescriptionValue || !productPricevalue || !productImageValue || !productQuantityValue) {
    Swal.fire({
      icon: 'warning',
      title: 'Required Fields',
      text: 'Please fill all fields',
      confirmButtonColor: '#088178'
    });
    return;
  }

  try {
    const product = {
      sellerid: currentUser.id,
      title: productTitleValue,
      description: productDescriptionValue,
      price: productPricevalue,
      image: productImageValue,
      quantity: productQuantityValue,
      status: "pending"
    };

    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product added successfully',
        showConfirmButton: false,
        timer: 1500
      });

      // Clear form
      productTitle.value = "";
      productDescription.value = "";
      productPrice.value = "";
      productImage.value = "";
      productQuantity.value = "";

      // Refresh products table
      const products = await fetchProducts();
      updateProductsTable(products);
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to add product',
      confirmButtonColor: '#088178'
    });
  }
});

// Add function to update products table
function updateProductsTable(products) {
  targetTable.innerHTML = `
    <tr>
      <th>Product ID</th>
      <th>Product Title</th>
      <th>Product Description</th>
      <th>Product Price</th>
      <th>Product Image</th>
      <th>Quantity</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  `;

  products.forEach((product) => {
    targetTable.innerHTML += `
      <tr>
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td><img src="${product.image}"/></td>
        <td>${product.quantity}</td>
        <td>${product.status}</td>
        <td>
          <button id="upBtn" data-id="${product.id}">Edit</button>
          <button id="delBtn" data-id="${product.id}">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Initialize table with seller's products
fetchProducts().then(updateProductsTable);

async function fetchProduct(id) {
  const response = await fetch(`http://localhost:3000/products/${id}`);
  const products = await response.json();
  return products;
}

async function updateProducts(id) {
  let popupForm = document.getElementById("popupForm");
  let updateForm = document.getElementById("updateForm");

  popupForm.style.display = "flex";
  
  let updateProductTitle = document.querySelector("#updateProductTitle");
  let updateProductDescription = document.querySelector("#updateProductDescription");
  let updateProductPrice = document.querySelector("#updateProductPrice");
  let updateProductImage = document.querySelector("#updateProductImage");
  let updateProductQuantity = document.querySelector("#updateProductQuantity");
  
  try {
    let product = await fetchProduct(id);
    updateProductTitle.value = product.title;
    updateProductDescription.value = product.description;
    updateProductPrice.value = product.price;
    updateProductImage.value = product.image;
    updateProductQuantity.value = product.quantity;

    updateForm.addEventListener("submit", async function(event) {
      event.preventDefault();
      
      try {
        const updatedProduct = {
          sellerid: currentUser.id,
          title: updateProductTitle.value,
          description: updateProductDescription.value,
          price: updateProductPrice.value,
          image: updateProductImage.value,
          quantity: updateProductQuantity.value,
          status: "pending" // Reset status to pending after edit
        };

        const response = await fetch(`http://localhost:3000/products/${id}`, {
          method: "PATCH", // Changed from PUT to PATCH
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedProduct)
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Product has been updated successfully',
            showConfirmButton: false,
            timer: 1500
          });

          popupForm.style.display = "none";
          
          // Refresh the products table
          const products = await fetchProducts();
          updateProductsTable(products);
        } else {
          throw new Error('Failed to update product');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to update product',
          confirmButtonColor: '#088178'
        });
      }
    }, { once: true }); // Add once:true to prevent multiple event listeners

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to load product details',
      confirmButtonColor: '#088178'
    });
  }
}

targetTable.addEventListener("click", async (event) => {
    
    if (event.target && event.target.id === "delBtn") {
      const productId = event.target.getAttribute("data-id"); 
      const row = event.target.closest("tr"); 

      const confirmDelete = confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;

        await fetch(`http://localhost:3000/products/${productId}`, {
          method: "DELETE",
        });

          row.remove();
          console.log(`Product with ID ${productId} deleted successfully.`);

    }

    if (event.target && event.target.id === "upBtn") {
      const productId = event.target.getAttribute("data-id"); 
      await updateProducts(productId)

    }

  });

  let cancel = document.getElementById("cancel");
  cancel.addEventListener('click',()=>{
    document.getElementById("popupForm").style.display="none"

  })