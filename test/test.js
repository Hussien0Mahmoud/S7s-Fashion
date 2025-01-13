let ProductContainer = document.querySelector(".product-container");

async function fetchProducts() {
  const response = await fetch('http://localhost:3000/products'); // Fetch products
  const products = await response.json(); // Parse the JSON response
  return products; // Return the products array
}

// Fetch and display products
fetchProducts()
  .then((products) => {
    products.forEach((product) => {
      ProductContainer.innerHTML += `
      <div class="card">
          <img src="${product.image}" alt="Product Image">
          <div class="details">
            <h2>${product.title}</h2>
            <p>This shirt is stylish, comfortable, trendy, durable, lightweight.</p>
            <div class="price-btn">
              <h5>${product.price}$</h5>
              <button>Add To Cart</button>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch((error) => {
    console.error('Error fetching products:', error);
  });



  
//  let form = document.getElementById("form");
//  let name = document.getElementById("name");
//  let email = document.getElementById("email");
//  let password = document.getElementById("password");
//  let confPassword = document.getElementById("confpassword");

//  let nameerror = document.getElementById("nameError");
//  let emailerror = document.getElementById("emailError");
//  let passworderror = document.getElementById("passwordError");
//  let confpassworderror = document.getElementById("confpasswordError");


// //  const addUser = async (body) => {
// //   const res = await fetch("http://localhost:3000/users", {
// //       method: "POST",
// //       body: JSON.stringify(body)
// //   })
// // }

//  form.addEventListener("submit", function(event) {
//    event.preventDefault(); 

//    nameerror.textContent = "";
//    emailerror.textContent = "";
//    passworderror.textContent = "";
//    confpassworderror.textContent = "";

//    let isValid = true;

//    if (name.value.trim() === "") {
//      nameerror.textContent = "Name is required.";
//      isValid = false;
//    }

//    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//    if (email.value.trim() === "") {
//      emailerror.textContent = "Email is required.";
//      isValid = false;
//    } else if (!emailPattern.test(email.value.trim())) {
//      emailerror.textContent = "Invalid email format.";
//      isValid = false;
//    }

//    if (password.value.trim() === "") {
//      passworderror.textContent = "Password is required.";
//      isValid = false;
//    } else if (password.value.trim().length < 6) {
//      passworderror.textContent = "Password must be at least 6 characters long.";
//      isValid = false;
//    }

//    if (confPassword.value.trim() === "") {
//      confpassworderror.textContent = "Confirm password is required.";
//      isValid = false;
//    } else if (confPassword.value.trim() !== password.value.trim()) {
//      confpassworderror.textContent = "Passwords do not match.";
//      isValid = false;
//    }

//    if (isValid) {
//      alert("Form submitted successfully!");
//      form.reset();
//    }

//    const addUser = async (body) => {
//     const res = await fetch("http://localhost:3000/users", {
//         method: "POST",
//         body: JSON.stringify(body)
//     })
//   }
//    // add user to json
//    const user = {
//     username: name.value,
//     email: email.value,
//     password: password.value,
//     role: "customer",
// }



// addUser(user);


//  });