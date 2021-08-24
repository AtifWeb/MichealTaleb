import {AudioPlayer} from './CustomAudioPlayer.js'




// AudioPlayer
AudioPlayer()





let ClosePopupIcon=document.querySelector(".view-popup .close-icon");
let FileIconWrappers=document.querySelectorAll(".plan-box-card .image-wrapper")
let ViewPopUp=document.querySelector(".view-popup")
ClosePopupIcon.addEventListener('click',(e)=>{
    document.querySelector(".view-popup").style.display="none"
})

FileIconWrappers.forEach(FileIconWrapper=>{
FileIconWrapper.addEventListener("click",(e)=>{

    let DownloadButton=e.target.parentNode.parentNode.querySelector(".Download-button")   
    let FileLink=""
    if(DownloadButton!=null){
        FileLink=DownloadButton.getAttribute("href")
        let FileExtension=getFileExtension(FileLink)


        if(FileExtension=="jpg"||FileExtension=="jpeg"||FileExtension=="png"||FileExtension=="gif"){
            let HTML=`
            <img src=${FileLink} alt="">
            `
            ViewPopUp.querySelector(".video-area").style.display="none"
            ViewPopUp.querySelector(".content-area").innerHTML=HTML
        }else if (FileExtension=="mp4"){
            ViewPopUp.querySelector(".content-area").innerHTML=""
            ViewPopUp.querySelector(".video-area").style.display="block"
          document.querySelector("#my-video_html5_api").setAttribute("src",FileLink)
          document.querySelector("#my-video_html5_api #Atif").setAttribute("src",FileLink)
        }
        
        
    }
    document.querySelector(".view-popup").style.display="flex"
})
})
const getFileExtension=(fileLink)=>{
    let FileExtension=fileLink.split(".").pop()
    return FileExtension
}