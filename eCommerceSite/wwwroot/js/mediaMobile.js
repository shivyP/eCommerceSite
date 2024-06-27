// the file controls the behviour of elements in the mobile view 
window.onresize=changeScreen;         //cpature the change in window size change 
window.onload=changeScreen;
let naviHum=document.querySelector(".productPages");
let humSymbol = document.getElementById("humSymbol");
let trend = document.querySelectorAll(".product")
let clickIcon=0;
let screenSize=0;
console.log("h", humSymbol);
// capture the click on the humburger symbol
humSymbol.addEventListener('click',()=>{
    console.log("link captured");
    displayMenu();
  })
  
  
  
  console.log(naviHum);
 
  function changeScreen(){
     
     
    // alert("chnage captured");
   
    screenSize=window.innerWidth;
    console.log(screenSize);
     if (screenSize<720){
      clickIcon=1;

     
      // document.querySelector(".access").style.marginTop="-110px";
      humSymbol.style.visibility="visible";
      naviHum.setAttribute("class","humMenu");
      displayMenu();
      console.log("after");
    }
    else if (screenSize>720){
      humSymbol.style.visibility="hidden";
      naviHum.setAttribute("class","productPages");
      naviHum.style.display="inline-block";
      document.querySelector(".access").style.marginTop="";
     

    }
    
  }//end of the function

  function displayMenu(){
    clickIcon++;
    
    if ( clickIcon==1){
      naviHum.style.display="inline-block";
    // naviHum.style.visibility="visible";
      
      document.querySelector(".access").style.marginTop="-140px";
    }
    else if ( clickIcon==2){
        clickIcon=0;
        naviHum.style.display="none";
        document.querySelector(".access").style.marginTop="-44px";

    }
}
console.log("trend:", trend[0]);
if (trend.length!=0) {
    trend[0].classList.add("watch")
    trend[1].classList.add("speaker")
    trend[2].classList.add("camera")
    trend[3].classList.add("headphone")
}
