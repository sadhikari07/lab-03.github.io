'use strict';

//Constructor
function Image(pic){
  this.image_url = pic.image_url;
  this.title = pic.title;
  this.description = pic.description;
  this.keyword = pic.keyword;
  this.horns = pic.horns;

}

Image.allImages1 = [];
Image.allImages2 = [];

// FUNCTION DECLARATIONS

//Create image objects from JSON data
function createImageObject(file, imageArray){
  $.get(`./data/${file}`)
    .then(data => {
      data.forEach(picElement => {
        if (imageArray.length<20){
          imageArray.push(new Image(picElement));
        }
      displayImages(imageArray);
      // fillSelect();
      // filterImages();
    });

  // console.log(Image.allImages);
});
}

//Display images to home page
function displayImages(imageArray){
  //get the image element
  let imageTag = $('h2');
  $('img').remove();
  for(let i = 0; i < imageArray.length; i++){
    imageTag.after(`<img src=${imageArray[i].image_url} alt=${imageArray[i].title}, class: ${imageArray[i].keyword}} />`);

  }

}

//Fill in select options
function fillSelect(){
  let options = [];
  let selectTag = $('select');
  // let optionItems = getKeyWords();
  for(let i = 0; i < Image.allImages.length; i++){
    if(!options.includes(Image.allImages[i].keyword)){
      //Add option tag
      selectTag.append(`<option value=${Image.allImages[i].keyword}>${Image.allImages[i].keyword}</option>`);

      //Add to list of options array
      options.push(Image.allImages[i].keyword);
    }
  }

}

//Function to filter images
function filterImages(){
  $('select').change(function(){
    // get value for selected keyword
    let selectedKey = $(this).children('option:selected').val();
    //remove all images
    if(selectedKey !== 'default'){
      $('img').remove();
      // display all images based from the keyword
      for(let i = 0; i < Image.allImages.length; i++){
        if(Image.allImages[i].keyword === selectedKey){
          $('h2').after(`<img src=${Image.allImages[i].image_url} alt=${Image.allImages[i].title}, class: ${Image.allImages[i].keyword}} />`);
     
        }
      }
    } else{
      displayImages();
    }
  });
}

//Function to add listener to our navigation link

function addListener(){
  //Grab the list element
  $('#page1').on('click', function(){
    createImageObject('page-1.json', Image.allImages1);
  });
  $('#page2').on('click', function(){
    createImageObject('page-2.json', Image.allImages2);
  });
  //Add listener on that element
  

}

// FUNCTION CALLS
createImageObject('page-1.json', Image.allImages1);
// createImageObject('page-2.json');
addListener();


