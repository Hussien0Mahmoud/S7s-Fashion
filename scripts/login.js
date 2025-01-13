
// //  let form = document.getElementById("form");
// //  let email = document.getElementById("email");
// //  let password = document.getElementById("password");

// //  let emailerror = document.getElementById("emailError");
// //  let passworderror = document.getElementById("passwordError");

// //  form.addEventListener("submit", function(event) {
// //    event.preventDefault(); 

// //    emailerror.textContent = "";
// //    passworderror.textContent = "";

// //    let isValid = true;

// //    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //    if (email.value.trim() === "") {
// //      emailerror.textContent = "Email is required.";
// //      isValid = false;
// //    } else if (!emailPattern.test(email.value.trim())) {
// //      emailerror.textContent = "Invalid email format.";
// //      isValid = false;
// //    }

// //    if (password.value.trim() === "") {
// //      passworderror.textContent = "Password is required.";
// //      isValid = false;
// //    } else if (password.value.trim().length < 6) {
// //      passworderror.textContent = "Password must be at least 6 characters long.";
// //      isValid = false;
// //    }

// //    if (isValid) {
// //      alert("Form submitted successfully!");
// //      form.reset();
// //    }
// //  });



// let form = document.getElementById("form");
// let email = document.getElementById("email");
// let password = document.getElementById("password");

// let emailerror = document.getElementById("emailError");
// let passworderror = document.getElementById("passwordError");

// form.addEventListener("submit", async function(event) {
//   event.preventDefault();

//   // Clear previous error messages
//   emailerror.textContent = "";
//   passworderror.textContent = "";

//   let isValid = true;

//   // Validate email
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (email.value.trim() === "") {
//     emailerror.textContent = "Email is required.";
//     isValid = false;
//   } else if (!emailPattern.test(email.value.trim())) {
//     emailerror.textContent = "Invalid email format.";
//     isValid = false;
//   }

//   // Validate password
//   if (password.value.trim() === "") {
//     passworderror.textContent = "Password is required.";
//     isValid = false;
//   } else if (password.value.trim().length < 6) {
//     passworderror.textContent = "Password must be at least 6 characters long.";
//     isValid = false;
//   }

//   if (!isValid) {
//     return; // Stop if validation fails
//   }

//   // Check if user exists and password matches
//   try {
//     const response = await fetch("http://localhost:3000/users");
//     if (!response.ok) {
//       throw new Error("Failed to fetch user data from the server.");
//     }

//     const users = await response.json();

//     // Check if user with the entered email exists
//     const user = users.find((u) => u.email === email.value.trim());

//     if (user) {
//       // Check if password matches
//       if (user.password === password.value.trim()) {
//         alert(`Welcome back, ${user.username}!`);
//         // Handle successful login (e.g., redirect to another page)
//       } else {
//         alert("Incorrect password. Please try again.");
//       }
//     } else {
//       alert("No user found with this email. Please sign up first.");
//     }
//   } catch (error) {
//     console.error(error);
//     alert("An error occurred while logging in. Please try again later.");
//   }
// });



let form = document.getElementById("form");
let email = document.getElementById("email");
let password = document.getElementById("password");

let emailerror = document.getElementById("emailError");
let passworderror = document.getElementById("passwordError");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  emailerror.textContent = "";
  passworderror.textContent = "";

  try {
    const response = await fetch("http://localhost:3000/users");

    const users = await response.json();

    const user = users.find((u) => u.email === email.value.trim());

    if (user) {
      if (user.password === password.value.trim()) {

        if (user.role === "customer") {
          window.location.href = "/index.html";
        } else if (user.role === "admin") {
          window.location.href = ".././Admin/admin.html";
        }

      }else {
        passworderror.textContent="Incorrect password. Please try again."
      }
    } else {
      emailerror.textContent="No user found with this email. Please sign up first."
    }
  } catch (error) {
    console.error(error);
  }
});
