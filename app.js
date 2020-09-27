var StaticServer = require('static-server');
var server = new StaticServer({
    rootPath: './static',            // required, the root of the server file tree
    port: process.env.PORT || 3000,               // required, the port to listen
    name: 'static.thesologuy.info',   // optional, will set "X-Powered-by" HTTP header
    host: '0.0.0.0',       // optional, defaults to any interface
    cors: '*',                // optional, defaults to undefined
    followSymlink: true,      // optional, defaults to a 404 error
    templates: {
        index: 'index.html',      // optional, defaults to 'index.html'
        notFound: './static/404.html'    // optional, defaults to undefined
    }
});

server.start(function () {
    console.log('static server listening to', server.port);
});