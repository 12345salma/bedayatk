var nameinput = document.getElementById("createName")
var emailinput = document.getElementById("createEmail")
var passwordinput = document.getElementById("createPassword")
var Signbtn = document.getElementById("btn-signup")
var allUser = []
// console.log(createName)
// console.log(createEmail)
// console.log(createPassword)

//if to collect data in the array 
if (JSON.parse(localStorage.getItem("allUser"))) {

    allUser = JSON.parse(localStorage.getItem("allUser"))
}


//lama el user ygy y click
Signbtn.addEventListener("click",function(){
    addUser()
})

//creating function for signup button and create values for the inputs 
function addUser() {

    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var nameRegex = /^(?!.*[_.]{2})[a-zA-Z0-9._]{3,16}$/;

    if (emailinput.value==''|| nameinput.value==''|| passwordinput.value =='') {
        document.querySelector(".invaliddata").classList.remove("d-none")
    }
    else if (!emailRegex.test(emailinput.value) || !nameRegex.test(nameinput.value)) {
        document.querySelector(".invaliddata").classList.remove("d-none");
    }
    else {
        document.querySelector(".invaliddata").classList.add("d-none")
        //law exists =true
        if (exist()) {
            console.log("true")
            
            var user = { 
                nameuser: nameinput.value,
                emailuser: emailinput.value,
                passworduser: passwordinput.value,
            }
            //creating array for user data and store it in local storage 
            allUser.push(user)
            localStorage.setItem("allUser",JSON.stringify(allUser))
            clear()
            //a7ot el d-none
            document.querySelector(".exist").classList.add("d-none")
            window.open("./index.html")

        }

        else {
            //ady lel user alert b eny ashel el d-none
            document.querySelector(".exist").classList.remove("d-none")
        }
    }

}


function clear() {
    nameinput.value = null
    passwordinput.value = null
    emailinput.value = null
}

function exist() {
    
    for (var i=0;i<allUser.length;i++) {
        if (allUser[i].emailuser==emailinput.value) {
            return false
        }

    }
    //law mo4 ad b3d 
    return true

}
