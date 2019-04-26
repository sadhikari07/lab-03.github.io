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

let imgRenderer = Handlebars.compile($('#image-template').html());

// FUNCTION DECLARATIONS

//Function for handlebar
function displayHandle(imageArray){

  let sectionTag = $('#img-container');
  $('img').remove();
  $('h2').remove();
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
      addSortListener(imageArray);

    });
}


//Fill in select options
function fillSelect(imageArray){
  let options = ['default'];
  let selectTag = $('#keyword-select');
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
  $('#keyword-select').change(function(){
    // get value for selected keyword
    let selectedKey = $(this).children('option:selected').val();
    if(selectedKey !== 'default'){
      $('img').remove();
      $('h2').remove();
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

}


function addSortListener(imageArray){
  //Grab the list element
  $('#sort-select').change(function(){
    // get value for selected keyword
    let selectedKey = $(this).children('option:selected').val();
    if(selectedKey === 'title-sort'){
      $('img').remove();
      imageArray.sort((a,b) => compare(a.title, b.title));
      displayHandle(imageArray);
    }
    if (selectedKey === 'horns-sort'){
      imageArray.sort((a,b) => a.horns - b.horns);
      displayHandle(imageArray);
      // return imageArray;
    }
    displayHandle(imageArray);
  });

}

function compare(a,b){
  if(a < b){
    return -1;
  }

  if(a > b){
    return 1;
  }
  return 0;
}
// FUNCTION CALLS
createImageObject('page-1.json', Image.allImages1);
addListener();


