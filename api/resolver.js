var jade = require('jade');
var stylus = require('stylus')
  , str = require('fs').readFileSync(__dirname + '/style.styl', 'utf8');

module.exports = function(req, res) {
  var data = JSON.parse(req.body.params);
  if (!data) {
    res.status(403).send('Invalid params');
    return;
  }
  
  stylus(str)
    .set('filename', __dirname + '/style.styl')
    .define('urls', data.urls)
    .render(function (err, style) {
      if (err) throw err;
      var domFn = jade.compileFile('./api/layout.jade');
      var html = '<style>' + style + '</style>' + domFn({urls: data.urls});
      res.json({
        body: html
      });
    });
};
