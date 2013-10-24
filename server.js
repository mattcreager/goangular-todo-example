var port = process.env.PORT || 5000;

require('harp')
  .server(__dirname, { port: port });

console.log('HARP is serving cotent on port: ' + port);