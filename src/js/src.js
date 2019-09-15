// Global definitions
const button = document.querySelector('button');
const title = document.createElement('h2');
const key = 'KPD2QzLF1l6fPqcIyDQrTA((';
const firstP = document.querySelector('.pageOne-p');
const qButton = document.querySelector('.questions-button');
const qForm = document.querySelector('.questions-form');
const list = document.querySelectorAll('li');
const links = document.querySelectorAll('.questions-link');

// Helper functions
const getWiki = async (lang, key) => {

  let res = await axios.get(
    `https://api.stackexchange.com/2.2/tags/${lang}/wikis?site=stackoverflow&key=${key}`
  );
  let excerpt = res.data.items[0].excerpt;
  firstP.innerHTML = excerpt;
};

const getQuestions = async (key, language) => {
  let res = await axios.get(
    `https://api.stackexchange.com/2.2/questions?fromdate=1568246400&todate=1568332800&order=desc&sort=votes&tagged=${language}&site=stackoverflow&key=${key}`
  );
  let data = res.data.items;
  let mappedQuestions = data
    .map(arr => {
      return arr.title;
    })
    .slice(0, 5);
  let mappedLinks = data
    .map(arr => {
      return arr.link;
    })
    .slice(0, 5);

  for (let i = 0; i < mappedQuestions.length; i++) {
    list[i].innerHTML = mappedQuestions[i];
    links[i].href = mappedLinks[i];
    links[i].innerHTML = 'Discussion';
  }
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

  let chart = c3.generate({
    bindto: '.chart',
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

getPie();

// Creating API Calls
button.addEventListener('click', () => {
  let form = document.querySelector('.article--form');
  let searchQ = form.value;
  if (searchQ[searchQ.length - 1] === '#') {
    let sanitizedSearch = searchQ.slice(0, -1) + '%23';
    getPie(sanitizedSearch);
  } else getPie(searchQ);
});

qButton.addEventListener('click', e => {
  e.preventDefault();
  let langName = qForm.value;
  getQuestions(key, langName);
});
