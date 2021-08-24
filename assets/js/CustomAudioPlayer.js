export const AudioPlayer=()=>{
    let AudioButton=document.querySelector(".PlayButton");
    let AudioRange=document.querySelector(".audio-range");
    let isPlay=true
    let Track=new Audio();
    Track.src="./assets/demi.mp3"

const GetCurrentTrackTimePercentage=(time,duration)=>{
    return time*100/duration

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
   

  


    const HandlePlayButton=e=>{
        
        let AudioButton=e.target;

        console.log(AudioButton)
        if(isPlay==true){
            AudioButton.innerHTML='<i class="fas fa-pause"></i>'
            isPlay=false
            Track.play()
           
        }else{
            AudioButton.innerHTML=' <i class="fas fa-play"></i>'
            isPlay=true
            Track.pause()
            
        }

    }




    AudioButton.addEventListener("click",HandlePlayButton)
}