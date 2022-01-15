let PlayButton = document.querySelector(".play_button");
let MuteButton = document.querySelector(".mute_button");
let TotalVideoTime = document.querySelector(".TotalTime");
let CoverVideoTime = document.querySelector(".CoverTime");
let InputRange = document.querySelector("#first_vide_range");
const ConvertSecondsIntoTime = (secs) => {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

const HandleVideoWork = (e) => {
  let Video =
    e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling
      .firstElementChild;

  let Seconds = Video.duration;
  TotalVideoTime.textContent = ConvertSecondsIntoTime(Seconds);

  setInterval(() => {
    let RangePercentage = (Video.currentTime / Video.duration) * 100;

    console.log();
    InputRange.setAttribute("value", parseInt(RangePercentage));
    CoverVideoTime.textContent = ConvertSecondsIntoTime(Video.currentTime);
  }, 1000);

  let Button = e.target;

  if (Video.paused) {
    Video.play();
    Button.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    Video.pause();
    Button.innerHTML = `  <i class="fas fa-play"></i>`;
  }
};

const HandleVideoSound = (e) => {
  let Video =
    e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling
      .firstElementChild;
  let Button = e.target;

  if (Video.muted !== true) {
    Video.muted = true;
    Button.innerHTML = ` <i class="fas fa-volume-mute"></i>`;
  } else {
    Video.muted = false;
    Button.innerHTML = `  <i class="fas fa-volume-down"></i>`;
  }
};

MuteButton.addEventListener("click", HandleVideoSound);

PlayButton.addEventListener("click", HandleVideoWork);
