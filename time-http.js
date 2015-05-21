var http = require('http') ;
var strftime = require('strftime') ;
if (process.env.VCAP_SERVICES) {var db_uri = JSON.parse(process.env.VCAP_SERVICES) ;}
if (process.env.VCAP_APP_PORT) { var port = process.env.VCAP_APP_PORT ;}
else { var port = 8080 ; }
var data = "" ;

console.log("Will listen on port: " + port) ;

timeServer = http.createServer(function (request, response) {
	switch (request.url) {
	case "/env":
	    if (process.env) {
	        data = "<p>" ;
		for (v in process.env) {
		    data += v + "=" + process.env[v] + "<br>\n" ;
		}
		data += "<br>\n" ;
	    } else {
		data = "<p> No process env? <br>\n" ;
	    }
	    break ;
	default:
	    data = "<p>" + strftime("%Y-%m-%d %H:%M") + "<br>\n" ;
	    data += "  Request was: " + request.url + "<br>\n" ;
	    data += "Database URI is: " + JSON.stringify(db_uri) ;
	}

	response.end(data + '\n') ;
    }) ;

timeServer.listen(port) ;
