var splide = new Splide(".splide", {
  type: "loop",
  perPage: 1,
  speed: 1000,
  dots: false,
  autoplay: false,
});
let Videos = document.querySelectorAll(".video-js .vjs-tech");
splide.on("move", function () {
  Videos.forEach((EachVideo) => {
    // EachVideo.paused();
  });
});
splide.mount();
