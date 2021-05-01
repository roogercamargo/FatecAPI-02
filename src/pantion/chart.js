let ctx = document.getElementById('chart').getContext('2d');

Chart.defaults.global.defaultFontFamily = 'Roboto'

let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: [
                'rgba(41, 128, 185,0.8)',
                'rgba(41, 128, 185,0.8)',
                'rgba(52, 73, 94,0.8)',
                'rgba(44, 62, 80,0.8)',
                'rgba(149, 165, 166,0.8)',
                'rgba(127, 140, 141,0.8)'
            ],
            borderColor: [
                'rgba(41, 128, 185,1.0)',
                'rgba(41, 128, 185,1.0)',
                'rgba(52, 73, 94,1.0)',
                'rgba(44, 62, 80,1.0)',
                'rgba(149, 165, 166,1.0)',
                'rgba(127, 140, 141,1.0)'
            ],
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },
    // Configuration options go here
    options: {
        animation : {
            duration : 2000,
            easing : 'easeOutBounce'
        },
        layout : {
            padding : {
                left : 20,
                right : 20,
                top : 20,
                bottom : 20
            }
        },
        legend : {
            display : true,
            position : 'bottom'
        },
        title : {
            display : true,
            text : 'Sales by Months',
            fontSize : 20
        },
        tooltips : {
            enabled : true,
            intersect : true,
            backgroundColor : 'rgba(41, 128, 185,0.8)'
        },
        scales : {
            xAxes : [{
                gridLines : {
                    display : false,
                    drawBorder : false
                },
                position : 'bottom'
            }],
            yAxes : [{

                gridLines : {
                    display : false,
                    drawBorder : false
                }
            }]
        }
    }
});

const addData = () => {
    let sizeData = chart.data.datasets[0].data.length
    chart.data.datasets[0].data[sizeData] = Math.random() * 100
    chart.data.labels[sizeData] = `New Data ${sizeData + 1}`
    chart.update()
}

const removeData = () => {
    chart.data.datasets[0].data.pop()
    chart.data.labels.pop()
    chart.update()
}