///////// Add autocomplete to Places Bar
function autoComp() {
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
      map: map
  });

  infowindow.close();
  marker.setVisible(true);
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
  marker.setIcon(/** @type {google.maps.Icon} */({
    url: "/assets/MarkerGrey.png",
    height: 43,
    width: 27,
    textSize: 1,
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
  }));
  marker.setPosition(place.geometry.location);
  marker.setVisible(true);

  var address = '';
  if (place.address_components) {
    address = [
      (place.address_components[0] && place.address_components[0].short_name || ''),
      (place.address_components[1] && place.address_components[1].short_name || ''),
      (place.address_components[2] && place.address_components[2].short_name || '')
    ].join(' ');
  }

  infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address +
   '<p>Lose something here?</p>' + '<p>Find something here?</p>');
  infowindow.open(map, marker);
}




