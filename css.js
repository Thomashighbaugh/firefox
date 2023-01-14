/* ------------- CSS to SCSS Converter ------------- */
// This will convert userChrome and userContent to SCSS files, which was somewhat helpful when working with the Dark Matter CSS

// WARNING: if working with firefox variables, first you will need to remove them from the file as they will be horribly scrambled by this,
var fs = require("fs");
var cssScss = require("css-scss");

// var src = fs.readFileSync('./userChrome.css', 'utf8');
// var scss = cssScss(src);

// fs.writeFileSync('./userChrome.scss', scss);

var src = fs.readFileSync("./userContent.css", "utf8");
var scss = cssScss(src);

fs.writeFileSync("./userContent.scss", scss);
