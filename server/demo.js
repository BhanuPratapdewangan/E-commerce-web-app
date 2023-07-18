
// Create server with nodejs

import http from "http";

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html'}); // response a html formate and 200 is status code is OK.
    res.write("Hi... Developers");  // write a response to client
    res.end();      // end the response
}).listen(8000);       // create server to listen port number 8080;