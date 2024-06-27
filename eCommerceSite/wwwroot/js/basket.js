// the file will mange the basket feature of the website
//on click the function will be called.


var proBasket= { 'Grey speaker': 0, 'Camera': 0, 'Watch': 0, 'Headphone': 0 }; 

let item=document.getElementById("spAdd");      //add button
let cart=document.querySelector(".cart");      //the cart icocn in the navigation bar

let basCon=document.getElementById("basketCont");//all the basket content
let display=document.getElementsByClassName("display");    //get the display article(content)
let pPrice=document.getElementsByClassName("pPrice");     //the price of the product in the basket
let totalCart=document.getElementById("totalCart");       //the total at of all products 
let incQuantity=document.getElementsByClassName("incQuantity"); //input type number
let closeW=document.getElementById("title");              //name of each product in basket
let footer=document.getElementById("bottomPage");        //checkout button


let array = ["assets/sp1.png", "assets/cm2.png", "assets/dw6.jpg","assets/hd12.png"]; //the images
let prices=[30,820,139,120];                         //keep the prices of all the products 
let total=0; 
const pKeys= Object.keys(proBasket);   //gets the key of the dictiornay probasket 
var fileName = (document.URL).split("/").pop(); //gets the file name
//animation to display the basket

if (fileName == "" || fileName == "index" || fileName == "#") {
    basCon.classList.add("indexBasket");
}
var basAnimation=[
    {opacity:'0', right:'0px'},
    {opacity:'0.5', right:'2px'},
    {opacity:'1', right:'4px'},
 ] 
 var timing={
    duration:750,
    iteratios:Infinity
 };


getItems(); //updates the array with values stored into local storage 
//as index does not have item (products to add to the basket)
if (item){
    item.addEventListener('click', addtoBasket);
}

basCon.style.display="none"; //the basket in not visible until requested by user


/************************************************************************/
/*            functions for adding product to a basket                  */
/************************************************************************/


//when the page calling the basket is the indexPage 
//set the top margin based on the calling page 


basketSize();



//gets the vlaues in the loacl storage and updates the dictionary for better updates
function getItems(){
    if (localStorage.getItem("basket")){
        let productV=localStorage.getItem("basket").split(',');

        //as it is saved as string it slipts it to get reuqired infromation
        proBasket['Grey speaker']=parseInt(productV[0].split(':')[1]);

        proBasket['Camera']=parseInt(productV[1].split(':')[1]);

        proBasket['Watch']=parseInt(productV[2].split(':')[1]);

        proBasket['Headphone']=parseInt(productV[3].split(':')[1]);
        
    }

}


//function to update the values as the user has added new products 
function addtoBasket(){
    let quantity=document.querySelector(".quantity").value;
    if (item.value==30){
        proBasket["Grey speaker"]+=quantity * item.value; //speaker
    }
    else if (item.value==820){
        proBasket["Camera"]+=quantity * item.value; //camera
    }
    else if(item.value==139){
        proBasket["Watch"]+=quantity * item.value; //watch
    }
    else if(item.value==120){
        proBasket["Headphone"]+=quantity * item.value; //headphones
    }    
    alert("The basket has been updated!");
    localStorage.setItem('basket', JSON.stringify(proBasket)); //update the local storage
}


/************************************************************************/
/*                   Bakset display functions                          */
/************************************************************************/

//the basket is made visibile when the user requests it 
//called by the click event on cart 

//events 
cart.addEventListener('click',()=>{
    showBasket();
});


//checkout button 
document.getElementById("checkButton").addEventListener('click',()=>{
    alert("The order has been confrimed!");
    proBasket["Grey speaker"]=0;//speaker
    proBasket["Camera"]=0; //camera
    proBasket["Watch"]=0; //watch
    proBasket["Headphone"]=0; //headphones
    localStorage.setItem('basket', JSON.stringify(proBasket)); //store in local storage 
})


