let customerId=document.querySelector('#customerId')
let customerName=document.querySelector('#customerName')
let cusomerEmail=document.querySelector('#customerMail')
let customerPass=document.querySelector('#customerPass')
let customerRole=document.querySelector('#customerRole')

let submitcustomer=document.querySelector('#submitCustomer')
let errorSpan=document.querySelector('#error')
let targetTable=document.querySelector('table')


submitcustomer.addEventListener("click", (e) => {
    // let customerIdValue = customerId.value.trim();
    let customerNameValue = customerName.value.trim();
    let cusomerEmailvalue = cusomerEmail.value.trim();
    let cusomerPassvalue = customerPass.value.trim();
    let customerRolelvalue = customerRole.value.trim();
  
    let isValid = true;
    if (  customerNameValue == "" || cusomerEmailvalue == "" || cusomerPassvalue == "" || customerRolelvalue == "" ) {
      errorSpan.innerText = "Please fill all fields";
      e.preventDefault();
    } else {
      const addCustomer = async (body) => {
        const res = await fetch("http://localhost:3000/users", {
          method: "POST",
          body: JSON.stringify(body),
        });
      };
  
      if (isValid) {
        const customer = {
          username: customerName.value,
          email: cusomerEmail.value,
          password:customerPass.value,
          role: customerRole.value
        };
        addCustomer(customer);
      }
  
      delButton.addEventListener("click", function () {
        targetTable.removeChild(createdTr);
      });
  

      customerName.value = "";
      cusomerEmail.value = "";
      customerPass.value="";
      customerRole.value="";
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
                          <button id="delBtn" data-id="${customer.id}">delet</button>
                          <button id="upBtn"  data-id="${customer.id}">update</button>
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
  
        const confirmDelete = confirm("Are you sure you want to delete this customer?");
        if (!confirmDelete) return;
  
          await fetch(`http://localhost:3000/users/${customerId}`, {
            method: "DELETE",
          });
  
            row.remove();
            console.log(`customer with ID ${customerId} deleted successfully.`);
  
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
























// submitcustomer.addEventListener("click",(e)=>{
//     let customerIdValue = customerId.value.trim();
//     let customerNameValue = customerName.value.trim();
//     let customerPricevalue = customerPrice.value.trim();
//     let isValid = true;
//     if(customerIdValue=="" || customerNameValue=="" || customerPricevalue==""){
//         e.preventDefault();
//         errorSpan.innerText="Please fill all fields";
//         isValid = false;
//     }else{

        
//     }

    
// })












