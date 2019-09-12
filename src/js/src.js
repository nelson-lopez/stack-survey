// Global definitions
let button = document.querySelector('button');
let test = '';
let title = document.createElement('h2');
let key = 'KPD2QzLF1l6fPqcIyDQrTA((';
let firstP = document.querySelector('.pageOne-p');

// Helper functions
const getWiki = async (lang, key) => {
  if (lang === 'c#') {
    lang = 'c%23';
  }
  let res = await axios.get(
    `https://api.stackexchange.com/2.2/tags/${lang}/wikis?site=stackoverflow&key=${key}`
  );
  let excerpt = res.data.items[0].excerpt;
  firstP.innerHTML = excerpt;
};
// GraphFunctions
const getPie = async language => {
  let url = '';
  if (!language) {
    url = `https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow&key=${key}`;
  } else if (language) {
    url = `https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&inname=${language}&site=stackoverflow&key=${key}`;
  }
  let res = await axios.get(url);
  let data = res.data.items;

  let parsedData = data
    .map(arr => {
      return [arr.name, arr.count];
    })
    .slice(0, 5);
  console.log(parsedData);

  let chart = c3.generate({
    data: {
      columns: [parsedData[0]],
      type: 'pie',
      onclick: function(d, i) {
        let name = d.name;
        getWiki(name, key);
      }
    },
    transition: {
      duration: 500
    }
  });

  setTimeout(() => {
    chart.load({
      columns: [parsedData[1]]
    });
  }, 500);

  setTimeout(() => {
    chart.load({
      columns: [parsedData[2], parsedData[3]]
    });
  }, 1000);

  setTimeout(() => {
    chart.load({
      columns: [parsedData[4]]
    });
  }, 2000);

  return chart;
};

// Timeseries chart
const getTimeseries = async language => {
  let url = '';
  if (!language) {
    url = `https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow&key=${key}`;
  } else if (language) {
    url = `https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&inname=${language}&site=stackoverflow&key=${key}`;
  }
  let res = await axios.get(url);
  let data = res.data.items;

  let parsedData = data
    .map(arr => {
      return [arr.name, arr.count];
    })
    .slice(0, 5);
  console.log(parsedData);

  let chart2 = c3.generate({
    bindto: '#chart2',
    data: {
      columns: [parsedData[0]],
      type: 'bar',
      onclick: function(d, i) {}
    },
    transition: {
      duration: 500
    }
  });

  setTimeout(() => {
    chart2.load({
      columns: [parsedData[1]]
    });
  }, 500);

  setTimeout(() => {
    chart2.load({
      columns: [parsedData[2], parsedData[3]]
    });
  }, 1000);

  setTimeout(() => {
    chart2.load({
      columns: [parsedData[4]]
    });
  }, 2000);

  return chart2;
};

getPie();
getTimeseries();

// Creating API Calls
button.addEventListener('click', () => {
  let form = document.querySelector('#form-graph1');
  let searchQ = form.value;
  getPie(searchQ);
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
