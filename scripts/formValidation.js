
 let form = document.getElementById("form");
 let name = document.getElementById("name");
 let email = document.getElementById("email");
 let password = document.getElementById("password");
 let confPassword = document.getElementById("confpassword");

 let nameerror = document.getElementById("nameError");
 let emailerror = document.getElementById("emailError");
 let passworderror = document.getElementById("passwordError");
 let confpassworderror = document.getElementById("confpasswordError");


 form.addEventListener("submit", function(event) {
   event.preventDefault(); 

   nameerror.textContent = "";
   emailerror.textContent = "";
   passworderror.textContent = "";
   confpassworderror.textContent = "";

   let isValid = true;

   if (name.value.trim() === "") {
     nameerror.textContent = "Name is required.";
     isValid = false;
   }

   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (email.value.trim() === "") {
     emailerror.textContent = "Email is required.";
     isValid = false;
   } else if (!emailPattern.test(email.value.trim())) {
     emailerror.textContent = "Invalid email format.";
     isValid = false;
   }

   if (password.value.trim() === "") {
     passworderror.textContent = "Password is required.";
     isValid = false;
   } else if (password.value.trim().length < 6) {
     passworderror.textContent = "Password must be at least 6 characters";
     isValid = false;
   }

   if (confPassword.value.trim() === "") {
     confpassworderror.textContent = "Confirm password is required.";
     isValid = false;
   } else if (confPassword.value.trim() !== password.value.trim()) {
     confpassworderror.textContent = "Passwords do not match.";
     isValid = false;
   }


   const addUser = async (body) => {
    const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(body)
    })
  }
 
   if (isValid) {
   const user = {
    username: name.value,
    email: email.value,
    password: password.value,
    role: "customer",
}
addUser(user);
form.reset();
   }
   
   
 });