

var ros = new ROSLIB.Ros({
    url : 'ws://' + host +  ':' + String(port)
});

var scanTopic = new ROSLIB.Topic({
    ros : ros,
    name : '/scan',
    messageType : 'sensor_msgs/LaserScan'
});

var chartData = {
    labels: [],  // x-axis values
    datasets: [{
        label: 'Scan Data',
        backgroundColor: 'rgba(0, 119, 204, 0.3)',
        borderColor: 'rgba(0, 119, 204, 1)',
        borderWidth: 1,
        data: []  // y-axis values
    },
    {
        label: 'robo',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        showLine: true,
        borderColor: 'red',
        data: [
            {
                x: -0.1,
                y: -0.1
            }, 
            {
                x: 0,
                y: 0.2
            }, 
            {
                x: 0.1,
                y: -0.1
            }, 
            {
                x: -0.1,
                y: -0.1
            }
        ],
    }
]
};

var chartOptions = {
    animation: false,
    aspectRatio: 1,
    type: 'radar',
    responsive: true,
    scales: {
        y: {
            suggestedMin: -5,
            suggestedMax: 5
        },
        x: {
            suggestedMin: -5,
            suggestedMax: 5
        }
    }
};

var chart = new Chart(document.getElementById('chart'), {
    type: 'scatter',
    data: chartData,
    options: chartOptions
});

scanTopic.subscribe(function(message) {
    var ranges = message.ranges;
    var angles = [];

    for (var i = 0; i < ranges.length; i++) {
        var angle = message.angle_min + (i * message.angle_increment);
        angles.push(angle);
    }

    var xValues = [];
    var yValues = [];

    for (var i = 0; i < ranges.length; i++) {
        var x = ranges[i] * Math.cos(angles[i]);
        var y = ranges[i] * Math.sin(angles[i]);

        xValues.push(-y);
        yValues.push(x);
    }

    chartData.labels = xValues;
    chartData.datasets[0].data = yValues;
    chart.update();
});