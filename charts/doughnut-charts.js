var ctx = document.getElementById("usage-chart").getContext("2d");
const data = {
  datasets: [
    {
      // you can use your own values
      data: [10, 20],
      backgroundColor: ["#7161C4"],
      borderWidth: "0px",
      hoverBackgroundColor: ["#7161C4", "#a79fd1"],
      weight: 20,
    },
  ],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: ["Used", "Available"],
};
const options = {
  animation: {
    animateScale: true,
  },
  legend: {
    display: false,
  },
  cutoutPercentage: 80,
};
var myDoughnutChart = new Chart(ctx, {
  type: "doughnut",
  data: data,
  options: options,
});
