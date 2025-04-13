let customerId=document.querySelector('#customerId')
let customerName=document.querySelector('#customerName')
let cusomerEmail=document.querySelector('#customerMail')
let customerPass=document.querySelector('#customerPass')
let customerRole=document.querySelector('#customerRole')

let submitcustomer=document.querySelector('#submitCustomer')
let errorSpan=document.querySelector('#error')
let targetTable=document.querySelector('table')


submitcustomer.addEventListener("click", (e) => {
  let customerNameValue = customerName.value.trim();
  let cusomerEmailvalue = cusomerEmail.value.trim();
  let cusomerPassvalue = customerPass.value.trim();
  let customerRolelvalue = customerRole.value.trim();

  if (customerNameValue == "" || cusomerEmailvalue == "" || cusomerPassvalue == "" || customerRolelvalue == "") {
    Swal.fire({
      icon: 'warning',
      title: 'Required Fields',
      text: 'Please fill all fields',
      confirmButtonColor: '#088178'
    });
    e.preventDefault();
  } else {
    const addCustomer = async (body) => {
      try {
        const res = await fetch("http://localhost:3000/users", {
          method: "POST",
          body: JSON.stringify(body),
        });
        if (res.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Customer added successfully',
            showConfirmButton: false,
            timer: 1500
          });
          // Clear form
          customerName.value = "";
          cusomerEmail.value = "";
          customerPass.value = "";
          customerRole.value = "";
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add customer',
          confirmButtonColor: '#088178'
        });
      }
    };

    const customer = {
      username: customerName.value,
      email: cusomerEmail.value,
      password: customerPass.value,
      role: customerRole.value
    };
    addCustomer(customer);
  }
});

// get products ya s7s
async function fetchCustomers() {
  const response = await fetch("http://localhost:3000/users");
  const customers = await response.json();
  return customers;
}
//   console.log("ffffffffffff"
fetchCustomers().then((customers) => {
  // console.log(products)
  customers.forEach((customer) => {
    targetTable.innerHTML += `
                <tr>
                <td>${customer.username}</td>
                <td>${customer.email}</td>
                <td>${customer.password}</td>
                <td>${customer.role}</td>
                    <td>
                    <button id="upBtn"  data-id="${customer.id}">Edit</button>
                    <button id="delBtn" data-id="${customer.id}">delete</button>
                    </td>
                </tr>
        `;
  });
});


async function fetchCustomer(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  const customers = await response.json();
  return customers;
}

async function updateCustomers(id) {
  let popupForm = document.getElementById("popupForm");
  let updateForm = document.getElementById("updateForm");
  

  popupForm.style.display = "flex";
  
  let updatecustomerName = document.querySelector("#updatecustomerName");
  let updatecustomerMail = document.querySelector("#updatecustomerMail");
  let updatecustomerPass = document.querySelector("#updatecustomerPass");
  let updatecustomerRole = document.querySelector("#updatecustomerRole");
  
  let user = await fetchCustomer(id)
  updatecustomerName.value=user.username
  updatecustomerMail.value=user.email
  updatecustomerPass.value=user.password
  updatecustomerRole.value=user.role

  
  updateForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const updateCustomer = async (body,id) => {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
          method: "put",
          body: JSON.stringify(body),
          })
    }
  const customer = {
      username: updatecustomerName.value,
        email: updatecustomerMail.value,
        password:updatecustomerPass.value,
        role: updatecustomerRole.value
  };
  updateCustomer(customer,id)
    popupForm.style.display = "none";

  });
}

targetTable.addEventListener("click", async (event) => {
  if (event.target && event.target.id === "delBtn") {
    const customerId = event.target.getAttribute("data-id");
    const row = event.target.closest("tr");

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
        const response = await fetch(`http://localhost:3000/users/${customerId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          row.remove();
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Customer has been deleted.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete customer',
          confirmButtonColor: '#088178'
        });
      }
    }
  }

  if (event.target && event.target.id === "upBtn") {
    const customerId = event.target.getAttribute("data-id"); 
    await updateCustomers(customerId)

  }

});

let cancel = document.getElementById("cancel");
cancel.addEventListener('click',()=>{
  document.getElementById("popupForm").style.display="none"

})












