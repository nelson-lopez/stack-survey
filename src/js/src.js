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
  let parsedDataName = parsedData[0][0];
  console.log(parsedDataName);

  let chart = c3.generate({
    bindto:'.chart',
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
  let color = chart.color;
  color[parsedData[0][0]] = '#ff0000';
  console.log(color);
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
  let form = document.querySelector('.article--form');
  let searchQ = form.value;
  getPie(searchQ);
});
