// create new link tag with the source as sitemanifest.json
// and the rel attribute set to manifest
// and append it to the head of the document


  var link = document.createElement('link');
  link.rel = 'manifest';
  link.href = 'build/sitemanifest.json';
  document.head.appendChild(link);


