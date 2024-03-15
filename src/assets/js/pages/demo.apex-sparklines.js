(Apex.grid = { padding: { right: 0, left: 0 } }),
  (Apex.dataLabels = { enabled: !1 });
var randomizeArray = function (t) {
    for (var o, r, e = t.slice(), a = e.length; 0 !== a; )
      (r = Math.floor(Math.random() * a)),
        (o = e[--a]),
        (e[a] = e[r]),
        (e[r] = o);
    return e;
  },
  sparklineData = [
    47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61,
    27, 54, 43, 19, 46,
  ],
  colorPalette = ["#00D8B6", "#008FFB", "#FEB019", "#FF4560", "#775DD0"],
  colors = ["#DCE6EC"],
  spark1 =
    ((dataColors = $("#spark1").data("colors")) &&
      (colors = dataColors.split(",")),
    {
      chart: { type: "area", height: 160, sparkline: { enabled: !0 } },
      stroke: { width: 2, curve: "straight" },
      fill: { opacity: 0.2 },
      series: [{ name: "Attex Sales ", data: randomizeArray(sparklineData) }],
      yaxis: { min: 0 },
      colors: colors,
      title: { text: "$424,652", offsetX: 20, style: { fontSize: "24px" } },
      subtitle: { text: "Sales", offsetX: 20, style: { fontSize: "14px" } },
    }),
  colors =
    (new ApexCharts(document.querySelector("#spark1"), spark1).render(),
    ["#DCE6EC"]),
  spark2 =
    ((dataColors = $("#spark2").data("colors")) &&
      (colors = dataColors.split(",")),
    {
      chart: { type: "area", height: 160, sparkline: { enabled: !0 } },
      stroke: { width: 2, curve: "straight" },
      fill: { opacity: 0.2 },
      series: [
        { name: "Attex Expenses ", data: randomizeArray(sparklineData) },
      ],
      yaxis: { min: 0 },
      colors: colors,
      title: { text: "$235,312", offsetX: 20, style: { fontSize: "24px" } },
      subtitle: { text: "Expenses", offsetX: 20, style: { fontSize: "14px" } },
    }),
  colors =
    (new ApexCharts(document.querySelector("#spark2"), spark2).render(),
    ["#47ad77"]),
  spark3 =
    ((dataColors = $("#spark3").data("colors")) &&
      (colors = dataColors.split(",")),
    {
      chart: { type: "area", height: 160, sparkline: { enabled: !0 } },
      stroke: { width: 2, curve: "straight" },
      fill: { opacity: 0.2 },
      series: [{ name: "Net Profits ", data: randomizeArray(sparklineData) }],
      xaxis: { crosshairs: { width: 1 } },
      yaxis: { min: 0 },
      colors: colors,
      title: { text: "$135,965", offsetX: 20, style: { fontSize: "24px" } },
      subtitle: { text: "Profits", offsetX: 20, style: { fontSize: "14px" } },
    }),
  colors =
    (new ApexCharts(document.querySelector("#spark3"), spark3).render(),
    ["#124d92"]),
  dataColors = $("#chart1").data("colors"),
  options1 = {
    chart: { type: "line", width: 140, height: 60, sparkline: { enabled: !0 } },
    series: [{ data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54] }],
    stroke: { width: 2, curve: "smooth" },
    markers: { size: 0 },
    colors: (colors = dataColors ? dataColors.split(",") : colors),
    tooltip: {
      fixed: { enabled: !1 },
      x: { show: !1 },
      y: {
        title: {
          formatter: function (t) {
            return "";
          },
        },
      },
      marker: { show: !1 },
    },
  },
  colors = ["#47ad77"],
  dataColors = $("#chart2").data("colors"),
  options2 = {
    chart: { type: "line", width: 140, height: 60, sparkline: { enabled: !0 } },
    colors: (colors = dataColors ? dataColors.split(",") : colors),
    series: [{ data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14] }],
    stroke: { width: 2, curve: "smooth" },
    markers: { size: 0 },
    tooltip: {
      fixed: { enabled: !1 },
      x: { show: !1 },
      y: {
        title: {
          formatter: function (t) {
            return "";
          },
        },
      },
      marker: { show: !1 },
    },
  },
  colors = ["#ffbc00"],
  dataColors = $("#chart3").data("colors"),
  options3 = {
    chart: { type: "line", width: 140, height: 60, sparkline: { enabled: !0 } },
    colors: (colors = dataColors ? dataColors.split(",") : colors),
    series: [{ data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82] }],
    stroke: { width: 2, curve: "smooth" },
    markers: { size: 0 },
    tooltip: {
      fixed: { enabled: !1 },
      x: { show: !1 },
      y: {
        title: {
          formatter: function (t) {
            return "";
          },
        },
      },
      marker: { show: !1 },
    },
  },
  colors = ["#fa5c7c"],
  dataColors = $("#chart4").data("colors"),
  options4 = {
    chart: { type: "line", width: 140, height: 60, sparkline: { enabled: !0 } },
    colors: (colors = dataColors ? dataColors.split(",") : colors),
    series: [{ data: [15, 75, 47, 65, 14, 2, 41, 54, 4, 27, 15] }],
    stroke: { width: 2, curve: "smooth" },
    markers: { size: 0 },
    tooltip: {
      fixed: { enabled: !1 },
      x: { show: !1 },
      y: {
        title: {
          formatter: function (t) {
            return "";
          },
        },
      },
      marker: { show: !1 },
    },
  },
  colors = ["#124d92"],
  dataColors = $("#chart5").data("colors"),
  options5 = {
    chart: { type: "bar", width: 100, height: 60, sparkline: { enabled: !0 } },
    plotOptions: { bar: { columnWidth: "80%" } },
    colors: (colors = dataColors ? dataColors.split(",") : colors),
    series: [{ data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54] }],
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    xaxis: { crosshairs: { width: 1 } },
    tooltip: {
      fixed: { enabled: !1 },
      x: { show: !1 },
      y: {
        title: {
          formatter: function (t) {
            return "";
          },
        },
      },
      marker: { show: !1 },
    },
  },
  colors = ["#47ad77"],
  dataColors = $("#chart6").data("colors"),
  options6 = {
    chart: { type: "bar", width: 100, height: 60, sparkline: { enabled: !0 } },
    plotOptions: { bar: { columnWidth: "80%" } },
    colors: (colors = dataColors ? dataColors.split(",") : colors),
    series: [{ data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14] }],
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    xaxis: { crosshairs: { width: 1 } },
    tooltip: {
      fixed: { enabled: !1 },
      x: { show: !1 },
      y: {
        title: {
          formatter: function (t) {
            return "";
          },
        },
      },
      marker: { show: !1 },
    },
  },
  colors = ["#ffbc00"],
  dataColors = $("#chart7").data("colors"),
  options7 = {
    chart: { type: "bar", width: 100, height: 60, sparkline: { enabled: !0 } },
    plotOptions: { bar: { columnWidth: "80%" } },
    colors: (colors = dataColors ? dataColors.split(",") : colors),
    series: [{ data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82] }],
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    xaxis: { crosshairs: { width: 1 } },
    tooltip: {
      fixed: { enabled: !1 },
      x: { show: !1 },
      y: {
        title: {
          formatter: function (t) {
            return "";
          },
        },
      },
      marker: { show: !1 },
    },
  },
  colors = ["#fa5c7c"],
  dataColors = $("#chart8").data("colors"),
  options8 = {
    chart: { type: "bar", width: 100, height: 60, sparkline: { enabled: !0 } },
    plotOptions: { bar: { columnWidth: "80%" } },
    colors: (colors = dataColors ? dataColors.split(",") : colors),
    series: [{ data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54] }],
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    xaxis: { crosshairs: { width: 1 } },
    tooltip: {
      fixed: { enabled: !1 },
      x: { show: !1 },
      y: {
        title: {
          formatter: function (t) {
            return "";
          },
        },
      },
      marker: { show: !1 },
    },
  };
new ApexCharts(document.querySelector("#chart1"), options1).render(),
  new ApexCharts(document.querySelector("#chart2"), options2).render(),
  new ApexCharts(document.querySelector("#chart3"), options3).render(),
  new ApexCharts(document.querySelector("#chart4"), options4).render(),
  new ApexCharts(document.querySelector("#chart5"), options5).render(),
  new ApexCharts(document.querySelector("#chart6"), options6).render(),
  new ApexCharts(document.querySelector("#chart7"), options7).render(),
  new ApexCharts(document.querySelector("#chart8"), options8).render();
