var DevicePort = "COM4";

var Range = 8;
var Gate = 9;
var Ck = 10;
var Dout = 11;

function sleep(time) {
    var d1 = new Date().getTime();
    var d2 = new Date().getTime();
    while(d2<d1+time) {
        d2 = new Date().getTime();
    }
    return;
}

function shiftIn() {
    var result = 0;
    var arduino = document.arduino;
    for(i=0; i<12; i=i+1) {
        arduino.digitalWrite(Ck, 1);
        sleep(1);
        if(arduino.digitalRead(Dout)==1) {
            result = result + (1<<i);
        }
        arduino.digitalWrite(Ck, 0);
        sleep(1);
    }
    sleep(3);
    return result;
}

var color = function() {

    var arduino = document.arduino;

    var val = arduino.analogRead(0);

    arduino.digitalWrite(Gate, 0);
    arduino.digitalWrite(Ck, 0);
    sleep(2);

    arduino.digitalWrite(Range, 1);
    arduino.digitalWrite(Gate, 1);
    sleep(val+1);

    arduino.digitalWrite(Gate, 0);
    sleep(4);

    var tmpR = shiftIn();
    var tmpG = shiftIn();
    var tmpB = shiftIn();
    //alert(tmpB);

    var red = Math.floor((tmpR/4095)*255);
    var green = Math.floor((tmpG/4095)*255);
    var blue = Math.floor((tmpB/4095)*255);

    arduino.digitalWrite(Gate, 1);

    document.getElementById("print_num").innerHTML = '<br><font color="red">R: ' + red + '</font><font color="green">   G: ' + green + '</font><font color="blue">   B: ' + blue;

    bgColor = document.getElementById("color_box");
    bgColor.style.backgroundColor = 'rgb(' + red + ',' + green + ', '+ blue + ')';

    var revR = 255-red;
    var revG = 255-green;
    var revB = 255-blue;

    bgColor.style.color = 'rgb(' + revR + ',' + revG + ',' + revB + ')';

    setTimeout(color, 1000);
}

function setup() {
    if(document.arduino) {
        var arduino = document.arduino;
        try{
            arduino.open(DevicePort);
            arduino.pinMode(Range, true);
            arduino.pinMode(Gate, true);
            arduino.pinMode(Ck, true);
            arduino.pinMode(Dout, false);
            color();
        } catch(e) {
            alert("Connection failed!");
        }
    }
    else {
        alert("NO arduino.js!");
    }
};

$(function () {
    setup();
});

function changeDevicePort(){
    DevicePort = $('#devPort').val();
    setup();
};

