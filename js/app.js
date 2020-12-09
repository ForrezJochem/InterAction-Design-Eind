
const drawMultiChart = function (labels, test, data1) {
  var ctx = document.querySelector(".js-multi-Chart").getContext("2d");
    let config = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'test per day',
          fill: false,
          backgroundColor: "red",
          borderColor: "red",
          pointRadius: 0,
          pointHoverRadius: 0,
          data: test,
        }, {
          label: 'positve tests',
          fill: false,
          backgroundColor: "green",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderColor: "green",
          data: data1,
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Corona tests'
        },
        tooltips: {
          enabled: true,
          mode: 'x-axis',
          xPadding: 10,
          yPadding: 10,
        },

      }
    };
    let myChart = new Chart(ctx, config);
  };
  const getData = (data) => {
    var labels = [];
    var test = [];
    var posTest = [];
    data.forEach(dataPoint => {
      if(dataPoint["PROVINCE"] == "WestVlaanderen"){
        labels.push(dataPoint["DATE"])
        test.push(dataPoint["TESTS_ALL"])
        posTest.push(dataPoint["TESTS_ALL_POS"])
        console.log(dataPoint);
      }
    });
    console.log(test);
    console.log(posTest)
    drawMultiChart(labels, test, posTest);
  };


  const GetNumbers = function() {

    const endpoint = `https://epistat.sciensano.be/Data/COVID19BE_tests.json`;
  
    fetch(endpoint)
      .then((r) => r.json())
      .then((json) => {
        console.log(json)
        getData(json);
      })
  };
  
  const init = () => {
    GetNumbers();
  };

document.addEventListener("DOMContentLoaded", function () {
    console.info("DOM geladen");
    init();
  });