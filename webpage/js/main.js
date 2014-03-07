var DevicePort = "COM4";

var color = function() {
    var red = Math.floor(Math.random()*255);
    var blue = Math.floor(Math.random()*255);
    var green = Math.floor(Math.random()*255);

    document.getElementById("print_num").innerHTML = '<br><font color="red">R: ' + red + '</font><font color="green">   G: ' + green + '</font><font color="blue">   B: ' + blue;

    bgColor = document.getElementById("color_box");
    bgColor.style.backgroundColor = 'rgb(' + red + ',' + green + ', '+ blue + ')';

    setTimeout(color, 1000);
}

$(document).ready(function() {
            
    if(document.arduino) {
        
        var arduino = document.arduino;
        /*
        try { 
            arduino.open(DevicePort); 
        } catch(e) { 
            alert('WRONG devise port!'); 
        };
        */
                
        color();
    }
    else {
        alert("arduino.js hasn't been installed!");
    }
            
});
