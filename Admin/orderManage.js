
let customerName=document.querySelector('#customerName')
let ProductName=document.querySelector('#ProductName')
let orderDate=document.querySelector('#orderDate')

let submitOrder=document.querySelector('#submitOrder')
let errorSpan=document.querySelector('#error')
let targetTable=document.querySelector('table')

submitOrder.addEventListener("click",(e)=>{
    let customerNameValue = customerName.value.trim();
    let ProductNameValue = ProductName.value.trim();
    let orderDateValue = orderDate.value.trim();
    if(customerNameValue=="" || ProductNameValue==""  || orderDateValue==""){
        e.preventDefault();
        errorSpan.innerText="Please fill all fields";
    }
    let createdTr= document.createElement('tr');


    let createdCustomerName= document.createElement('td');
    createdCustomerName.innerText=customerNameValue
    createdTr.appendChild(createdCustomerName)
    targetTable.appendChild(createdTr)
    customerName.value=" "

    let createdProductName= document.createElement('td');
    createdProductName.innerText=ProductNameValue
    createdTr.appendChild(createdProductName)
    targetTable.appendChild(createdTr)
    customerName.value=" "

    let createdOrderDate= document.createElement('td');
    createdOrderDate.innerText=orderDateValue
    createdTr.appendChild(createdOrderDate)
    targetTable.appendChild(createdTr)
    customerName.value=" "


    let createdCustomerAction= document.createElement('td');
    let delButton = document.createElement("button");
    delButton.innerText="Delete"
    createdCustomerAction.appendChild(delButton)
    createdTr.appendChild(createdCustomerAction)
    targetTable.appendChild(createdTr)
   


    delButton.addEventListener('click',function(){
        targetTable.removeChild(createdTr)
    })
    
})












