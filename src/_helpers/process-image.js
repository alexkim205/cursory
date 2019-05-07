// https://github.com/josefrichter/resize/blob/master/public/preprocess.js

const imageConfig = {
  type: 'image/jpeg',
  quality: 0.6,
  maxWidth: 1000,
  maxHeight: 1000,
};

function processfile(file, commandCallback) {

  if (!(/image/i).test(file.type)) {
    alert('File ' + file.name + ' is not an image.');
    return false;
  }

  // read the files
  var reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onload = function(event) {
    // blob stuff
    var blob = new Blob([event.target.result]); // create blob...
    window.URL = window.URL || window.webkitURL;
    var blobURL = window.URL.createObjectURL(blob); // and get it's URL

    // helper Image object
    var image = new Image();
    image.src = blobURL;
    image.onload = function() {
      // have to wait till it's loaded
      var resized = resizeMe(image); // send it to canvas
      commandCallback(resized);
    };
  };
}

function resizeMe(img) {

  var canvas = document.createElement('canvas');

  var width = img.width;
  var height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > imageConfig.maxWidth) {
      //height *= max_width / width;
      height = Math.round(height *= imageConfig.maxWidth / width);
      width = imageConfig.maxWidth;
    }
  } else {
    if (height > imageConfig.maxHeight) {
      //width *= max_height / height;
      width = Math.round(width *= imageConfig.maxHeight / height);
      height = imageConfig.maxHeight;
    }
  }

  // resize the canvas and draw the image data into it
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL(imageConfig.type, imageConfig.quality); // get the data from canvas as 70% JPG (can be also PNG, etc.)
}

export {processfile};
