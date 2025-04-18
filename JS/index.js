var emailInput=document.getElementById("EmailLogin")
var passwordInput=document.getElementById("PasswordLogin")
var btnLogin=document.getElementById("btnLogin")

// console.log(emailInput)
// console.log(passwordInput)

var allUser =[]

if (localStorage.getItem("allUser")){
    allUser=JSON.parse(localStorage.getItem("allUser"))
}

console.log(allUser)

btnLogin.addEventListener("click",function(){
    if (isexist()){
        
        window.open("./home.html")
      }
      else
      {
          document.querySelector(".invaliddata").classList.remove("d-none")
      }
})


function isexist(){
    for (var i=0 ; i<allUser.length ; i++){
        if (allUser[i].emailuser==emailInput.value&&allUser[i].passworduser==passwordInput.value){
            localStorage.setItem("currentUser",allUser[i].nameuser)
            return true
        } 
    }
    return false
}