var i = 0;
var timeevent = 0;


function timedEvent() {
    timeevent =timeevent + 1;
   
}



function timedCount() {
    
    timedEvent();
    postMessage(timeevent);
    setTimeout("timedCount()",100);
}

timedCount();
