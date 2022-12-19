// svgo.config.js
module.exports = {
  multipass: true, // boolean. false by default
  js2svg: {
    indent: 2, // string with spaces or number of spaces. 4 by default
    pretty: true, // boolean, false by default
  },
  plugins: [
    // set of built-in plugins enabled by default
    'preset-default',
    'removeXMLNS',
    'convertStyleToAttrs',
    'cleanupEnableBackground',
    'cleanupIds',
    'cleanupListOfValues',
    'collapseGroups',
    'mergePaths',
    'removeHiddenElems',
    'removeOffCanvasPaths',
    'removeUselessStrokeAndFill',
    'sortDefsChildren',
    'sortAttrs',
    'convertPathData',
    'convertShapeToPath',
    'minifyStyles',
    'removeTitle',
    'removeUselessDefs',
    'removeViewBox',
    'removeMetadata',
    'removeEmptyContainers',
    'cleanupAttrs',
    // enable built-in plugins by name
    'prefixIds',

    // or by expanded notation which allows to configure plugin
    {
      name: 'sortAttrs',
      params: {
        xmlnsOrder: 'alphabetical',
      },
    },
  ],
};
