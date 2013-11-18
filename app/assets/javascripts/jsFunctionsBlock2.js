///////// Add autocomplete to Places Bar
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
    // Inform the user that the place was not found and return.
    input.className = 'notfound';
    return;
  }

  // If the place has a geometry, then present it on a map.
  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(17);
  }
  generalMarker.setPosition(place.geometry.location);
  generalMarker.setVisible(true);
  $('#searchTextField').val("");

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
}




