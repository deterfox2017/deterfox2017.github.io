var timesofsp = new Array();
var timeofsp = [];
var maxsize = 9;
var sizes = new Array();
var start;
var end;
var repeat = 35;
var current = 0;
var s;

function imageDisplay()
{
    draw(sizes,timesofsp,"image");
}

function doImageDecode(index)
{	
    s = document.createElement('img');
    start = performance.now();
    document.body.appendChild(s);
    s.src = "./" + index + "e5.png";
    s.onerror = function(){
        end = performance.now();
        console.log(end - start);
        s.innerHTML = "";
        if(current < 5){
            current++;
            doImageDecode(index);
        }
        else if(current < repeat){
            current++;
            timeofsp.push(end-start);
            doImageDecode(index);
        }else{
            var sum = timeofsp.reduce(function(a, b) { return a + b; });
            var avg = sum / timeofsp.length;
            timesofsp.push([index,avg]);
            sizes.push(index);
            current = 0;
            timeofsp = [];
            imageDisplay();
            if(index < maxsize)doImageDecode(index+1);
        }
    };
}

function imageDecode()
{
    console.log("image decode");
    timesofsp = new Array();
    doImageDecode(1);
}
