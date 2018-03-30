var timesofsp = new Array();
var timeofsp = new Array();
var maxsize = 9;
var sizes = new Array();
var start;
var end;
var repeat = 15;
var current = 0;

function nextedge(){
    start = performance.now();
    stop = start;
    count = 0;
    while(start == stop){
        stop = performance.now();
        count++;
    }
    return [count,start,stop];
}

var MAX = 0;
for(i = 0; i < 100; i++){
    nextedge();
    [exp,pre,start] = nextedge();
    MAX = Math.max(exp, MAX);
}
exp = MAX;
grain = start - pre;

function scriptDisplay()
{
    draw(sizes,timesofsp,'Script Parsing Time for Files with Different Sizes');
}

function doScriptParse(index)
{	
    var s = document.createElement('script');

    nextedge();
    [exp1,pre,start] = nextedge();
    //start = performance.now();

    document.body.appendChild(s);
    s.src = "./" + index + "e5.js";
    window.onerror = function(){
        //end = performance.now();
        [remain,stop,post] = nextedge();
        duration = (stop-start)+((exp-remain)/exp)*grain;

        //console.log(start, end);
        //console.log(end - start);
        if(current < 5){
            current++;
            doScriptParse(index);
        }
        else if(current < repeat){
            current++;
            timeofsp.push(duration);
            doScriptParse(index);
        }else{
            timeofsp.sort(sortNumber);
            timesofsp.push([index*1.2,timeofsp[Math.floor(timeofsp.length/2)]]);
            timeofsp = [];
            sizes.push(index);
            current = 0;
            scriptDisplay();
            if(index < maxsize)doScriptParse(index+1);
        }
    };
}

function scriptParse()
{
    timesofsp = new Array();
    doScriptParse(1);
}

function sortNumber(a,b) {
        return a - b;
}
