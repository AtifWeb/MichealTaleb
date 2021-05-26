var CurrentValue;
$(".progress__bar").animate(
  {
    width: "100%",
  },
  {
    duration: 10000,
    progress: function (anim, progress, remainMS) {
      CurrentValue = (100 * progress).toFixed(0);
      $(".progress__value").text(CurrentValue + "%");
    },
  }
);
