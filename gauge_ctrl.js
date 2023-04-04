var opts_1 = {
    angle: -0.3, /// The span of the gauge arc
    lineWidth: 0.24, // The line thickness
    pointer: {
        length: 0.7, // Relative to gauge radius
        strokeWidth: 0.035 // The thickness
    },
    colorStart: '#6FADCF',   // Colors
    colorStop: '#8FC0DA',    // just experiment with them
    generateGradient: true,
    highDpiSupport: true,
    strokeColor: '#E0E0E0'   // to see which ones work best for you
};


var opts_2 = {
    angle: -0.3, /// The span of the gauge arc
    lineWidth: 0.24, // The line thickness
    pointer: {
        length: 0.7, // Relative to gauge radius
        strokeWidth: 0.035 // The thickness
    },
    colorStart: '#6FADCF',   // Colors
    colorStop: '#8FC0DA',    // just experiment with them
    generateGradient: true,
    highDpiSupport: true,
    strokeColor: '#E0E0E0'   // to see which ones work best for you
};

var target_1 = document.getElementById('gauge_1'); // your canvas element
var gauge_1 = new Gauge(target_1).setOptions(opts_1); // create sexy gauge!
var target_2 = document.getElementById('gauge_2'); // your canvas element
var gauge_2 = new Gauge(target_2).setOptions(opts_2); // create sexy gauge!


gauge_1.maxValue = 1.0; // set max gauge value
gauge_1.setMinValue(0.0);  // set min value
gauge_1.set(0.0); // set actual value

gauge_2.maxValue = 0.5; // set max gauge value
gauge_2.setMinValue(-0.5);  // set min value
gauge_2.set(0.0); // set actual value
