//////////
//// Global definitions
/////////
const button = document.querySelector('button');
const title = document.createElement('h2');
const key = 'KPD2QzLF1l6fPqcIyDQrTA((';
const firstP = document.querySelector('.pageOne-p');
const qButton = document.querySelector('.questions-button');
const qForm = document.querySelector('.questions-form');
const list = document.querySelectorAll('li');
const links = document.querySelectorAll('.questions-link');
const currentTime = Math.floor(new Date().getTime() / 1000.0);
const month = 2678400;



////////
// Helper functions
///////

const getWiki = async (lang, key) => {
  if (lang[lang.length - 1] === '#') {
    lang = lang.slice(0, -1) + '%23';
  }
  let res = await axios.get(
    `https://api.stackexchange.com/2.2/tags/${lang}/wikis?site=stackoverflow&key=${key}`
  );
  let excerpt = res.data.items[0].excerpt;
  firstP.innerHTML = excerpt;
};

const getQuestions = async (key, language) => {
  let res = await axios.get(
    `https://api.stackexchange.com/2.2/questions?fromdate=${currentTime -
      month}&todate=${currentTime}&order=desc&sort=votes&tagged=${language}&site=stackoverflow&key=${key}`
  );
  let data = res.data.items;
  let mappedQuestions = data
    .map(obj => {
      return obj.title;
    })
    .slice(0, 5);
  let mappedLinks = data
    .map(obj => {
      return obj.link;
    })
    .slice(0, 5);

  for (let i = 0; i < mappedQuestions.length; i++) {
    list[i].innerHTML = mappedQuestions[i];
    links[i].href = mappedLinks[i];
    links[i].innerHTML = 'Discussion';
  }
};
/////////
//// GraphFunctions
////////
const getPie = async () => {
   let url = `https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow&key=${key}`;

  let res = await axios.get(url);
  let data = res.data.items;

  let parsedData = data
    .map(arr => {
      return [arr.name, arr.count];
    })
    .slice(0, 5);

  let chart = c3.generate({
    bindto: '.chart',
    data: {
      columns: [parsedData[0]],
      type: 'pie',
      onclick: function(d, i) {
        let name = d.name;
        getWiki(name, key);
      }
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

const getChart = async language => {
  let url = `https://api.stackexchange.com/2.2/tags/${language}/related?site=stackoverflow&key=${key}`;

  let res = await axios.get(url);
  let data = res.data.items;

  let parsedData = data
    .map(obj => {
      return [obj.name, obj.count];
    })
    .slice(0, 9);

  let chart = c3.generate({
    bindto: '.chart',
    data: {
      columns: [parsedData[1]],
      type: 'bar',
      onclick: function(d, i) {
        let name = d.name;

        getWiki(name, key);
      }
    }
  });
  setTimeout(() => {
    chart.load({
      columns: [parsedData[4]]
    });
  }, 500);

  setTimeout(() => {
    chart.load({
      columns: [parsedData[2], parsedData[3]]
    });
  }, 1000);

  setTimeout(() => {
    chart.load({
      columns: [parsedData[7]]
    });
  }, 2000);
  setTimeout(() => {
    chart.load({
      columns: [parsedData[5], parsedData[6], parsedData[8]]
    });
  }, 2200);

  return chart;
};
getPie();

////////
//// Event Listeners
///////
button.addEventListener('click', () => {
  let form = document.querySelector('.article--form');
  let searchQ = form.value;
  if (searchQ[searchQ.length - 1] === '#') {
    let sanitizedSearch = searchQ.slice(0, -1) + '%23';
    getChart(sanitizedSearch);
    getWiki(sanitizedSearch, key);
  } else {
    getChart(searchQ);
    getWiki(searchQ, key);
  }
});

qButton.addEventListener('click', e => {
  e.preventDefault();
  let langName = qForm.value;
  getQuestions(key, langName);
});
