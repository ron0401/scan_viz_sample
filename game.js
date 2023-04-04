var haveEvents = 'GamepadEvent' in window;
var controllers = {};
var joy = {};
joy.axes = [0.0,0.0,0.0,0.0]
joy.buttons = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

var rAF = window.requestAnimationFrame;

function connectHandler(e) {
    addGamepad(e.gamepad);
}

function addGamepad(gamepad) {
    controllers[gamepad.index] = gamepad;
    rAF(updateStatus);
}

function disconnectHandler(e) {
    removeGamepad(e.gamepad);
}

function removeGamepad(gamepad) {
    delete controllers[gamepad.index];
}

function updateStatus() {
    scanGamepads();
    for (j in controllers) {
        var controller = controllers[j];
        buttons = []
        for (var i = 0; i < controller.buttons.length; i++) {
            // var b = buttons[i];
            var val = controller.buttons[i];
            var pressed = val == 1.0;
            if (typeof (val) == "object") {
                pressed = val.pressed;
                val = val.value;
            }
            buttons[i] = val;
            var pct = Math.round(val * 100) + "%";

        }
        axes = []
        for (var i = 0; i < controller.axes.length; i++) {
            axes[i] = controller.axes[i] * -1
        }
        joy.axes = axes
        joy.buttons = buttons
        console.log(JSON.stringify(joy))
        if (rosIsConnected) {
            var joy_msg = new ROSLIB.Message(joy);
            joyTopic.publish(joy_msg);
        }

    }
    rAF(updateStatus);
}

function scanGamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            if (!(gamepads[i].index in controllers)) {
                addGamepad(gamepads[i]);
                console.log("a");
            } else {
                controllers[gamepads[i].index] = gamepads[i];
            }
        }
    }
}

if (haveEvents) {
    window.addEventListener("gamepadconnected", connectHandler);
    window.addEventListener("gamepaddisconnected", disconnectHandler);
} else {
    setInterval(scanGamepads, 500);
}