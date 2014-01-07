// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

///////// Check if user is logged in
function isLoggedIn(){
  var response;
  $.ajax( "/users/logged", {
    type: "get",
    async: false,
    success: function(data){
      response = data[0];
    }
  });
  return response;
}

///////// Contact Founder
function contactFounder(){
  if(isLoggedIn()==false){
    var foundForm = JST['templates/pleaseLogIn']();
    $('#dynamicDiv').empty();
    $("#dynamicDiv").append(foundForm);
  }
  else
    var foundForm = JST['templates/secretQuestion']({value: generalContent});
    $('#dynamicDiv').empty();
    $("#dynamicDiv").append(foundForm);

}

///////// Contact Seeker
function contactSeeker(){
  if(isLoggedIn()==false){
    var foundForm = JST['templates/pleaseLogIn']();
    $('#dynamicDiv').empty();
    $("#dynamicDiv").append(foundForm);
  }
  else
    emailSent();
}

function emailSent(){
  var foundForm = JST['templates/emailForm']();
  $('#dynamicDiv').empty();
  $("#dynamicDiv").append(foundForm);
}
