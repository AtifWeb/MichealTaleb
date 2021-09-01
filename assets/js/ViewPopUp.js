import {AudioPlayer} from './CustomAudioPlayer.js'

let Track=new Audio();








let ClosePopupIcon=document.querySelector(".view-popup .close-icon");
let FileIconWrappers=document.querySelectorAll(".plan-box-card .view-button")
let ViewPopUp=document.querySelector(".view-popup")
ClosePopupIcon.addEventListener('click',(e)=>{
    document.querySelector(".view-popup").style.display="none"
})

FileIconWrappers.forEach(FileIconWrapper=>{
FileIconWrapper.addEventListener("click",(e)=>{
    e.preventDefault()

    let DownloadButton=e.target
    let FileLink=""
    if(DownloadButton!=null){
        FileLink=DownloadButton.getAttribute("href")
        console.log(FileLink)
        let FileExtension=getFileExtension(FileLink)


        if(FileExtension=="jpg"||FileExtension=="jpeg"||FileExtension=="png"||FileExtension=="gif"){
            let HTML=`
            <img src=${FileLink} alt="">
            `
            ViewPopUp.querySelector(".video-area").style.display="none"
            ViewPopUp.querySelector(".audio-area").style.display="none"
            ViewPopUp.querySelector(".content-area").innerHTML=HTML
        }else if (FileExtension=="mp4"){
            ViewPopUp.querySelector(".content-area").innerHTML=""
            ViewPopUp.querySelector(".video-area").style.display="block"
            ViewPopUp.querySelector(".audio-area").style.display="none"
          document.querySelector("#my-video").setAttribute("src",FileLink)
      
        }else if(FileExtension=="mp3"){
            ViewPopUp.querySelector(".content-area").innerHTML=""
            ViewPopUp.querySelector(".video-area").style.display="none"
            ViewPopUp.querySelector(".audio-area").style.display="flex"
             // AudioPlayer
            AudioPlayer(FileLink,Track)
        }
        
        
    }
    document.querySelector(".view-popup").style.display="flex"
})
})
const getFileExtension=(fileLink)=>{
    let FileExtension=fileLink.split(".").pop()
    return FileExtension
}