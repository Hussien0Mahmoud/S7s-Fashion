let signUp=document.querySelector("#signUp")
let login=document.querySelector("#login")

const currentUser=JSON.parse(localStorage.getItem("currentUser"))
if(currentUser){
    login.innerHTML=`weclome ${currentUser.username}`
    signUp.innerHTML=`SignOut`
    signUp.addEventListener("click",()=>{
        localStorage.removeItem("currentUser")
        window.location.href="/html/login.html"
    })

}