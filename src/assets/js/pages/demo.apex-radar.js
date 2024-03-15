var colors = ["#124d92"],
  dataColors = $("#basic-radar").data("colors"),
  options = {
    chart: { height: 350, type: "radar" },
    series: [{ name: "Series 1", data: [80, 50, 30, 40, 100, 20] }],
    colors: (colors = dataColors ? dataColors.split(",") : colors),
    labels: ["January", "February", "March", "April", "May", "June"],
  },
  chart = new ApexCharts(document.querySelector("#basic-radar"), options),
  colors = (chart.render(), ["#FF4560"]),
  dataColors = $("#radar-polygon").data("colors"),
  options = {
    chart: { height: 350, type: "radar" },
    series: [{ name: "Series 1", data: [20, 100, 40, 30, 50, 80, 33] }],
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    plotOptions: { radar: { size: 140 } },
    colors: (colors = dataColors ? dataColors.split(",") : colors),
    markers: { size: 4, colors: ["#fff"], strokeColor: colors, strokeWidth: 2 },
    tooltip: {
      y: {
        formatter: function (r) {
          return r;
        },
      },
    },
    yaxis: {
      tickAmount: 7,
      labels: {
        formatter: function (r, a) {
          return a % 2 == 0 ? r : "";
        },
      },
    },
  },
  colors =
    ((chart = new ApexCharts(
      document.querySelector("#radar-polygon"),
      options
    )).render(),
    ["#124d92", "#02a8b5", "#fd7e14"]),
  dataColors = $("#radar-multiple-series").data("colors"),
  options = {
    chart: { height: 350, type: "radar" },
    series: [
      { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
      { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
      { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
    ],
    stroke: { width: 0 },
    fill: { opacity: 0.4 },
    markers: { size: 0 },
    legend: { offsetY: -10 },
    colors: (colors = dataColors ? dataColors.split(",") : colors),
    labels: ["2011", "2012", "2013", "2014", "2015", "2016"],
  };
function update() {
  function r() {
    for (var r = [], a = 0; a < 6; a++) r.push(Math.floor(100 * Math.random()));
    return r;
  }
  chart.updateSeries([
    { name: "Series 1", data: r() },
    { name: "Series 2", data: r() },
    { name: "Series 3", data: r() },
  ]);
}
(chart = new ApexCharts(
  document.querySelector("#radar-multiple-series"),
  options
)).render();
