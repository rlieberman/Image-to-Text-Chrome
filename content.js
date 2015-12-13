// This is the content script for the extension

// p5 can not be executed the normal "global" way
// Instead a sketch instance has to be manually created
// This is done with the closure below
var sketch = function(p5) {

  // The setup function
  p5.setup = function() {

    p5.noCanvas();
    // Look for all elements that are an "avatar" or "gravatar"
    var avatars = document.getElementsByTagName('img');
    console.log(avatars);

    // Call swapImg() for all of these DOM elements
    for (var i = 0; i < avatars.length; i++) {
      swapImg(avatars[i]);
    }


    // Change the image to a file that is part of this extension
    // The file must be made available in manifest.json
    //   "web_accessible_resources": [
    //      "images/rainbow.png"
    // ]
    function swapImg(img) {
      console.log(img);

      //NOT WORKING FOR SOME REASON -- not loading the p5 dom library
      var div = p5.createDiv(''); 
      console.log(div);
      div.p5.style('background-color', 'blue');
      // div.p5.size(img.width, img.height);
      // div.p5.style('background-color', '#e6e6e6');
      // var newimg = chrome.extension.getURL("images/rainbow.png");
      // img.src = newimg;
    }



  }

}

// The above function closure is passed into a p5 object constructor
// this starts the sketch.
var myp5 = new p5(sketch);




