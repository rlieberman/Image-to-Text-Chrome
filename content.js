// This is the content script for the extension

var clientID = 'eWxNW-xStnWuGcwpRWd-hD17g1GEGCDonqxQ8iAk';
var clientSecret = 'ckGbfL_gcWWtdEV8x9B_g0Pp8ptcX5K6wshY_PUK';
var baseUrl = 'https://api-alpha.clarifai.com/v1/';

var accessToken; //for programmatically generating a new access token

var totalImages = 0;

//First, generate a new access token from Clarifai when you load the page
var data = {
    'grant_type': 'client_credentials',
    'client_id': clientID,
    'client_secret': clientSecret
  }


 $.ajax({
    'type': 'POST',
    'url': baseUrl + 'token',
    'data': data,
    success: function (response) { 
      console.log(response);
      accessToken = response;
      gotToken();
    },
    error: function (err) { 
      console.log(err);
    }
});

function gotToken() {
  console.log("I got the token!");

  // Look for all the image elements on the page
  var images = document.getElementsByTagName('img');
  totalImages = images.length;
  // console.log(images);

  // Call swapImg() for all of these DOM elements
  for (var i = 0; i < totalImages; i++) {
    swapImg(images[i]);
  }

}



function swapImg(img) {
  if ($(img).hasClass('replaced')) {
    return false; //makes this exist the function
  }

  //hide the image element
  img.style.display = 'none';
  $(img).addClass('replaced'); //once we replace the images, change the class to 'replaced'


  var parent = img.parentNode; //get the parent of the img on the page, in google images it is the a tag with image URL
  

  //create a new div to the grey container box
  var div = document.createElement("div");
  div.className = 'myDiv';


  //set the size of the div to image width and height
  div.style.width = parent.width;
  div.style.height = '100%';
  parent.appendChild(div); //append the div as a child to the image's parent


  //create a second div that will contain the text so we can style it separately
  var textDiv = document.createElement("div");
  textDiv.className = 'textDiv';
  textDiv.innerHTML = "This is a description of an image.";
  div.appendChild(textDiv);

  // console.log(parent);
  // console.log("this is the height of the parent: " + parent.style.height, "this is the width of the parent: " + parent.style.width);
  // console.log("this is the height of the div: " + div.style.height, "this is the width of the div: " + div.style.width);
   
}


//use an event listener for scrolling - makes more images load once the scroll is happen
$(window).on('scroll', function(e){ //e is the event object

  console.log("SCROLLED");
  var images = document.getElementsByTagName('img'); 

  // console.log(images);

  // Call swapImg() for all of these DOM elements
  for (var i = 0; i < images.length; i++) {
    swapImg(images[i]);
  }
});



//look into jquery -- makes manipulating DOM elements easier
//on scroll event listener




