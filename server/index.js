const server = require('./app');

server().then(({ home }) => {
  console.log('server started: ' + home);
});
