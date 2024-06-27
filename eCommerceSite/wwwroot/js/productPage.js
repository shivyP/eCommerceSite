/* all the elements required from the document (html page ) */


let imgDisplay=document.getElementById("imgDisplay");           //section with product images
let zoomImage=document.getElementById("zoomImage");             //section of the small window
let showArrow=document.querySelectorAll(".showArrow");          //capture the arrows (<>) in the second window
let pre=document.querySelectorAll(".previous");                 //capture single ones in both main and second page
let next=document.querySelectorAll(".next");                    //capture single ones in both main and second page
let pageProduct=document.getElementById("pageProduct");         //main section of the page 
let closeWindow=document.querySelector(".close");               // the close button of the second window 
let sideImage=document.querySelector(".sideImages");            //for the small images in the left side 
let pVideo=document.querySelectorAll(".pVideo");                //video element of the page 
var fileName = (document.URL).split("/").pop(); //gets the file name
let ft1 = document.getElementById("bottomPage");





console.log("File: ", fileName, typeof(fullUrl));

let audioPage = ["assets/sp1.png", "assets/sp5.jpg", "assets/sp3.png", "assets/speaker1.mp4"]; //audio page media files
let watchPage = ["assets/dw6.jpg", "assets/dw2.jpg", "assets/dw15.jpg","assets/dwVideo.mp4"];
let cameraPage = ["assets/cm2.png", "assets/cm3.png", "assets/cm4.png","assets/cVideo.mp4"];
let headpPage = ["assets/hd12.png", "assets/hd2.png", "assets/hd4.png","assets/hVideo.mp4"];

let i=0, j=0; //indexes for the array
var callId=0; //to indetify which element of the of the page is calling the function


/* when the images are clicked on, a zoomed window is opened  */
imgDisplay.children[1].addEventListener('click',()=>{zoomDisplay()});


/*---------------------------------------------------------------*/
/*   Decide which array to use based on the html page opened     */
/*---------------------------------------------------------------*/

switch (fileName){
    case "audioPage":
        alert("found audioPage");
        arrayImage=audioPage;
        break;
    case "watchPage":
        arrayImage=watchPage;
        break;
    case "cameraPage":
        arrayImage=cameraPage; 
        break;
    case "headpPage":
        arrayImage=headpPage; 
               
}

/*----caputre clicks on images( small one) and based on the one choosen display-------- */

sideImage.children[0].children[0].addEventListener('click',()=>{
    pVideo[callId].style.visibility="hidden";
    imgDisplay.children[1].src=arrayImage[0];
   
})
sideImage.children[0].children[1].addEventListener('click',()=>{
    pVideo[callId].style.visibility="hidden";
    imgDisplay.children[1].src=arrayImage[1];
})
sideImage.children[0].children[2].addEventListener('click',()=>{
    pVideo[callId].style.visibility="hidden";
    imgDisplay.children[1].src=arrayImage[2];
})

sideImage.children[0].children[3].addEventListener('click',()=>{
    pVideo[callId].style.visibility="hidden";
    imgDisplay.children[1].src="assets/bg.jpg";
    playVideo();
})

/*-------------------------------------------------------------------------------------*/










/*----caputre clicks on images( small one) and based on the one choosen display-------- */
//based on what element is calling, the caller ID is updated 
pre[0].addEventListener('click',()=>{
    callId=0;
    previousImage();

});
pre[1].addEventListener('click',()=>{
    callId=1;
    previousImage();
});


next[0].addEventListener('click',()=>{
    callId=0;
    
    nextImage();
});

next[1].addEventListener('click',()=>{
    callId=1;
    nextImage()
});
/*-------------------------------------------------------------------------------------*/


/* following are the all the functions needed */

/*------fuction to change to the previous image -------------------*/


//change the source of video
function playVideo(){
    // alert("in here");
    pVideo[callId].style.visibility="visible";
    
    pVideo[callId].setAttribute("src",arrayImage[arrayImage.length-1]);
}


