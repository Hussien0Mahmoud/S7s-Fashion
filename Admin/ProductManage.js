let productTitle=document.querySelector('#productTitle')
let productDescription=document.querySelector('#productDescription')
let productPrice=document.querySelector('#productPrice')
let productImage=document.querySelector('#productImage')
// let productPrice=document.querySelector('#productPrice')
let submitProduct=document.querySelector('#submitProduct')
let errorSpan=document.querySelector('#error')
let targetTable=document.querySelector('table')

submitProduct.addEventListener("click",(e)=>{
    let productTitleValue = productTitle.value.trim();
    let productDescriptionValue = productDescription.value.trim();
    let productPricevalue = productPrice.value.trim();
    let productImageValue = productImage.value.trim();
    if( productTitleValue=="" || productDescriptionValue=="" || productPricevalue=="" || productImageValue==""){
        errorSpan.innerText="Please fill all fields";
        e.preventDefault();
        
    }else {

        let createdTr= document.createElement('tr');

    

    let createdProductTitle= document.createElement('td');
    createdProductTitle.innerText=productTitleValue
    createdTr.appendChild(createdProductTitle)
    targetTable.appendChild(createdTr)


    let createdProductDescription= document.createElement('td');
    createdProductDescription.innerText=productDescriptionValue
    createdTr.appendChild(createdProductDescription)
    targetTable.appendChild(createdTr)
    productTitle.value=" "

    let createdProductPrice= document.createElement('td');
    createdProductPrice.innerText=productPricevalue
    createdTr.appendChild(createdProductPrice)
    targetTable.appendChild(createdTr)
 

    let createdProductImage = document.createElement("td");
    let imgElement = document.createElement("img");
    imgElement.src = productImageValue; // Use the image path provided
    imgElement.alt = "Product Image"; // Set alt text for accessibility
    imgElement.style.width = "100px"; // Optional: Set a fixed width for better display
    imgElement.style.height = "auto"; // Maintain aspect ratio
    createdProductImage.appendChild(imgElement);
    createdTr.appendChild(createdProductImage);




    let createdProductAction = document.createElement("td");
    let delButton = document.createElement("button");
    let updateButton = document.createElement("button");

    delButton.innerText = "Delete";
    updateButton.innerText = "Update";

    createdProductAction.appendChild(delButton);
    createdProductAction.appendChild(updateButton);
    createdTr.appendChild(createdProductAction);

    targetTable.appendChild(createdTr)

    delButton.addEventListener('click',function(){
        targetTable.removeChild(createdTr)
    })

    productTitle.value = "";
    productDescription.value = "";
    productPrice.value = "";
    productImage.value = "";

    }

    

    
})












