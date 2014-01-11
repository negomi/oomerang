// If the browser doesn't support geolocation, render the San Francisco map
function handleNoGeolocation(errorFlag) {
  var content;

  if (errorFlag) {
    content = 'Error: The geolocation service failed.';
  } else {
    content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(37.7749300, -122.4194200),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

// Add autocomplete to Places bar
function autoComp() {
  // FIXME Reset search field doesn't work
  // $('#searchTextField').val('');

  if (generalMarker !== '') {
    generalMarker.setMap(null);
  }

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

  generalInfoWindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 500
  });

  google.maps.event.addListener(generalMarker, 'click', function() {
    if (generalInfoWindow.getMap() == null) {
      generalInfoWindow.open(map, this);
    } else {
      generalInfoWindow.close();
    }
  });
}
