
let form = document.getElementById("form");
let email = document.getElementById("email");
let password = document.getElementById("password");

let emailerror = document.getElementById("emailError");
let passworderror = document.getElementById("passwordError");

// save user data in local storage
function currentUserDate(user){
  const userDataLocal={
    id: user.id,
    username: user.username,
    usermail: user.email,
    userrole: user.role
  }
  localStorage.setItem("currentUser",JSON.stringify(userDataLocal))
}

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  emailerror.textContent = "";
  passworderror.textContent = "";

    const response = await fetch("http://localhost:3000/users");

    const users = await response.json();

    const user = users.find((u) => u.email === email.value.trim());

    if (user) {
      if (user.password === password.value.trim()) {
        currentUserDate(user)
        console.log("local"+ currentUserDate(user))
        if (user.role === "customer") {
          window.location.href = "/index.html";
        } else if (user.role === "admin") {
          window.location.replace ( ".././Admin/admin.html");
        }else if (user.role === "seller") {
          window.location.href = ".././seller/seller.html";
        }

      }else {
        passworderror.textContent="Incorrect password. Please try again."
      }
    } else {
      emailerror.textContent="No user found with this email. Please sign up first."
    }

});
