export const AudioPlayer = (FileLink, Track) => {
  let AudioButton = document.querySelector(".PlayButton");
  let AudioRange = document.querySelector(".range-div > input");
  let VolumeIcon = document.querySelector(".volume-icon-wrapper");
  let VolumeRange = document.querySelector("#volume-range");
  let StartTime = document.querySelector("#start-time");
  let EndTime = document.querySelector("#end-time");

  VolumeRange.addEventListener("mouseup", (e) => {
    let Value = e.target.value;

    console.log(Value);
    Track.volume = Value / 100;
    if (Value == 0) {
      document.querySelector(".sound").style.display = "none";
      document.querySelector(".mute").style.display = "block";
    } else {
      document.querySelector(".mute").style.display = "none";
      document.querySelector(".sound").style.display = "block";
    }
  });
  VolumeRange.addEventListener("touchend", (e) => {
    let Value = e.target.value;

    Track.volume = Value / 100;

    if (Value == 0) {
      document.querySelector(".sound").style.display = "none";
      document.querySelector(".mute").style.display = "block";
    } else {
      document.querySelector(".mute").style.display = "none";
      document.querySelector(".sound").style.display = "block";
    }
  });

  let isPlay = true;
  let isPlayed = false;

  Track.src = FileLink;
  let PlayInterval = "";

  let ClosePopupIcon = document.querySelector(".view-popup .close-icon");

  const GetCurrentTrackTimePercentage = (time, duration) => {
    return (time * 100) / duration;
  };

  const HandleDestroyObject = () => {
    PauseAudio();
    Track.currentTime = 0;

    document.querySelector(
      ".audio-area > .icon-wrapper"
    ).innerHTML = `  <i class="fas fa-headphones-alt"></i>`;

    document
      .querySelector(".audio-area > .icon-wrapper")
      .classList.remove("rotate");

    clearInterval(PlayInterval);

    isPlayed = false;
    EndTime.textContent = "00:00";
  };
  let d = 0;
  function AudioTimeFormatting(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - hr * 3600) / 60);
    var sec = Math.floor(secs - hr * 3600 - min * 60);

    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }

    return min + ":" + sec;
  }
  setInterval(() => {
    let CurrentTimePercentage = GetCurrentTrackTimePercentage(
      Track.currentTime,
      Track.duration
    );

    var currTime = Math.floor(Track.currentTime).toString();
    let AudioWorkingTime = AudioTimeFormatting(currTime);
    console.log(AudioWorkingTime);
    StartTime.textContent = AudioWorkingTime;

    AudioRange.value = `${CurrentTimePercentage}`;

    let EndingTime = AudioTimeFormatting(Track.duration);
    console.log(typeof EndingTime);
    if (EndTime != "NaN:NaN") {
      EndTime.textContent = EndingTime;
    }
  }, 1000);

  AudioRange.addEventListener("mouseup", (e) => {
    let CurrentRangePercentage = e.target.value;
    Track.currentTime = (CurrentRangePercentage * Track.duration) / 100;
    console.log(CurrentRangePercentage);
  });
  AudioRange.addEventListener("touchend", (e) => {
    let CurrentRangePercentage = e.target.value;
    Track.currentTime = (CurrentRangePercentage * Track.duration) / 100;
    console.log(CurrentRangePercentage);
  });

  const PlayAudio = () => {
    AudioButton.innerHTML = '<i class="fas fa-pause"></i>';
    isPlay = false;
    Track.play();
  };
  const PauseAudio = () => {
    AudioButton.innerHTML = ' <i class="fas fa-play"></i>';
    isPlay = true;
    Track.pause();
  };

  const HandlePlayButton = (e) => {
    if (isPlay == true) {
      PlayAudio();

      PlayInterval = setInterval(HandleCurrentState, 1000);
    } else {
      PauseAudio();
    }
  };

  const HandleCurrentState = () => {
    console.log("wir");

    if (Track.played.length == 0) {
      document.querySelector(
        ".audio-area > .icon-wrapper"
      ).innerHTML = `<i class="fas fa-spinner"></i>   `;

      document
        .querySelector(".audio-area > .icon-wrapper")
        .classList.add("rotate");

      isPlayed = true;
    } else {
      document.querySelector(
        ".audio-area > .icon-wrapper"
      ).innerHTML = `  <i class="fas fa-headphones-alt"></i>`;

      document
        .querySelector(".audio-area > .icon-wrapper")
        .classList.remove("rotate");
    }

    if ((isPlayed = true)) {
      clearInterval(PlayInterval);
    }
  };
  document
    .querySelector(".volume-icon-wrapper")
    .addEventListener("click", (e) => {
      e.target.classList.toggle("active");

      if (e.target.classList.contains("active")) {
        Track.volume = 0;
      } else {
        Track.volume = 1;
      }
    });

  document
    .querySelector(".volume-icon-wrapper")
    .addEventListener("touch", (e) => {
      e.target.classList.toggle("active");

      if (e.target.classList.contains("active")) {
        Track.volume = 0;
      } else {
        Track.volume = 1;
      }
    });

  AudioButton.addEventListener("click", HandlePlayButton);
  ClosePopupIcon.addEventListener("click", HandleDestroyObject);
};
