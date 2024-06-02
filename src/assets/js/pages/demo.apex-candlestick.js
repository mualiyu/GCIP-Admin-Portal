var colors = ["#47ad77", "#fa5c7c"],
  dataColors = $("#simple-candlestick").data("colors"),
  options = {
    chart: { height: 400, type: "candlestick" },
    plotOptions: {
      candlestick: {
        colors: {
          upward: (colors = dataColors ? dataColors.split(",") : colors)[0],
          downward: colors[1],
        },
      },
    },
    series: [{ data: seriesData }],
    stroke: { show: !0, colors: "#f1f3fa", width: 1 },
    xaxis: { type: "datetime" },
    grid: { borderColor: "#f1f3fa" },
  },
  chart = new ApexCharts(
    document.querySelector("#simple-candlestick"),
    options
  ),
  colors = (chart.render(), ["#47ad77", "#fa5c7c"]),
  optionsCandlestick =
    ((dataColors = $("#combo-candlestick").data("colors")) &&
      (colors = dataColors.split(",")),
    {
      chart: {
        height: 240,
        type: "candlestick",
        toolbar: { show: !1 },
        zoom: { enabled: !1 },
      },
      series: [{ data: seriesData }],
      plotOptions: {
        candlestick: { colors: { upward: colors[0], downward: colors[1] } },
      },
      xaxis: { type: "datetime" },
      grid: { borderColor: "#f1f3fa" },
    }),
  chartCandlestick = new ApexCharts(
    document.querySelector("#combo-candlestick"),
    optionsCandlestick
  ),
  colors = (chartCandlestick.render(), ["#124d92", "#ffbc00"]),
  options =
    ((dataColors = $("#combo-bar-candlestick").data("colors")) &&
      (colors = dataColors.split(",")),
    {
      chart: {
        height: 160,
        type: "bar",
        toolbar: { show: !1, autoSelected: "selection" },
        selection: {
          xaxis: {
            min: new Date("20 Jan 2017").getTime(),
            max: new Date("10 Dec 2017").getTime(),
          },
          fill: { color: "#6c757d", opacity: 0.4 },
          stroke: { color: "#6c757d" },
        },
        events: {
          selection: function (e, t) {
            chartCandlestick.updateOptions(
              { xaxis: { min: t.xaxis.min, max: t.xaxis.max } },
              !1,
              !1
            );
          },
        },
      },
      dataLabels: { enabled: !1 },
      plotOptions: {
        bar: {
          columnWidth: "80%",
          colors: {
            ranges: [
              { from: -1e3, to: 0, color: colors[0] },
              { from: 1, to: 1e4, color: colors[1] },
            ],
          },
        },
      },
      series: [{ name: "volume", data: seriesDataLinear }],
      xaxis: { type: "datetime", axisBorder: { offsetX: 13 } },
      yaxis: { labels: { show: !1 } },
      grid: { borderColor: "#f1f3fa" },
    }),
  colors =
    ((chart = new ApexCharts(
      document.querySelector("#combo-bar-candlestick"),
      options
    )).render(),
    ["#124d92", "#ffbc00"]),
  options =
    ((dataColors = $("#x-axis-candlestick").data("colors")) &&
      (colors = dataColors.split(",")),
    {
      series: [
        {
          name: "candle",
          data: [
            { x: new Date(15387786e5), y: [6629.81, 6650.5, 6623.04, 6633.33] },
            { x: new Date(15387804e5), y: [6632.01, 6643.59, 6620, 6630.11] },
            {
              x: new Date(15387822e5),
              y: [6630.71, 6648.95, 6623.34, 6635.65],
            },
            { x: new Date(1538784e6), y: [6635.65, 6651, 6629.67, 6638.24] },
            { x: new Date(15387858e5), y: [6638.24, 6640, 6620, 6624.47] },
            {
              x: new Date(15387876e5),
              y: [6624.53, 6636.03, 6621.68, 6624.31],
            },
            { x: new Date(15387894e5), y: [6624.61, 6632.2, 6617, 6626.02] },
            { x: new Date(15387912e5), y: [6627, 6627.62, 6584.22, 6603.02] },
            { x: new Date(1538793e6), y: [6605, 6608.03, 6598.95, 6604.01] },
            { x: new Date(15387948e5), y: [6604.5, 6614.4, 6602.26, 6608.02] },
            {
              x: new Date(15387966e5),
              y: [6608.02, 6610.68, 6601.99, 6608.91],
            },
            { x: new Date(15387984e5), y: [6608.91, 6618.99, 6608.01, 6612] },
            { x: new Date(15388002e5), y: [6612, 6615.13, 6605.09, 6612] },
            { x: new Date(1538802e6), y: [6612, 6624.12, 6608.43, 6622.95] },
            { x: new Date(15388038e5), y: [6623.91, 6623.91, 6615, 6615.67] },
            { x: new Date(15388056e5), y: [6618.69, 6618.74, 6610, 6610.4] },
            { x: new Date(15388074e5), y: [6611, 6622.78, 6610.4, 6614.9] },
            { x: new Date(15388092e5), y: [6614.9, 6626.2, 6613.33, 6623.45] },
            { x: new Date(1538811e6), y: [6623.48, 6627, 6618.38, 6620.35] },
            {
              x: new Date(15388128e5),
              y: [6619.43, 6620.35, 6610.05, 6615.53],
            },
            { x: new Date(15388146e5), y: [6615.53, 6617.93, 6610, 6615.19] },
            { x: new Date(15388164e5), y: [6615.19, 6621.6, 6608.2, 6620] },
            { x: new Date(15388182e5), y: [6619.54, 6625.17, 6614.15, 6620] },
            { x: new Date(153882e7), y: [6620.33, 6634.15, 6617.24, 6624.61] },
            { x: new Date(15388218e5), y: [6625.95, 6626, 6611.66, 6617.58] },
            { x: new Date(15388236e5), y: [6619, 6625.97, 6595.27, 6598.86] },
            { x: new Date(15388254e5), y: [6598.86, 6598.88, 6570, 6587.16] },
            { x: new Date(15388272e5), y: [6588.86, 6600, 6580, 6593.4] },
            { x: new Date(1538829e6), y: [6593.99, 6598.89, 6585, 6587.81] },
            { x: new Date(15388308e5), y: [6587.81, 6592.73, 6567.14, 6578] },
            { x: new Date(15388326e5), y: [6578.35, 6581.72, 6567.39, 6579] },
            {
              x: new Date(15388344e5),
              y: [6579.38, 6580.92, 6566.77, 6575.96],
            },
            { x: new Date(15388362e5), y: [6575.96, 6589, 6571.77, 6588.92] },
            { x: new Date(1538838e6), y: [6588.92, 6594, 6577.55, 6589.22] },
            { x: new Date(15388398e5), y: [6589.3, 6598.89, 6589.1, 6596.08] },
            { x: new Date(15388416e5), y: [6597.5, 6600, 6588.39, 6596.25] },
            { x: new Date(15388434e5), y: [6598.03, 6600, 6588.73, 6595.97] },
            { x: new Date(15388452e5), y: [6595.97, 6602.01, 6588.17, 6602] },
            { x: new Date(1538847e6), y: [6602, 6607, 6596.51, 6599.95] },
            {
              x: new Date(15388488e5),
              y: [6600.63, 6601.21, 6590.39, 6591.02],
            },
            { x: new Date(15388506e5), y: [6591.02, 6603.08, 6591, 6591] },
            { x: new Date(15388524e5), y: [6591, 6601.32, 6585, 6592] },
            { x: new Date(15388542e5), y: [6593.13, 6596.01, 6590, 6593.34] },
            { x: new Date(1538856e6), y: [6593.34, 6604.76, 6582.63, 6593.86] },
            {
              x: new Date(15388578e5),
              y: [6593.86, 6604.28, 6586.57, 6600.01],
            },
            {
              x: new Date(15388596e5),
              y: [6601.81, 6603.21, 6592.78, 6596.25],
            },
            { x: new Date(15388614e5), y: [6596.25, 6604.2, 6590, 6602.99] },
            { x: new Date(15388632e5), y: [6602.99, 6606, 6584.99, 6587.81] },
            { x: new Date(1538865e6), y: [6587.81, 6595, 6583.27, 6591.96] },
            { x: new Date(15388668e5), y: [6591.97, 6596.07, 6585, 6588.39] },
            { x: new Date(15388686e5), y: [6587.6, 6598.21, 6587.6, 6594.27] },
            { x: new Date(15388704e5), y: [6596.44, 6601, 6590, 6596.55] },
            { x: new Date(15388722e5), y: [6598.91, 6605, 6596.61, 6600.02] },
            { x: new Date(1538874e6), y: [6600.55, 6605, 6589.14, 6593.01] },
            { x: new Date(15388758e5), y: [6593.15, 6605, 6592, 6603.06] },
            { x: new Date(15388776e5), y: [6603.07, 6604.5, 6599.09, 6603.89] },
            { x: new Date(15388794e5), y: [6604.44, 6604.44, 6600, 6603.5] },
            { x: new Date(15388812e5), y: [6603.5, 6603.99, 6597.5, 6603.86] },
            { x: new Date(1538883e6), y: [6603.85, 6605, 6600, 6604.07] },
            { x: new Date(15388848e5), y: [6604.98, 6606, 6604.07, 6606] },
          ],
        },
      ],
      chart: { height: 380, type: "candlestick" },
      title: { text: "CandleStick Chart - Category X-axis", align: "left" },
      grid: { padding: { top: 0, right: -2, bottom: -25, left: 0 } },
      annotations: {
        xaxis: [
          {
            x: "Oct 06 14:00",
            borderColor: colors[2],
            label: {
              borderColor: colors[2],
              style: { fontSize: "12px", color: "#fff", background: colors[2] },
              orientation: "horizontal",
              offsetY: 7,
              text: "Annotation Test",
            },
          },
        ],
      },
      plotOptions: {
        candlestick: { colors: { upward: colors[0], downward: colors[1] } },
      },
      tooltip: { enabled: !0 },
      colors: colors,
      xaxis: {
        type: "category",
        labels: {
          formatter: function (e) {
            return dayjs(e).format("MMM DD HH:mm");
          },
        },
      },
      yaxis: { tooltip: { enabled: !0 } },
    }),
  colors =
    ((chart = new ApexCharts(
      document.querySelector("#x-axis-candlestick"),
      options
    )).render(),
    ["#124d92", "#ffbc00"]),
  options =
    ((dataColors = $("#candlestick-with-line").data("colors")) &&
      (colors = dataColors.split(",")),
    {
      series: [
        {
          name: "Line",
          type: "line",
          data: [
            { x: new Date(15387786e5), y: 6604 },
            { x: new Date(15387822e5), y: 6602 },
            { x: new Date(15388146e5), y: 6607 },
            { x: new Date(15388848e5), y: 6620 },
          ],
        },
        {
          name: "Candle",
          type: "candlestick",
          data: [
            { x: new Date(15387786e5), y: [6629.81, 6650.5, 6623.04, 6633.33] },
            { x: new Date(15387804e5), y: [6632.01, 6643.59, 6620, 6630.11] },
            {
              x: new Date(15387822e5),
              y: [6630.71, 6648.95, 6623.34, 6635.65],
            },
            { x: new Date(1538784e6), y: [6635.65, 6651, 6629.67, 6638.24] },
            { x: new Date(15387858e5), y: [6638.24, 6640, 6620, 6624.47] },
            {
              x: new Date(15387876e5),
              y: [6624.53, 6636.03, 6621.68, 6624.31],
            },
            { x: new Date(15387894e5), y: [6624.61, 6632.2, 6617, 6626.02] },
            { x: new Date(15387912e5), y: [6627, 6627.62, 6584.22, 6603.02] },
            { x: new Date(1538793e6), y: [6605, 6608.03, 6598.95, 6604.01] },
            { x: new Date(15387948e5), y: [6604.5, 6614.4, 6602.26, 6608.02] },
            {
              x: new Date(15387966e5),
              y: [6608.02, 6610.68, 6601.99, 6608.91],
            },
            { x: new Date(15387984e5), y: [6608.91, 6618.99, 6608.01, 6612] },
            { x: new Date(15388002e5), y: [6612, 6615.13, 6605.09, 6612] },
            { x: new Date(1538802e6), y: [6612, 6624.12, 6608.43, 6622.95] },
            { x: new Date(15388038e5), y: [6623.91, 6623.91, 6615, 6615.67] },
            { x: new Date(15388056e5), y: [6618.69, 6618.74, 6610, 6610.4] },
            { x: new Date(15388074e5), y: [6611, 6622.78, 6610.4, 6614.9] },
            { x: new Date(15388092e5), y: [6614.9, 6626.2, 6613.33, 6623.45] },
            { x: new Date(1538811e6), y: [6623.48, 6627, 6618.38, 6620.35] },
            {
              x: new Date(15388128e5),
              y: [6619.43, 6620.35, 6610.05, 6615.53],
            },
            { x: new Date(15388146e5), y: [6615.53, 6617.93, 6610, 6615.19] },
            { x: new Date(15388164e5), y: [6615.19, 6621.6, 6608.2, 6620] },
            { x: new Date(15388182e5), y: [6619.54, 6625.17, 6614.15, 6620] },
            { x: new Date(153882e7), y: [6620.33, 6634.15, 6617.24, 6624.61] },
            { x: new Date(15388218e5), y: [6625.95, 6626, 6611.66, 6617.58] },
            { x: new Date(15388236e5), y: [6619, 6625.97, 6595.27, 6598.86] },
            { x: new Date(15388254e5), y: [6598.86, 6598.88, 6570, 6587.16] },
            { x: new Date(15388272e5), y: [6588.86, 6600, 6580, 6593.4] },
            { x: new Date(1538829e6), y: [6593.99, 6598.89, 6585, 6587.81] },
            { x: new Date(15388308e5), y: [6587.81, 6592.73, 6567.14, 6578] },
            { x: new Date(15388326e5), y: [6578.35, 6581.72, 6567.39, 6579] },
            {
              x: new Date(15388344e5),
              y: [6579.38, 6580.92, 6566.77, 6575.96],
            },
            { x: new Date(15388362e5), y: [6575.96, 6589, 6571.77, 6588.92] },
            { x: new Date(1538838e6), y: [6588.92, 6594, 6577.55, 6589.22] },
            { x: new Date(15388398e5), y: [6589.3, 6598.89, 6589.1, 6596.08] },
            { x: new Date(15388416e5), y: [6597.5, 6600, 6588.39, 6596.25] },
            { x: new Date(15388434e5), y: [6598.03, 6600, 6588.73, 6595.97] },
            { x: new Date(15388452e5), y: [6595.97, 6602.01, 6588.17, 6602] },
            { x: new Date(1538847e6), y: [6602, 6607, 6596.51, 6599.95] },
            {
              x: new Date(15388488e5),
              y: [6600.63, 6601.21, 6590.39, 6591.02],
            },
            { x: new Date(15388506e5), y: [6591.02, 6603.08, 6591, 6591] },
            { x: new Date(15388524e5), y: [6591, 6601.32, 6585, 6592] },
            { x: new Date(15388542e5), y: [6593.13, 6596.01, 6590, 6593.34] },
            { x: new Date(1538856e6), y: [6593.34, 6604.76, 6582.63, 6593.86] },
            {
              x: new Date(15388578e5),
              y: [6593.86, 6604.28, 6586.57, 6600.01],
            },
            {
              x: new Date(15388596e5),
              y: [6601.81, 6603.21, 6592.78, 6596.25],
            },
            { x: new Date(15388614e5), y: [6596.25, 6604.2, 6590, 6602.99] },
            { x: new Date(15388632e5), y: [6602.99, 6606, 6584.99, 6587.81] },
            { x: new Date(1538865e6), y: [6587.81, 6595, 6583.27, 6591.96] },
            { x: new Date(15388668e5), y: [6591.97, 6596.07, 6585, 6588.39] },
            { x: new Date(15388686e5), y: [6587.6, 6598.21, 6587.6, 6594.27] },
            { x: new Date(15388704e5), y: [6596.44, 6601, 6590, 6596.55] },
            { x: new Date(15388722e5), y: [6598.91, 6605, 6596.61, 6600.02] },
            { x: new Date(1538874e6), y: [6600.55, 6605, 6589.14, 6593.01] },
            { x: new Date(15388758e5), y: [6593.15, 6605, 6592, 6603.06] },
            { x: new Date(15388776e5), y: [6603.07, 6604.5, 6599.09, 6603.89] },
            { x: new Date(15388794e5), y: [6604.44, 6604.44, 6600, 6603.5] },
            { x: new Date(15388812e5), y: [6603.5, 6603.99, 6597.5, 6603.86] },
            { x: new Date(1538883e6), y: [6603.85, 6605, 6600, 6604.07] },
            { x: new Date(15388848e5), y: [6604.98, 6606, 6604.07, 6606] },
          ],
        },
      ],
      chart: { height: 380, type: "line" },
      title: { text: "CandleStick Chart", align: "left" },
      stroke: { width: [3, 1] },
      legend: { show: !0, horizontalAlign: "center", offsetX: 0, offsetY: 5 },
      grid: { padding: { top: 0, right: -2, bottom: 15, left: 10 } },
      colors: colors,
      plotOptions: {
        candlestick: { colors: { upward: colors[1], downward: colors[2] } },
      },
      tooltip: {
        shared: !0,
        custom: [
          function (e) {
            var t = e.seriesIndex,
              a = e.dataPointIndex;
            return e.w.globals.series[t][a];
          },
          function (e) {
            var t = e.seriesIndex,
              a = e.dataPointIndex,
              e = e.w;
            return (
              '<div class="apexcharts-tooltip-candlestick"><div>Open: <span class="value">' +
              e.globals.seriesCandleO[t][a] +
              '</span></div><div>High: <span class="value">' +
              e.globals.seriesCandleH[t][a] +
              '</span></div><div>Low: <span class="value">' +
              e.globals.seriesCandleL[t][a] +
              '</span></div><div>Close: <span class="value">' +
              e.globals.seriesCandleC[t][a] +
              "</span></div></div>"
            );
          },
        ],
      },
      xaxis: { type: "datetime" },
    });
(chart = new ApexCharts(
  document.querySelector("#candlestick-with-line"),
  options
)).render();
