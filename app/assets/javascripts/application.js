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


function initialize() {

  // $('#wrap').hide();
  // $('#visible-sm visible-xs').hide();
  // $('#footer').hide();

  //////// Generating map
  var mapOptions = {
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_CENTER}
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
  google.maps.event.addListenerOnce(autocomplete, 'place_changed', autoComp);

}


google.maps.event.addDomListener(window, 'load', initialize);



