var fs = require('fs');
var cssscss = require('css-scss');

var src = fs.readFileSync('./userChrome.css', 'utf8');
var scss = cssscss(src);

fs.writeFileSync('./src/higgsBosonChrome.scss', scss);

var src = fs.readFileSync('./userContent.css', 'utf8');
var scss = cssscss(src);

fs.writeFileSync('./src/higgsBosonContent.scss', scss);
