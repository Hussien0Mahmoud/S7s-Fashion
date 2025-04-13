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

  try {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const user = users.find((u) => u.email === email.value.trim());

    if (user) {
      if (user.password === password.value.trim()) {
        currentUserDate(user);
        
        Swal.fire({
          icon: 'success',
          title: 'Welcome Back!',
          text: 'Login successful',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          if (user.role === "customer") {
            window.location.href = "../index.html";
          } else if (user.role === "admin") {
            window.location.href = "../Admin/admin.html";
          
          } else if (user.role === "seller") {
            window.location.href = "../seller/seller.html";
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Password',
          text: 'Please check your password and try again',
          confirmButtonColor: '#088178'
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Account Not Found',
        text: 'No user found with this email. Please sign up first.',
        confirmButtonColor: '#088178'
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! Please try again.',
      confirmButtonColor: '#088178'
    });
  }
});
