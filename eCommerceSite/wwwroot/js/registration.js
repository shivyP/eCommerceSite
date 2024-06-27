let loginCre=JSON.parse(localStorage.getItem("cre")) || "";
let newUser=[loginCre];
let e=[];
let p=[];
let pr;
let localEmail=localStorage.getItem("email") || "";
let lemail=localEmail.split(",");

let lsp=localStorage.getItem("password") || "";  //orginal array
if (lsp){
	pr=lsp.split(',');//localStorage.getItem("password"); //get the value from the localstoare  
}

//console.log("pass",pr);

console.log("dob", pr);



let inpField = document.getElementsByClassName("inpField");

let fname=document.getElementById("fname");
let lname=document.getElementById("lname");
let email=document.getElementById("email");
let password=document.getElementById("password");
let pass1=document.getElementById("pass1");
//let dob=document.getElementById("dob");// the date 
let showPass=document.getElementById("showPass");
let sButton=document.getElementById("signInButton");
let sucMsg = document.getElementById("msg");
let ft_1 = document.getElementById("bottomPage");
console.log(ft_1);
ft_1.classList.add("footerLogin");

lname.value = "";
fname.value = "";
email.value = "";


showPass.addEventListener('click',()=>{
    if (password.type==="password"){
         password.setAttribute("type","text");
         pass1.setAttribute("type","text");
         checkBox=1;
    }
    else {
        password.setAttribute("type","password");
        pass1.setAttribute("type","password");
        
    }
   
});

fname.addEventListener('focus',() => { startFloat(0)});
lname.addEventListener('focus',() => { startFloat(1)});
email.addEventListener('focus',() => { startFloat(2)});
password.addEventListener('focus',() => { startFloat(3)});
pass1.addEventListener('focus',() => { startFloat(4)});
//dob.addEventListener('focus',() => { startFloat(5)});


fname.addEventListener('blur', () => {endFloat(0,fname.value)});
lname.addEventListener('blur', () => {endFloat(1,lname.value)});
email.addEventListener('blur', () => {endFloat(2,email.value)});
password.addEventListener('blur', () => {endFloat(3,password.value)});
pass1.addEventListener('blur', () => {endFloat(4,pass1.value)});
/*dob.addEventListener('blur',() => {
    inpField[5].classList.remove('active');
});*/


fname.addEventListener('input',() => { 
    fname.setCustomValidity('');
});
lname.addEventListener('input',() => { 
    lname.setCustomValidity('');
});

email.addEventListener('input',() => { 
    email.setCustomValidity('');
});
password.addEventListener('input',() => { 
    password.setCustomValidity('');
});
pass1.addEventListener('input',() => { 
    pass1.setCustomValidity('');
});




//the floating input fields
function startFloat(index){
    inpField[index].classList.add('active');

};
function endFloat(index, element){
    if (element=='') {
        inpField[index].classList.remove('active');
      
    }
       
}
