var http = require('http') ;
var strftime = require('strftime') ;
var sleep = require('sleep') ;
var url = require('url') ;
var port = 8080 ;
var myIndex = 0 ;
var appHealth = 1 ;

if (process.env.VCAP_SERVICES) { var db_uri = JSON.parse(process.env.VCAP_SERVICES) ; }
if (process.env.VCAP_APP_PORT) { port = process.env.VCAP_APP_PORT ; }
else if (process.env.PORT) { port = process.env.PORT ; }
if (process.env.CF_INSTANCE_INDEX) { myIndex = process.env.CF_INSTANCE_INDEX ; }
else if (process.env.INSTANCE_INDEX) { myIndex = process.env.INSTANCE_INDEX ; }

var data = "" ;

function genDefaultPage(request, message) {
    pageStr = "" ;
    pageStr += "<h1>Trivial Node App</h1>\n" ;
	  pageStr += "<p>" + "<b>Instance " + myIndex + "</b><br>\n" ;
    pageStr += "[" + strftime("%Y-%m-%d %H:%M") + "]";
	  pageStr += " Request was: " + request.url + "<br>\n" ;
    if (message != null) {
        pageStr += "<br><em>" + message + "</em><br><br>\n" ;
    }
    pageStr += "<hr>\n<A HREF=\"" + url.resolve(request.url, "/env") + "\">/env</A>" ;
    pageStr += "  <A HREF=\"" + url.resolve(request.url, "/sleep") + "\">/sleep</A>\n" ;
    pageStr += "  <A HREF=\"" + url.resolve(request.url, "/healthStatus") + "\">/healthStatus</A>\n" ;
    pageStr += "  <A HREF=\"" + url.resolve(request.url, "/exit") + "\">/exit</A>\n" ;
    pageStr += "<br>\n" ;
    pageStr += "Set Health status: <A HREF=\"" + url.resolve(request.url, "/set/health=on") + "\">ON</A>\n" ;
    pageStr += "  <A HREF=\"" + url.resolve(request.url, "/set/health=off") + "\">OFF</A><br>\n" ;
    return (pageStr) ;
}

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
    case "/exit":
        process.exit(0) ;
        break ;
    case "/set/health=off":
        appHealth = 0 ;
        data = genDefaultPage(request, "Health status set to OFF.") ;
        break ;
    case "/set/health=on":
        appHealth = 1 ;
        data = genDefaultPage(request, "Health status set to ON.") ;
        break ;
    case "/healthStatus":
        data = appHealth ;
        break ;
	  default:
        data = genDefaultPage(request) ;
	  }

	  response.end(data + '\n') ;
}) ;

timeServer.listen(port) ;
console.log("Server up and listening on port: " + port) ;
