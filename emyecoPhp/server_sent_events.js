if(typeof(EventSource) !== "undefined") {
    var source = new EventSource("demo_sse.php");
    source.onmessage = function(event) {
        document.getElementById("updates").innerHTML += event.data + "<br>";
    };
} else {
    document.getElementById("updates").innerHTML ="emyecoPhp: Sorry, your browser does not support server-sent events...";
}


