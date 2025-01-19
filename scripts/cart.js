let CartContainer = document.querySelector(".products");

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    CartContainer.innerHTML = "<p>Your cart is empty!</p>";
    return;
  }

  cart.forEach((product) => {
    CartContainer.innerHTML += `
    <div class="product">
            <div class="image">
                <img src="${product.image}" alt="">
            </div>
            <div class="details">
                <div class="head">
                    <h3>${product.title}</h3>
                    <p id="cancel">x</p>
                </div>
                <div class="tail">
                    <p>${product.price}</p>
                    <div class="quantity">
                        <span>-</span>
                        <span class="quant">2</span>
                        <span>+</span>
                    </div>
                </div>
            </div>
        </div>`
      ;
  });

}
displayCart();

let cancel = document.getElementById("cancel");
cancel.addEventListener('click',()=>{
  document.getElementById("product").style.display="none"

})


