loadAndPlotData();

setInterval(function () {
  let newData = generateRandomData();
  updatePlot(newData);
}, 5000);

let myPlot = null;
let allData = [];

function loadAndPlotData() {
  d3.csv(
    "https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv",
    function (err, rows) {
      function unpack(rows, key) {
        return rows.map(function (row) {
          return row[key];
        });
      }

      let z_data = [];
      for (i = 0; i < 24; i++) {
        z_data.push(unpack(rows, i));
      }

      let data = [
        {
          z: z_data,
          type: "surface",
        },
      ];

      allData = z_data.slice();
      let layout = {
        title: "Surface Plot",
        scene: {
          xaxis: { title: "Значення" },
          yaxis: { title: "Час" },
          zaxis: { title: "Значення" },
        },
      };

      myPlot = Plotly.newPlot("myDiv", data, layout);
    }
  );
}

function updatePlot(newData) {
  if (myPlot) {
    allData.push(newData);
    Plotly.extendTraces("myDiv", { z: [allData] }, [0]);
  } else {
    loadAndPlotData();
  }
}

function generateRandomData() {
  let newRow = [];
  for (let j = 0; j < 24; j++) {
    newRow.push(Math.random() * 100);
  }
  return newRow;
}
