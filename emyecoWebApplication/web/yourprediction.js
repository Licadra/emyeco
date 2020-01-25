var i = 0;
var timeevent = 0;

var url = 'C:\Users\Pavilion\Documents\GitHub\emyeco\stocksprediction.json'
 

function timedEvent() { 
    
var obj = JSON.parse(url);

timeevent = obj.stocksprediction[1].emyecoAIprediction;

     
   
}



function timedCount() {
   i = i + 1; 
    timedEvent();
    postMessage(i + timeevent);
    setTimeout("timedCount()",500);
}

timedCount();
