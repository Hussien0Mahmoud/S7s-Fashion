
let currentUserString = localStorage.getItem("currentUser");
const currentUser = JSON.parse(currentUserString);

function checkAuthority(allowedRoles) {
  if (currentUserString) {
    return allowedRoles.includes(currentUser.userrole);
  }
  return false; 
}
// console.log(currentUserString)

if(!checkAuthority(["seller"])){
  window.location.href = "../index.html";
}

let productTitle = document.querySelector("#productTitle");
let productDescription = document.querySelector("#productDescription");
let productPrice = document.querySelector("#productPrice");
let productImage = document.querySelector("#productImage");

let submitProduct = document.querySelector("#submitProduct");
let errorSpan = document.querySelector("#error");
let targetTable = document.querySelector("table");

submitProduct.addEventListener("click", (e) => {
  let productTitleValue = productTitle.value.trim();
  let productDescriptionValue = productDescription.value.trim();
  let productPricevalue = productPrice.value.trim();
  let productImageValue = productImage.value.trim();

  let isValid = true;
  if ( 
    productTitleValue == "" || productDescriptionValue == "" || productPricevalue == "" || productImageValue == "" ) {
    errorSpan.innerText = "Please fill all fields";
    e.preventDefault();
  } else {
    const addProduct = async (body) => {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify(body),
      });
    };

    if (isValid) {
      const product = {
        sellerid:currentUser.id,
        title: productTitle.value,
        description: productDescription.value,
        price: productPrice.value,
        image: productImage.value,
        status:"pending"
      };
      addProduct(product);
    }

    delButton.addEventListener("click", function () {
      targetTable.removeChild(createdTr);
    });

    productTitle.value = "";
    productDescription.value = "";
    productPrice.value = "";
    productImage.value = "";
  }
});

// get products ya s7s
async function fetchProducts() {
  const response = await fetch(`http://localhost:3000/products?sellerid=${currentUser.id}`);
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
                    <td>
                        <button id="delBtn" data-id="${product.id}">delet</button>
                        <button id="upBtn"  data-id="${product.id}">update</button>
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
  let updateProductImage = document.querySelector("#updateProductImage");
  
  let product = await fetchProduct(id)
  updateProductTitle.value=product.title
  updateProductDescription.value=product.description
  updateProductPrice.value=product.price
  updateProductImage.value=product.image


  updateForm.addEventListener("submit", function (event) {
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
    image: updateProductImage.value
  };
updateProduct(product,id)
    popupForm.style.display = "none";
    // console.log('User Info Updated:', { productTitle, productDescription, productPrice,productImage });
  });
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