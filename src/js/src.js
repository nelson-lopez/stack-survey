let chart = c3.generate({
  data: {
    columns: [['data1', 30], ['data2', 120]],
    type: 'pie',
    onclick: function (d, i) {
      console.log('onclick', d, i);
    },
    onmouseover: function (d, i) {
      console.log('onmouseover', d, i);
    },
    onmouseout: function (d, i) {
      console.log('onmouseout', d, i);
    }
  }
});
let chart2 = c3.generate({
  bindto: '#chart2',
  data: {
    columns: [
      ['data1', 100, 200, 100, 400, 150, 250],
      ['data2', 50, 20, 10, 40, 15, 25]
    ]
  }
});

chart.load({
  columns: [
    ['data1', 300, 100, 250, 150, 300, 150, 500],
    ['data2', 100, 200, 150, 50, 100, 250]
  ]
});

let chart3 = c3.generate({
  bindto: '#chart3',
  data: {
    columns: [
      ['data1', 300, 350, 300, 0, 0, 120],
      ['data2', 130, 100, 140, 200, 150, 50]
    ],
    types: {
      data1: 'area-spline',
      data2: 'area-spline'
      // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
    },
    groups: [['data1', 'data2']]
  }
});

setTimeout(function () {
  chart.load({
    columns: [
      ['data3', 400, 500, 450, 700, 600, 500]
    ]
  });
}, 1000);

