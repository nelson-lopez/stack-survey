// Global definitions
let button = document.querySelector('button');
let test = '';
let title = document.createElement('h2');

// Helper functions

const getData = async () => {
  let key = 'KPD2QzLF1l6fPqcIyDQrTA(('
  let url = `https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow&key=${key}`;
  let res = await axios.get(url);
  let data = res.data.items;

  let parsedData = data.map((arr) =>{
    return [arr.name, arr.count]
  }).slice(0,5)

  let chart = c3.generate({
    data: {
      columns: parsedData,
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
  return chart
};

getData()

// Creating API Calls
button.addEventListener('click', () =>{
  let form = document.querySelector('#form-graph1');
  let searchQ = form.value
  getData(searchQ)
});








// Chart generating


// let chart2 = c3.generate({
//   bindto: '#chart2',
//   data: {
//     columns: [
//       ['data1', 100, 200, 100, 400, 150, 250],
//       ['data2', 50, 20, 10, 40, 15, 25]
//     ]
//   }
// });

// chart.load({
//   columns: [
//     ['data1', 300, 100, 250, 150, 300, 150, 500],
//     ['data2', 100, 200, 150, 50, 100, 250]
//   ]
// });

// let chart3 = c3.generate({
//   bindto: '#chart3',
//   data: {
//     columns: [
//       ['data1', 300, 350, 300, 0, 0, 120],
//       ['data2', 130, 100, 140, 200, 150, 50]
//     ],
//     types: {
//       data1: 'area-spline',
//       data2: 'area-spline'
//     },
//     groups: [['data1', 'data2']]
//   }
// });

// setTimeout(function() {
//   chart.load({
//     columns: [[title, 400, 500, 450, 700, 600, 500]]
//   });
// }, 1000);
