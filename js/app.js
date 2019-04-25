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

const imgRenderer = Handlebars.compile($('#image-template').html());

// FUNCTION DECLARATIONS

//Function for handlebar
function displayHandle(imageArray){
  
  let sectionTag = $('#img-container');
  $('img').remove();
  for (let i=0; i<imageArray.length; i++){
    sectionTag.append(imgRenderer(imageArray[i]));
  }
}

//Create image objects from JSON data
function createImageObject(file, imageArray){
  $.get(`./data/${file}`)
    .then(data => {
      data.forEach(picElement => {
        if (imageArray.length<20){
          imageArray.push(new Image(picElement));
        }
      });
      // displayImages(imageArray);
      displayHandle(imageArray);
      fillSelect(imageArray);
      filterImages(imageArray);
    

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
function fillSelect(imageArray){
  let options = ['default'];

  let selectTag = $('select');
  // let optionItems = getKeyWords();
  selectTag.empty();
 
  selectTag.append(`<option value="default">Filter by Keyword</option>`);
  for(let i = 1; i < imageArray.length; i++){
    if(!options.includes(imageArray[i].keyword)){
      //Add option tag
      selectTag.append(`<option value=${imageArray[i].keyword}>${imageArray[i].keyword}</option>`);

      //Add to list of options array
      options.push(imageArray[i].keyword);
    }
  }

}

//Function to filter images
function filterImages(imageArray){
  let sectionTag = $('#img-container');
  $('select').change(function(){
    // get value for selected keyword
    let selectedKey = $(this).children('option:selected').val();
    if(selectedKey !== 'default'){
      $('img').remove();
      // display all images based from the keyword
      for(let i = 0; i < imageArray.length; i++){
        if(imageArray[i].keyword === selectedKey){
          sectionTag.append(imgRenderer(imageArray[i]));
     
        }
      }
    } else{
      displayHandle(imageArray);
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


