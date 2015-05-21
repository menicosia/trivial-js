var http = require('http') ;
var strftime = require('strftime') ;
var db_uri = JSON.parse(process.env.VCAP_SERVICES) ;
var data = "" ;

timeServer = http.createServer(function (request, response) {
	data = "<p>" + strftime("%Y-%m-%d %H:%M") + "<br>\n" ;
	data += "Database URI is: " + JSON.stringify(db_uri) ;
	response.end(data + '\n') ;
    }) ;

timeServer.listen(process.env.VCAP_APP_PORT || 3000) ;
