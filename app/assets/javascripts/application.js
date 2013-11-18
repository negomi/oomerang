// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .


var map;
var markers = [];
var markerflag = true;
var input;
var autocomplete;
var generalMarker = '';
var generalInfowindow;
var generalLat;
var generalLng;
// var prevZIndex = -1;
// var zIndexCount;

$(function() {

  function initialize() {
    //////// Generating map
    $('#dynamicDivWrap').hide();

    var mapOptions = {
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      panControl: false,
      zoomControl: true,
      zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_BOTTOM}
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

    //////// Tracking current position
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        map.setCenter(pos);
      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }

    google.maps.event.addListener(map,'tilesloaded',loadMarkers);

    google.maps.event.addListener(map, 'click', addNewItem);

    input = (document.getElementById('searchTextField'));
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    google.maps.event.addListener(autocomplete, 'place_changed', autoComp);

    //Remove points of interest from the map
    var noPoi = [{featureType: "poi",
        stylers: [{ visibility: "off" }]
        }];
    map.setOptions({styles: noPoi});
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  $("body").on("change","#lostCat1Field",function() {
    if($(this).val()== 1){
     $("#lostCat2Field").html("<option value='7'>Gloves</option>" +
                   "<option value='8'>Hat</option>" +
                   "<option value='9'>Jacket</option>" +
                   "<option value='10'>Scarf</option>" +
                   "<option value='11'>Sweater</option>" +
                   "<option value='12'>Other</option>");
    }
    else if($(this).val()== 2){
     $("#lostCat2Field").html("<option value='13'>Camera</option>" +
                   "<option value='14'>Kindle</option>" +
                   "<option value='15'>Laptop</option>" +
                   "<option value='16'>Mp3 player</option>" +
                   "<option value='17'>Phone</option>" +
                   "<option value='18'>Tablet</option>" +
                   "<option value='19'>Other</option>");
    }
    else if($(this).val()== 3){
     $("#lostCat2Field").html("<option value='20'>Dog</option>" +
                   "<option value='21'>Cat</option>" +
                   "<option value='22'>Other</option>");
    }

    else if($(this).val()== 4){
     $("#lostCat2Field").html("");
    }

    else if($(this).val()== 5){
     $("#lostCat2Field").html("<option value='23'>Bag</option>" +
                   "<option value='24'>Book</option>" +
                   "<option value='25'>ID Card</option>" +
                   "<option value='26'>Jewelry</option>" +
                   "<option value='27'>Keys</option>" +
                   "<option value='28'>Purse</option>" +
                   "<option value='29'>Wallet</option>" +
                   "<option value='30'>Watch</option>" +
                   "<option value='31'>Other</option>");
    }

    else if($(this).val()== 6){
     $("#lostCat2Field").html("");
    }
  });

  $("body").on("change","#foundCat1Field",function() {
    if($(this).val()== 1){
     $("#foundCat2Field").html("<option value='7'>Gloves</option>" +
                   "<option value='8'>Hat</option>" +
                   "<option value='9'>Jacket</option>" +
                   "<option value='10'>Scarf</option>" +
                   "<option value='11'>Sweater</option>" +
                   "<option value='12'>Other</option>");
    }
    else if($(this).val()== 2){
     $("#foundCat2Field").html("<option value='13'>Camera</option>" +
                   "<option value='14'>Kindle</option>" +
                   "<option value='15'>Laptop</option>" +
                   "<option value='16'>Mp3 player</option>" +
                   "<option value='17'>Phone</option>" +
                   "<option value='18'>Tablet</option>" +
                   "<option value='19'>Other</option>");
    }
    else if($(this).val()== 3){
     $("#foundCat2Field").html("<option value='20'>Dog</option>" +
                   "<option value='21'>Cat</option>" +
                   "<option value='22'>Other</option>");
    }

    else if($(this).val()== 4){
     $("#foundCat2Field").html("");
    }

    else if($(this).val()== 5){
     $("#foundCat2Field").html("<option value='23'>Bag</option>" +
                   "<option value='24'>Book</option>" +
                   "<option value='25'>ID Card</option>" +
                   "<option value='26'>Jewelry</option>" +
                   "<option value='27'>Keys</option>" +
                   "<option value='28'>Purse</option>" +
                   "<option value='29'>Wallet</option>" +
                   "<option value='30'>Watch</option>" +
                   "<option value='31'>Other</option>");
    }

    else if($(this).val()== 6){
     $("#foundCat2Field").html("");
    }

  });

});
