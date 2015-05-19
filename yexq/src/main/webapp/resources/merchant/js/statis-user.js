$(function () {
    var chart = new Highcharts.Chart({
        credits:false,
        chart: {
            renderTo: 'Statistic-User-Body',
            type: 'pie'
        },
        title :{
            text:''
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle:90,
                center: ['50%', '70%']
            }
        },
        series: [{
            data: [
                ['新用户',   58.2],
                ['老用户',   41.8]
            ]
        }]
    });
});