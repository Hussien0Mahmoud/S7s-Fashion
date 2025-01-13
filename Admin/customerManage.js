let customerId=document.querySelector('#customerId')
let customerName=document.querySelector('#customerName')
let customerPrice=document.querySelector('#customerMail')
// let customerPrice=document.querySelector('#customerPrice')
let submitcustomer=document.querySelector('#submitCustomer')
let errorSpan=document.querySelector('#error')
let targetTable=document.querySelector('table')

submitcustomer.addEventListener("click",(e)=>{
    let customerIdValue = customerId.value.trim();
    let customerNameValue = customerName.value.trim();
    let customerPricevalue = customerPrice.value.trim();
    if(customerIdValue=="" || customerNameValue=="" || customerPricevalue==""){
        e.preventDefault();
        errorSpan.innerText="Please fill all fields";
    }
    let createdTr= document.createElement('tr');

    let createdCustomerId= document.createElement('td');
    createdCustomerId.innerText=customerIdValue
    createdTr.appendChild(createdCustomerId)
    // input.value=''
    targetTable.appendChild(createdTr)
    customerId.value=" "

    let createdCustomerName= document.createElement('td');
    createdCustomerName.innerText=customerNameValue
    createdTr.appendChild(createdCustomerName)
    targetTable.appendChild(createdTr)
    customerName.value=" "

    let createdCustomerPrice= document.createElement('td');
    createdCustomerPrice.innerText=customerPricevalue
    createdTr.appendChild(createdCustomerPrice)
    // targetTable.appendChild(createdTr)
    customerPrice.value=" "

    let createdCustomerAction= document.createElement('td');
    let delButton = document.createElement("button");
    delButton.innerText="Delete"
    // delButton.style.backgroundColor="#088178"
    // delButton.style.color="white"
    // delButton.style.padding="10px 20px"
    // delButton.style.border="none"
    // delButton.style.borderRadius="12px"
    createdCustomerAction.appendChild(delButton)
    createdTr.appendChild(createdCustomerAction)
    targetTable.appendChild(createdTr)
   


    delButton.addEventListener('click',function(){
        targetTable.removeChild(createdTr)
    })
    
})












