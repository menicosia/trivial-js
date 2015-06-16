var http = require('http') ;
var strftime = require('strftime') ;
var sleep = require('sleep') ;
var url = require('url') ;

if (process.env.VCAP_SERVICES) {var db_uri = JSON.parse(process.env.VCAP_SERVICES) ;}
if (process.env.VCAP_APP_PORT) { var port = process.env.VCAP_APP_PORT ;}
else { var port = 8080 ; }
var data = "" ;

timeServer = http.createServer(function (request, response) {
    data = "" ;
    rootCall = request.url.match(/([^&]+)/)[0] ;
    console.log("Recieved request for: " + rootCall) ;
    switch (rootCall) {
    case "/env":
	      if (process.env) {
	          data += "<p>" ;
		        for (v in process.env) {
		            data += v + "=" + process.env[v] + "<br>\n" ;
		        }
		        data += "<br>\n" ;
	      } else {
		        data += "<p> No process env? <br>\n" ;
	      }
	      break ;
    case "/dbstatus":
        callBack = request.url.match(/callback=(\w+)/)[1] ;
        data += callBack + "(\"Call Received\")" ;
        break ;
    case "/sleep":
        data += "Sleeping 5 seconds." ;
        sleep.sleep(5) ;
        break ;
	  default:
	      data += "<p>" + strftime("%Y-%m-%d %H:%M") + "<br>\n" ;
	      data += "<p>Request was: " + request.url + "<br>\n" ;
	      data += "Database URI is: " + JSON.stringify(db_uri) + "</p>" ;
        data += "<hr>\n<A HREF=\"" + url.resolve(request.url, "env") + "\">/env</A>  " ;
        data += "<A HREF=\"" + url.resolve(request.url, "sleep") + "\">/sleep</A><br>\n" ;
	  }

	  response.end(data + '\n') ;
}) ;

timeServer.listen(port) ;
console.log("Server up and listening on port: " + port) ;
