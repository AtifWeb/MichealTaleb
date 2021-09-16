export const AudioPlayer = (FileLink, Track) => {
  let AudioButton = document.querySelector(".PlayButton");
  let AudioRange = document.querySelector(".range-div > input");
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
  };
  let d = 0;
  setInterval(() => {
    let CurrentTimePercentage = GetCurrentTrackTimePercentage(
      Track.currentTime,
      Track.duration
    );
    // d = d + 5;
    AudioRange.value = `${CurrentTimePercentage}`;
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
    let AudioButton = e.target;

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

  AudioButton.addEventListener("click", HandlePlayButton);
  ClosePopupIcon.addEventListener("click", HandleDestroyObject);
};
