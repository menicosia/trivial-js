/* time-client.js */
/* JS to hit an API end-point to query DB connection status */

window.onload = function () {
    setInterval(handleRefresh, 10000) ;
    handleRefresh() ;
} ;

function handleRefresh() {
    var url = "http://trivial-js.52.5.41.43.xip.io/dbstatus" +
        "&callback=displayDBStatus" +
        "&random=" + (new Date().getTime()) ;
    console.log("Calling url: " + url) ;
    var newScriptElement = document.createElement("script") ;
    newScriptElement.setAttribute("src", url) ;
    newScriptElement.setAttribute("id", "jsonp") ;

    var oldScriptElement = document.getElementById("jsonp") ;
    var head = document.getElementsByTagName("head")[0] ;
    if (oldScriptElement == null) {
        head.appendChild(newScriptElement) ;
    }
}

function getDBStatus() {
    var url = "http://trivial-js.52.5.41.43.xip.io/dbstatus" ;
    var request = new XMLHttpRequest() ;
    request.onload = function () {
        if (200 == request.status) {
            displayDBStatus(request.responseText) ;
        } else {
            displayDBStatus("FAILED") ;
        }
    } ;
    console.log("Calling: " + url) ;
    request.open("GET", url) ;
    request.send(null) ;
}

function displayDBStatus(text) {
    console.log("in time-client.js/displayDBStatus") ;
    var p = document.getElementById("dbstatus") ;
    p.innerHTML = text ;
}
