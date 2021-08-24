export const AudioPlayer=(FileLink,Track)=>{
    let AudioButton=document.querySelector(".PlayButton");
    let AudioRange=document.querySelector(".audio-range");
    let isPlay=true
  
    Track.src=FileLink
    

    let ClosePopupIcon=document.querySelector(".view-popup .close-icon");

const GetCurrentTrackTimePercentage=(time,duration)=>{
    return time*100/duration

}

const HandleDestroyObject=()=>{
    
    PauseAudio()
    Track.currentTime=0
}


    setInterval(() => {
  
        let CurrentTimePercentage=GetCurrentTrackTimePercentage(Track.currentTime,Track.duration)
        AudioRange.value=CurrentTimePercentage
    }, 1000);



    AudioRange.addEventListener("mouseup",(e)=>{
        let CurrentRangePercentage=e.target.value;
        Track.currentTime=CurrentRangePercentage*Track.duration/100
        console.log(CurrentRangePercentage)
        
    })
   

const PlayAudio=()=>{
    AudioButton.innerHTML='<i class="fas fa-pause"></i>'
    isPlay=false
    Track.play()
}  
const PauseAudio=()=>{
    AudioButton.innerHTML=' <i class="fas fa-play"></i>'
            isPlay=true
            Track.pause()
}  


    const HandlePlayButton=e=>{
        
        let AudioButton=e.target;

        console.log(AudioButton)
        if(isPlay==true){
            PlayAudio()
           
        }else{
          
            PauseAudio()
        }

    }




    AudioButton.addEventListener("click",HandlePlayButton)
    ClosePopupIcon.addEventListener("click",HandleDestroyObject)
}


