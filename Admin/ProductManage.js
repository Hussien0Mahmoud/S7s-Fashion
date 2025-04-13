let productTitle = document.querySelector("#productTitle");
let productDescription = document.querySelector("#productDescription");
let productPrice = document.querySelector("#productPrice");
let productQuantity = document.querySelector("#productQuantity");
let productImage = document.querySelector("#productImage");

let submitProduct = document.querySelector("#submitProduct");
let errorSpan = document.querySelector("#error");
let targetTable = document.querySelector("table");

submitProduct.addEventListener("click", (e) => {
  let productTitleValue = productTitle.value.trim();
  let productDescriptionValue = productDescription.value.trim();
  let productPricevalue = productPrice.value.trim();
  let productQuantityVale = productQuantity.value.trim();
  let productImageValue = productImage.value.trim();

  let isValid = true;
  if ( 
    productTitleValue == "" || productDescriptionValue == "" || productPricevalue == "" || productImageValue == "" || productQuantityVale == "") {
    Swal.fire({
      icon: 'warning',
      title: 'Required Fields',
      text: 'Please fill all fields',
      confirmButtonColor: '#088178'
    });
    e.preventDefault();
  } else {
    const addProduct = async (body) => {
      try {
        const res = await fetch("http://localhost:3000/products", {
          method: "POST",
          body: JSON.stringify(body),
        });
        if (res.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
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
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add product',
          confirmButtonColor: '#088178'
        });
      }
    };

    if (isValid) {
      const product = {
        title: productTitle.value,
        description: productDescription.value,
        price: productPrice.value,
        image: productImage.value,
        quantity: productQuantity.value,
        status:"approved",
      };
      addProduct(product);
    }

    delButton.addEventListener("click", function () {
      targetTable.removeChild(createdTr);
    });
  }
});

// get products ya s7s
async function fetchProducts() {
  const response = await fetch("http://localhost:3000/products");
  const products = await response.json();
  return products;
}
//   console.log("ffffffffffff"
fetchProducts().then((products) => {
  // console.log(products)
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
                    <button id="upBtn"  data-id="${product.id}">Edit</button>
                    <button id="delBtn" data-id="${product.id}">delete</button>
                    </td>
                </tr>
        `;
  });
});


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
  let updateProductQuantity = document.querySelector("#updateProductQuantity");
  let updateProductImage = document.querySelector("#updateProductImage");
  let updateProductStatus = document.querySelector("#updateProductStatus");
  
  let product = await fetchProduct(id)
  updateProductTitle.value=product.title
  updateProductDescription.value=product.description
  updateProductPrice.value=product.price
  updateProductQuantity.value=product.quantity
  updateProductImage.value=product.image

 

  updateForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const updateProduct = async (body,id) => {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
          method: "put",
          body: JSON.stringify(body),
          })
    }
  const product = {
    title: updateProductTitle.value,
    description: updateProductDescription.value,
    price: updateProductPrice.value,
    image: updateProductImage.value,
    quantity: updateProductQuantity.value,
    status:updateProductStatus.value
  };
  try {
    const res = await fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    if (res.ok) {
      popupForm.style.display = "none";
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Product has been updated successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.reload();
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to update product',
      confirmButtonColor: '#088178'
    });
  }
  });
}

targetTable.addEventListener("click", async (event) => {
    
    if (event.target && event.target.id === "delBtn") {
      const productId = event.target.getAttribute("data-id"); 
      const rowTarget = event.target.closest("tr"); 

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
          const response = await fetch(`http://localhost:3000/products/${productId}`, {
            method: "DELETE",
          });
          if (response.ok) {
            rowTarget.remove();
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Product has been deleted.',
              showConfirmButton: false,
              timer: 1500
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete product',
            confirmButtonColor: '#088178'
          });
        }
      }
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