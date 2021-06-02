const path = require('path');
const express = require('express');
const{ createProxyMiddleware }= require('http-proxy-middleware');
const app = express();
console.log('listen on port 3000');
app.use(
'/api',
  createProxyMiddleware({target: 'http://api.github.com',
changeOrigin: true}),
);
app.use('/', express.static('dist'));//如果不在根⽬录，这是要调整
app.get('*',function(request, response){
  response.sendFile(path.resolve(__dirname,'dist/index.html'));
});
app.listen(3000);