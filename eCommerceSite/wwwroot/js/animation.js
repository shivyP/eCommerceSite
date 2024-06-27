/*-----------------------------------------*/
/*             slide show                  */
/*-----------------------------------------*/


let currentImage=document.querySelector(".productCover"); //stores the current image 

/*--gets the label element of the radio buttons ---*/

let firstImage=document.querySelector('#button1 + label'); 
let secondImage=document.querySelector('#button2 + label');
let thirdImage=document.querySelector('#button3 + label');

let pImgArr= ["assets/cameraCover3.jpg","assets/headphonesCover.jpg", "assets/watchesCover15.jpg"];
let click=0;
let indexImg=0; //helps in indexing the image source array
//the description of the products on the slide show 
let cameraDesc=document.getElementById("camera"); 
let audioDesc=document.getElementById("audio");
let watchDesc=document.getElementById("watch");



/*---Click events capture----*/
firstImage.addEventListener('click',()=>{
    indexImg=0;
    currentImage.src=pImgArr[0];
    // click=1;
    clearInterval(start);
    displayDescription();
    
});
secondImage.addEventListener('click',()=>{
    currentImage.src=pImgArr[1];
    // click=1;
    indexImg=1;
    clearInterval(start);
    displayDescription();
});

thirdImage.addEventListener('click',()=>{
    currentImage.src=pImgArr[2];
    // click=1;
    clearInterval(start);
    indexImg=2;
 
    displayDescription();
});


/*---Automated changing ---*/


// adding the description on the images 

function nImage(){
    
    indexImg++;
    if (indexImg==pImgArr.length){
        indexImg=0;
        console.log(indexImg);
        console.log(currentImage);
    }
    currentImage.src=pImgArr[indexImg];
    displayDescription();
   
    
}

//the function to display the description of the right image 
function displayDescription(){
    switch (indexImg){
        case 0:
            cameraDesc.style.visibility="visible";
            audioDesc.style.visibility="hidden";
            watchDesc.style.visibility="hidden";
            break;
        case 1:
            audioDesc.style.visibility="visible";
            watchDesc.style.visibility="hidden";
            cameraDesc.style.visibility="hidden";
            break;
        case 2:
            watchDesc.style.visibility="visible";
            audioDesc.style.visibility="hidden";
            cameraDesc.style.visibility="hidden";
            break;
    }
}

let start= setInterval(nImage,4500);

/*---Capture on click event---*/
console.log(cameraDesc.children[1],watchDesc,audioDesc);
cameraDesc.children[1].addEventListener('click', ()=>{ window.location="cameraCategory";});
audioDesc.children[1].addEventListener('click', ()=>{ window.location="audioCategory";});
watchDesc.children[1].addEventListener('click', ()=>{ window.location="watchCategory";});

