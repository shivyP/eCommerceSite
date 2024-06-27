//for the login page
//takes the entered values and store them in the local storage

let sPass=document.getElementById("sPass");
let lEmail=localStorage.getItem("email");
let lPass=localStorage.getItem("password");
let logButton=document.getElementById("logButton");
let msg=document.getElementById("msg");
let userEmails;
let uPass;
let loggedUser=null; //will keep the index of the logged user
let newPage=document.getElementById("newPage");

let uName; //the email entred by the user 
let pin; //the password entered by the user 


if (lEmail){
     userEmails=lEmail.split(',');
     uPass=lPass.split(',');
}
console.log("u", lEmail);
console.log("p", uPass);



newPage.addEventListener('click', ()=>{
    location.href="signIn.html";
});


logButton.addEventListener('click', (e)=>{
    document.getElementById("email").style.borderColor="";
    document.getElementById("password").style.borderColor="";
    uName=document.getElementById("email").value;
    pin=document.getElementById("password").value;
  
    if (lEmail!=null){isUser();}
    else {
	  msg.innerHTML="Invalid credentials!";
   
    	msg.classList.add("msg-rejected");
    	msg.style.position="relative";
        
	}
   
    e.preventDefault();
});


//function to get all the elements on click
function isUser(){
    
    for (let i=0; i<userEmails.length; i++){
        console.log("i", userEmails[i]);
        if(userEmails[i]==uName){
            loggedUser=i; //keeps the record of
            if(uPass[i]==pin){
                console.log("user found");
                msg.innerHTML="Log in Successful "+uName+".";
                document.getElementById("email").value="";
                document.getElementById("password").value="";
                msg.classList.remove("msg-rejected");
                msg.style.position="relative";
                return;
            }
        }       
    }
   
    msg.innerHTML="Invalid credentials!";
    document.getElementById("email").value="";
    document.getElementById("password").value="";
    document.getElementById("email").style.borderColor="red";
    document.getElementById("password").style.borderColor="red";
    msg.classList.add("msg-rejected");
    msg.style.position="relative";
        
        
    

}

















sPass.addEventListener('click',()=>{
    if(document.getElementById("password").type==="password"){
        document.getElementById("password").type="text";
    }
    else 
       document.getElementById("password").type="password";
})