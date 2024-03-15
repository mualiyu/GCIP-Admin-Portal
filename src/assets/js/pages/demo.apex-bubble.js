function generateData(a, e, t) {
  for (var o = 0, r = []; o < e; ) {
    var n = Math.floor(750 * Math.random()) + 1,
      l = Math.floor(Math.random() * (t.max - t.min + 1)) + t.min,
      d = Math.floor(61 * Math.random()) + 15;
    r.push([n, l, d]), o++;
  }
  return r;
}
var colors = ["#124d92", "#ffbc00", "#fa5c7c"],
  dataColors = $("#simple-bubble").data("colors"),
  options =
    (dataColors && (colors = dataColors.split(",")),
    {
      chart: { height: 380, type: "bubble", toolbar: { show: !1 } },
      dataLabels: { enabled: !1 },
      series: [
        {
          name: "Bubble 1",
          data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: "Bubble 2",
          data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: "Bubble 3",
          data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
      ],
      fill: { opacity: 0.8, gradient: { enabled: !1 } },
      colors: colors,
      xaxis: { tickAmount: 12, type: "category" },
      yaxis: { max: 70 },
      grid: { borderColor: "#f1f3fa", padding: { bottom: 5 } },
      legend: { offsetY: 7 },
    }),
  chart = new ApexCharts(document.querySelector("#simple-bubble"), options);
function generateData1(a, e, t) {
  for (var o = 0, r = []; o < e; ) {
    var n = Math.floor(Math.random() * (t.max - t.min + 1)) + t.min,
      l = Math.floor(61 * Math.random()) + 15;
    r.push([a, n, l]), (a += 864e5), o++;
  }
  return r;
}
chart.render();
var colors = ["#124d92", "#47ad77", "#fa5c7c", "#39afd1"],
  options2 =
    ((dataColors = $("#second-bubble").data("colors")) &&
      (colors = dataColors.split(",")),
    {
      chart: { height: 380, type: "bubble", toolbar: { show: !1 } },
      dataLabels: { enabled: !1 },
      series: [
        {
          name: "Product 1",
          data: generateData1(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: "Product 2",
          data: generateData1(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: "Product 3",
          data: generateData1(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: "Product 4",
          data: generateData1(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
      ],
      fill: { type: "gradient" },
      colors: colors,
      xaxis: { tickAmount: 12, type: "datetime", labels: { rotate: 0 } },
      yaxis: { max: 70 },
      legend: { offsetY: 7 },
      grid: { borderColor: "#f1f3fa", padding: { bottom: 5 } },
    });
(chart = new ApexCharts(
  document.querySelector("#second-bubble"),
  options2
)).render();
