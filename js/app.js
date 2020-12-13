let data, graph, myChart

let drawMultiChart = (labels, test, data1) => {

  myChart = new Chart(graph,{
    type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'test per day',
          fill: false,
          backgroundColor: "#009DE6",
          borderColor: "#009DE6",
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
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: 'top',
          labels: {
            defaultFontFamily: (Chart.defaults.global.defaultFontFamily = "'Source Sans Pro', 'Helvetica', 'arial', 'sans-serif'"),
            boxWidth: 10,
          },
        },
        scales:{
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
              }
          }]
        },
        tooltips: {
          enabled: true,
          mode: 'x-axis',
          xPadding: 10,
          yPadding: 10,
        },
      }
    })
  };
  const DataForChart = (data ,selector="WestVlaanderen") => {
    
    let labels = [];
    let test = [];
    let posTest = [];
    data.forEach(dataPoint => {
      if(dataPoint["PROVINCE"] == selector){
        labels.push(dataPoint["DATE"])
        test.push(dataPoint["TESTS_ALL"])
        posTest.push(dataPoint["TESTS_ALL_POS"])
      }
    });
    drawMultiChart(labels, test, posTest);
  };

  const Selector = (data) =>{
    const selector = document.querySelector(".js-province-select");
    let province = [];
    data.forEach(dataPoint => {
      if(dataPoint["PROVINCE"] != undefined){
        if(!province.includes(dataPoint["PROVINCE"])){
          let option = document.createElement("option");
          if(dataPoint["PROVINCE"] == "WestVlaanderen"){
            option.selected = dataPoint["PROVINCE"]
          }
          option.value = dataPoint["PROVINCE"];
          option.text = dataPoint["PROVINCE"];
          selector.appendChild(option)
          province.push(dataPoint["PROVINCE"])
        }
      }
    });
    
  }

  const listenToUi =  () => {
    const selector = document.querySelector(".js-province-select")
    selector.addEventListener("change", () => {
      myChart.destroy();
      DataForChart(data, selector.value);
    })
  }
  
  
  const getJson = async () => {
    const url = 'https://epistat.sciensano.be/Data/COVID19BE_tests.json';
    const r = await fetch(url);
    return await r.json();
  } 
  
  const init = async () => {
    graph = document.querySelector(".js-multi-Chart");
    data = await getJson()
    DataForChart(data);
    Selector(data);
    listenToUi();
  };

document.addEventListener("DOMContentLoaded", () => {
    init();
  });