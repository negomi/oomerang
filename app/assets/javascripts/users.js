// Check if user is logged in
function isLoggedIn() {
  var response;
  $.ajax( "/users/logged", {
    type: "get",
    async: false,
    success: function(data) {
      response = data[0];
    }
  });
  return response;
}

// Contact founder
function contactFounder() {
  var foundForm;
  if (isLoggedIn() === false) {
    foundForm = JST['templates/pleaseLogIn']();
    $('#dynamicDiv').empty();
    $("#dynamicDiv").append(foundForm);
  } else {
    foundForm = JST['templates/secretQuestion']({value: generalContent});
    $('#dynamicDiv').empty();
    $("#dynamicDiv").append(foundForm);
  }
}

// Contact seeker
function contactSeeker() {
  if (isLoggedIn() === false) {
    var foundForm = JST['templates/pleaseLogIn']();
    $('#dynamicDiv').empty();
    $("#dynamicDiv").append(foundForm);
  } else {
    $.ajax({
      url: "/items/contact_seeker",
      type: "post",
      data: {item: generalContent}
      }).done(function(){
        // console.log(data);
        emailSeeker();
      });

  }
}

function emailSeeker() {
  var foundForm = JST['templates/emailForm']();
  $('#dynamicDiv').empty();
  $("#dynamicDiv").append(foundForm);
}

function emailFounder() {
  var answer = $("#contentAnswer").val();
  var foundForm = JST['templates/emailForm']();
  $('#dynamicDiv').empty();
  $("#dynamicDiv").append(foundForm);
  $("#contentAnswer").val("hola");
  $.ajax({
    url: "/items/contact_founder",
    type: "post",
    data: {item: generalContent,
          answer: answer}
    }).done(function(){
      // console.log(data);
    });
}








