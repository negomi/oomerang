// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

// If the browser doesn't support geolocation, it renders the San Francisco map
function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(37.7749300, -122.4194200),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

// Add autocomplete to Places Bar
function autoComp() {
  if(generalMarker!="")
    generalMarker.setMap(null);
  $('#dynamicDivWrap').hide();
  generalMarker = new google.maps.Marker({
    map: map,
    icon: "/assets/MarkerGrey.png",
    animation: google.maps.Animation.DROP,
    draggable: true,
  });
  generalMarker.setVisible(false);

  input.className = '';
  var place = autocomplete.getPlace();
  if (!place.geometry) {
    // Inform the user that the place was not found and return
    input.className = 'notfound';
    return;
  }

  // If the place has a geometry, then present it on a map
  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(17);
  }
  generalMarker.setPosition(place.geometry.location);
  generalMarker.setVisible(true);

  var contentString = JST['templates/selectItem']();

  generalInfowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 500
  });

  google.maps.event.addListener(generalMarker, 'click', function() {
    if (generalInfowindow.getMap() == null)
      generalInfowindow.open(map,this);
    else
      generalInfowindow.close();
  });

  // FIXME not clearing it
  $('#searchTextField').val("");
}