function showBasket(){
    footer.style.position="fixed";
    basCon.style.visibility="visible";
    basCon.style.display="";

    if (fileName == "index" || fileName == "" || fileName=="#") {
        document.getElementById("proDisplay").style.display="none";
        document.getElementById("subscribe").style.display="none";
    }
    basCon.animate(basAnimation,timing);
    console.log("pkeys", pKeys[1]);
    let k=0,x=0; //k indexing the display content , x indxing for images 

    //look for values, if 0 igonre item
    for (const [key,value] of Object.entries(proBasket)){
        console.log(value);
        if (value!=0){ 
            display[k].children[0].setAttribute("src",array[x]); //add the image
            display[k].classList.add("show"); // make it visibile 
            display[k].children[1].children[0].innerHTML=pKeys[x]; // Product Name
            display[k].children[1].children[1].innerHTML=proBasket[pKeys[x]] / prices[x]; //quantity 
            display[k].children[1].children[2].setAttribute("value",proBasket[pKeys[x]] / prices[x]); //input
            display[k].children[2].innerHTML="£"+proBasket[pKeys[x]]; //price
            console.log(proBasket[pKeys[x]] / prices[x]);
            total+=proBasket[pKeys[x]];// get the initial sum
            k++;

        }
        totalCart.innerHTML="£"+total;
        x++;
    }

}

//calutates the total of the products 
function totalCal(){
    // console.log(proBasket);
    total=proBasket["Grey speaker"];//speaker
    total+=proBasket["Camera"]; //camera
    total+=proBasket["Watch"]; //watch
    total+=proBasket["Headphone"]; //headphones
    totalCart.innerHTML="£"+total;
}



//gets all the input type number and capture all changes on any of them 
for(let p=0; p<incQuantity.length;p++){
    //cpature the change event 
    incQuantity[p].addEventListener("change",()=>{
        //change the quantity 
        let d=display[p].children[1].children[0].innerHTML;
     
        quantity=incQuantity[p].value;
        let r; //for indexing the price array 
        if (d=="Grey speaker") r=0; 
        else if (d=="Camera") r=1;
        else if (d=="Watch")  r=2;
        else if (d=="Headphone") r=3;
         //now update pBasket
        proBasket[d]=quantity * prices[r]; //updates the total in the original dictionary 

        //update the display of quatity and total price 
        display[p].children[1].children[1].innerHTML=quantity;
        display[p].children[2].innerHTML="£"+ proBasket[d];
        // total+=proBasket[d];
        localStorage.setItem('basket', JSON.stringify(proBasket));
        totalCal();
        // display[k].children[1].children[1].innerHTML=proBasket[pKeys[x]] / prices[x];
    });

}//end of function 




//close the basket window 
closeW.children[0].addEventListener('click',()=>{
    basCon.style.visibility="hidden";
    basCon.style.display="none";
   
    for (let l=0; l<display.length; l++){
        display[l].classList.remove("show");
    }
    footer.style.position = "";
    if (fileName == "index" || fileName == "" || fileName == "#") {
        document.getElementById("proDisplay").style.display="";
        document.getElementById("subscribe").style.display="";
    }
});



//mobile view 
window.addEventListener("resize", ()=>{
    basketSize();
   
    
})

function basketSize(){


    if ((fileName == "Index" || fileName == "" || fileName == "#") && window.innerWidth>720){
        basCon.style.marginTop="-49.8%";
    }
    else if(fileName=="signIn"){
        basCon.style.marginTop="-53.1%";
    }
    else if(fileName=="LogIn"){
        basCon.style.marginTop="-36.55%";
    }

    //for mobile view 
    if ((fileName == "Index" || fileName == "" || fileName == "#" ) && window.innerWidth<720){
        basCon.style.marginTop="-94.1%";
    }
    else if(fileName=="signIn" && window.innerWidth<720){
        basCon.style.marginTop="-185.8%";
    }
    else if(fileName=="LogIn" && window.innerWidth<720){
        basCon.style.marginTop="-114.9%";
    }
}









