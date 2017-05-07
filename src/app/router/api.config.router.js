let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');

let loginRouter = require('./api/signIn');
let bookRouter = require('./api/books');

module.exports = (app) => {
  app.get('/file', (req, res) => {
    //方法1
    // res.download(path.join(__dirname, 'data.txt'))

    //方法2
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=' + 'hehe.xls'
    });
    // fs.readFile(path.join(__dirname, 'data.txt'), (err, result) => {
    //   res.end(result);
    // });
    // res.sendFile(path.join(__dirname, 'data.txt'));
    let buffer = new Buffer('321123');
    res.end(buffer);

    //方法3
    // fs.createReadStream(path.join(__dirname, 'data.txt')).pipe(res);
  });
  app.use('/api', router);
};

loginRouter(router);
bookRouter(router);