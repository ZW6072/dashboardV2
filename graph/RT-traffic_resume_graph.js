var pivot17 = new WebDataRocks({
    container: "#pivot17",
    toolbar: false, //les boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 580,
    width: 900,
    report: {
			"dataSource": {
          "dataSourceType": "csv",
					"filename": "https://zw6072.github.io/depot_data/etat-du-trafic-en-temps-reel.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
      },
			"slice": {
				"reportFilters": [
        ],
				"rows": [
	 			],
				"columns": [
				],
				"measures": [
		 				{
						"uniqueName": "averageVehicleSpeed",
						"aggregation": "min",
            },
            {
            "uniqueName": "averageVehicleSpeed",
            "aggregation": "average",
            },
            {
            "uniqueName": "averageVehicleSpeed",
            "aggregation": "max",
            }
	 			]
			}
		},
    reportcomplete: function() {
      pivot17.off("reportcomplete");
      createChart17(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChart17() {
    pivot17.getData({}, drawChart17, updateChart17);
}

function prepareDataFunction17(rawData) {
    var result = {};
    var labels = [];
    var data = [];
    for (var i = 0; i < rawData.data.length; i++) {
        var record = rawData.data[i];
        if (record.c0 == undefined && record.r0 !== undefined) {
            var _record = record.r0;
            labels.push(_record);
        }
        if (record.c0 == undefined & record.r0 == undefined) continue;
        if (record.v0 != undefined) {
            data.push(!isNaN(record.v0) ? record.v0 : null);
        }
    }
    result.labels = labels;
    result.data = data;
    return result;
}

function drawChart17(rawData) {
    var data = prepareDataFunction17(rawData);
    var data_for_charts = {
        datasets: [{
            data: data.data,
            barThickness: 1.5,
            backgroundColor: [
                'rgba(0, 170, 255, 0.4)',
                'rgba(105, 175, 35, 0.5)',
                'rgba(255, 195, 0, 0.5)',
                'rgba(230, 45, 135, 0.5)',
                'rgba(85, 35, 130, 0.5)',
                'rgba(68, 74, 106, 0.5)',
                'rgba(190, 205, 0, 0.5)',
                'rgba(0, 85, 127, 0.5)',
                'rgba(53, 87, 18, 0.5)',
                'rgba(123, 17, 67, 0.5)',
                'rgba(231, 230, 230, 0.5)',
            ]
        }],
        labels: data.labels
    };
    options = {
        plugins: {
          responsive: true,
          legend: {
              display: false,
              position: 'right',
          },
          title: {
              display: true,
              fontSize: 18,
              text: 'Average speed by street'
          },
          scale: {
              ticks: {
                  beginAtZero: true
              },
              reverse: false
          },
          animation: {
              animateRotate: false,
              animateScale: true
          },
      },
    };

    var ctx = document.getElementById("chartcontainer17").getContext("2d");
    var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'bar',
        options: options
    });
}

function updateChart17(rawData) {
    chart.destroy17();
    drawChart17(rawData);
}
