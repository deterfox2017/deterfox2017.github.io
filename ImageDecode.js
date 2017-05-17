var timesofsp = new Array();
var timeofsp = [];
var maxsize = 9;
var sizes = new Array();
var start;
var end;
var repeat = 100;
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
        console.log(current);
        s.innerHTML = "";
        if(current < 10){
            current++;
            doImageDecode(index);
        }
        if(current < repeat){
            current++;
            timeofsp.push(end-start);
            doImageDecode(index);
        }else{
            timeofsp.sort(sortNumber);
            //var sum = timeofsp.reduce(function(a, b) { return a + b; });
            //var avg = sum / timeofsp.length;
            //timesofsp.push([index,avg]);
            timesofsp.push([index,timeofsp[Math.floor(timeofsp.length/2)]]);
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
    doImageDecode(5);
}

function sortNumber(a,b) {
        return a - b;
}
