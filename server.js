var http = require('http') ;
var strftime = require('strftime') ;
var sleep = require('sleep') ;
var url = require('url') ;
var port = 8080 ;
var myIndex = 0 ;

if (process.env.VCAP_SERVICES) { var db_uri = JSON.parse(process.env.VCAP_SERVICES) ; }
if (process.env.VCAP_APP_PORT) { port = process.env.VCAP_APP_PORT ; }
else if (process.env.PORT) { port = process.env.PORT ; }
if (process.env.CF_INSTANCE_INDEX) { myIndex = process.env.CF_INSTANCE_INDEX ; }
else if (process.env.INSTANCE_INDEX) { myIndex = process.env.INSTANCE_INDEX ; }

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
        data += "<h1>Trivial Node App</h1>\n" ;
	      data += "<p>" + "<h2>Instance " + myIndex + "</h2><br>\n" ;
        data += "[" + strftime("%Y-%m-%d %H:%M") + "]";
	      data += "  Request was: " + request.url + "<br>\n" ;
        data += "<hr>\n<A HREF=\"" + url.resolve(request.url, "env") + "\">/env</A>  " ;
        data += "<A HREF=\"" + url.resolve(request.url, "sleep") + "\">/sleep</A><br>\n" ;
	  }

	  response.end(data + '\n') ;
}) ;

timeServer.listen(port) ;
console.log("Server up and listening on port: " + port) ;
