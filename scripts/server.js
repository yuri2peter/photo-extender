const server = require('../server');

server().then(({ home }) => {
  console.log('server started: ' + home);
});