var timesofsp = new Array();
var timeofsp = new Array();
var maxsize = 9;
var sizes = new Array();
var start;
var end;
var repeat = 15;
var current = 0;

function imageDisplay()
{
    draw(sizes,timesofsp,"image");
}

function doImageParse(index)
{	
    var s = document.createElement('img');
    start = performance.now();
    document.body.appendChild(s);
    s.src = "./" + index + "e5.png";
    window.onerror = function(){
        end = performance.now();
        console.log(end - start);
        if(current < 5){
            current++;
            doImageParse(index);
        }
        else if(current < repeat){
            current++;
            timeofsp.push(end-start);
            doImageParse(index);
        }else{
            timeofsp.sort(sortNumber);
            timesofsp.push([index*1.2,timeofsp[Math.floor(timeofsp.length/2)]]);
            timeofsp = [];
            sizes.push(index);
            current = 0;
            imageDisplay();
            if(index < maxsize)doImageParse(index+1);
        }
    };
}

function imageParse()
{
    timesofsp = new Array();
    doImageParse(1);
}

function sortNumber(a,b) {
        return a - b;
}
