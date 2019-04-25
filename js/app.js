'use strict';

//Constructor
function Image(pic){
  this.image_url = pic.image_url;
  this.title = pic.title;
  this.description = pic.description;
  this.keyword = pic.keyword;
  this.horns = pic.horns;

}

Image.allImages = [];

// FUNCTION DECLARATIONS

//Create image objects from JSON data
function createImageObject(){
  $.get('./data/page-1.json')
    .then(data => {
      data.forEach(picElement => Image.allImages.push(new Image(picElement)));
      displayImages();
      fillSelect();
      filterImages();
    });

  // console.log(Image.allImages);
}

//Display images to home page
function displayImages(){
  //get the image element
  let imageTag = $('h2');
  // //assign the first image object to the first image tag
  // imageTag.attr({'src': Image.allImages[0].image_url, 'alt': Image.allImages[0].title, 'class': Image.allImages[0].keyword});
  // // iterate through the images list  and create image tags
  $('img').remove();
  for(let i = 0; i < Image.allImages.length; i++){
    imageTag.after(`<img src=${Image.allImages[i].image_url} alt=${Image.allImages[i].title}, class: ${Image.allImages[i].keyword}} />`);

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



// FUNCTION CALLS
createImageObject();




