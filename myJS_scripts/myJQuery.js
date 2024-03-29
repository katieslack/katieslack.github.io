//  This code is used to create a slide effect using a click event via JQuery
//  The slide toggle will help to store my portfolio on the Art page of my personal website
//  Code written with help from jQuery and Dr. Liping Yang GEOG 485L Lecture05 Demo Code
//  Links
//  jQuery effects - https://api.jquery.com/category/effects/
//  jQuery events - https://api.jquery.com/category/events/
//  jQuery document ready - https://learn.jquery.com/using-jquery-core/document-ready/

// document ready function is let the whole page be read in before it executes code 
// this function includes the js windows onload functions
// $ means we are going to use jQuery
$(document).ready(function (){

  // we are going to use the slide toggle effect to organize the art html webpage
  //  In this code we call in jQuery and assign the click event to the div_flip #id
  // Inside the click function is the slideToggle function that is assigned to the div_panel #id
  // This will create a slide effect, toggling panels to expand and collapse, when the click event fires 
    $("#div_flip").click(function () {
        $("#div_panel").slideToggle();
      });

      //  here we are going to do perform the same combination of functions, but with an updated #id
      $("#div_flip_2").click(function () {
        $("#div_panel_2").slideToggle();
      })

      $("#div_flip_3").click(function () {
        $("#div_panel_3").slideToggle();
      })

      $("#div_flip_4").click(function () {
        $("#div_panel_4").slideToggle();
      })

      $("#div_flip_5").click(function () {
        $("#div_panel_5").slideToggle();
      })

      $("#div_flip_6").click(function () {
        $("#div_panel_6").slideToggle();
      })
});