// for previous image 
function previousImage(){
    pVideo[callId].style.visibility="hidden";
   //when it reaches 0, point back to 3 
    if (i<0){
        i=arrayImage.length-1; //4-1 -> so when at 3 it will be pointing the video
    }
    if (j<0){
        j=arrayImage.length-1; 
    }
    //if it is not, all the caller id = 0, means the mian fuction is calling the function 
    if (callId==0){
        //change the i index 
        //check if i=3 
        
        if (i==arrayImage.length-1){
            playVideo();
            imgDisplay.children[1].src ="~/assets/bg.png";
            i--;
            return;
        }
        imgDisplay.children[1].src=arrayImage[i];
        i--;
    }
    else {
        if (j==arrayImage.length-1){
            playVideo();
            zoomImage.children[1].src ="~/assets/bg.jpg";
            j--;
            return;
        }
        zoomImage.children[1].src=arrayImage[j];
        j--;
    }
   
}






// functions for next image
function nextImage(){
    pVideo[callId].style.visibility="hidden";

    if(i==arrayImage.length){
        i=0;
    }
    if (j==arrayImage.length)
        j=0;
    if (callId==0){
        if (i==arrayImage.length-1){
            playVideo();
            // imgDisplay.children[1].src="assets/bg1.jpg";
            i++;
            return;
        }
        imgDisplay.children[1].src=arrayImage[i];
        i++;
    }
    else{
        if (j==arrayImage.length-1){
            playVideo();
            // zoomImage.children[1].src="assets/bg1.jpg";
            j++;
            return;
        }
        zoomImage.children[1].src=arrayImage[j];
        j++;
    }

}//end of function


//on mouse over affect 

imgDisplay.addEventListener('mouseover',()=>{
    showArrow[0].style. visibility="visible";
    showArrow[1].style. visibility="visible";
});

imgDisplay.addEventListener('mouseout', ()=>{
    showArrow[0].style. visibility="hidden";
    showArrow[1].style. visibility="hidden";
});


console.log(zoomImage[2]);



 

//animation 
var opacity=0;
var interval=0;

let scaleWindow=0.1;

function zoomDisplay(){
   
   zoomImage.style.transform="scale"+"("+scaleWindow+")";
   interval=setInterval(openWindow,130);


}


function openWindow(){
    console.log("in here");
   
    // console.log("op", widthWindow);
    
    opacity=Number(getComputedStyle(zoomImage).getPropertyValue("opacity"));
   // scaleWindow=Number(getComputedStyle(zoomImage).getPropertyValue("transform"))
    console.log("op", scaleWindow);
      if (opacity<1){
         console.log("in if");
         
         opacity=opacity+0.2;
         scaleWindow+=0.18;
         zoomImage.style.opacity=opacity;
         zoomImage.style.transform="scale"+"("+scaleWindow+")";
         zoomImage.style.visibility="visible";
         showArrow[2].style. visibility="visible";
         showArrow[3].style. visibility="visible";
         pageProduct.style.opacity=0.5;
         console.log( document.getElementsByClassName("c"));
        
         
     }
     else {
        clearInterval(interval);
     }
    //     opacity=opacity+0.2;
    //     zoomImage.style.opacity=opacity;
    //     zoomImage.style.visibility="visible";
    //     showArrow[2].style. visibility="visible";
    //     showArrow[3].style. visibility="visible";
    //     pageProduct.style.opacity=0.5;
    // }
    // else {
    //     clearInterval(interval);
        
    // }
   
    
};






//to close the opened window 
closeWindow.addEventListener('click', ()=>{
    zoomImage.style.visibility="hidden";
    // zoomImage.style.display="none";
    zoomImage.style.opacity=0;
    showArrow[2].style. visibility="hidden";
    showArrow[3].style. visibility="hidden";
    pageProduct.style.opacity=1;
    
    pVideo[callId].style.visibility="hidden";
    scaleWindow=0.1;            //for animation

    //for the mobile view , where the hover effect is not possible
    if(window.innerWidth<=720){
        showArrow[0].style. visibility="visible";
        showArrow[1].style. visibility="visible";
    }
});


