// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

var welcome = true;
var map;
var markers = [];
var markerflag = true;
var input;
var autocomplete;
var generalMarker = '';
var generalInfowindow;
var generalLat;
var generalLng;
var generalContent;
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


///////// Displays the markers on the map
function loadMarkers() {
  $.ajax( "/items", {
    type: "get",
    success: function(data){
      //Erase markers from the map to display new ones
      for(var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers=[];
      //Get map bounds to define which markers get displayed
      var bounds = map.getBounds();

      _.each(data,function(item){
        var Marker;
        var contentString;
        if(item["lat"]>=0){
          var latTopBound = bounds["fa"]["b"];
          var latBotBound = bounds["fa"]["d"];
        } else {
          var latTopBound = bounds["fa"]["d"];
          var latBotBound = bounds["fa"]["b"];
        }

        if(item["lng"]>=0){
          var lngLeftBound = bounds["ga"]["b"];
          var lngRightBound = bounds["ga"]["d"];
        } else {
          var lngLeftBound = bounds["ga"]["d"];
          var lngRightBound = bounds["ga"]["b"];
        }

        //Check if markers fall inside the window bounds
        if((item["lat"]<latTopBound && item["lat"]>latBotBound) && (item["lng"]<lngLeftBound && item["lng"]>lngRightBound)){
          if(item["status"] == "lost"){
            image = "/assets/MarkerPurple.png";
            contentString = JST['templates/existingLostItem']({value: item});
          } else{
            var image = "/assets/MarkerWhite.png";
            contentString = JST['templates/existingFoundItem']({value: item});
          }
          var Latlng = new google.maps.LatLng(item["lat"],item["lng"]);

          // Markers will only be animated when the map loads the first time
          if(markerflag){
            Marker = new google.maps.Marker({
              position: Latlng,
              animation: google.maps.Animation.DROP,
              icon: image
            });
          } else{
            Marker = new google.maps.Marker({
              position: Latlng,
              icon: image
            });
          }


          google.maps.event.addListener(Marker, 'click', function() {
            $('#dynamicDiv').empty();
            $('#dynamicDiv').append(contentString);
            $('#dynamicDivWrap').slideDown(100);
            generalContent = item;
          });
          markers.push(Marker);
        }
      });
      markerflag=false;

      //Set style for the marker clusters
      var clusterStyles = [
        {
          url: '/assets/ZoomMarker.png',
          height: 43,
          width: 27,
          textSize: 1
        },
       {
          url: '/assets/ZoomMarker.png',
          height: 43,
          width: 27,
          textSize: 1
        },
       {
          url: '/assets/ZoomMarker.png',
          height: 43,
          width: 27,
          textSize: 1
        }
      ];
      var mcOptions = {gridSize: 50, styles: clusterStyles, maxZoom: 16};
      var markerCluster = new MarkerClusterer(map, markers, mcOptions);
    }
  });
}


///////// Add a new lost or found item marker
function addNewItem(event){
  $('#dynamicDivWrap').slideUp(100);
  $('#dynamicDiv').empty();

  if(generalMarker!="")
    generalMarker.setMap(null);
  var image = "/assets/MarkerGrey.png";
  generalMarker = new google.maps.Marker({
    position: event.latLng,
    map: map,
    draggable: true,
    icon: image
  });

  generalLat = event.latLng.lat();
  generalLng = event.latLng.lng();

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

///////// Fill in information for lost item
function enterLostItem(event){
  generalInfowindow.close();
  if(isLoggedIn())
    var lostForm = JST['templates/newLostItem']();
  else
    var lostForm = JST['templates/pleaseLogIn']();
  $('#dynamicDiv').empty();
  $("#dynamicDiv").append(lostForm);
  $('#dynamicDivWrap').slideDown(100);
}

///////// Fill in information for lost item
function enterFoundItem(event){
  generalInfowindow.close();
  if(isLoggedIn())
    var foundForm = JST['templates/newFoundItem']();
  else
    var foundForm = JST['templates/pleaseLogIn']();
  $('#dynamicDiv').empty();
  $("#dynamicDiv").append(foundForm);
  $('#dynamicDivWrap').slideDown(100);
}

///////// Close dynamic window when unused
function closeDynamicDiv() {
  $('#dynamicDivWrap').slideUp(100);
}

///////// Create new Lost Item in database
function newLostItem() {
  title = document.getElementById('lostTitleField').value;
  c1 = document.getElementById('lostCat1Field');
  cat1 = c1.options[c1.selectedIndex].text;
  c2 = document.getElementById('lostCat2Field');
  cat2 = c2.options[c2.selectedIndex].text;
  desc = document.getElementById('lostItemDescField').value;
  date = document.getElementById('lostDateField').value;
  time = document.getElementById('lostTimeField').value;
  place = document.getElementById('lostPlaceField').value;

  if(title==""||cat2=="-----"||desc==""||date==""||time==""||place=="")
    $('#missingLostMessage').append("Please complete all the fields before proceeding.");
  else{
    dataToStore = {title:title,cat1:cat1,cat2:cat2,
      desc:desc,date:date,time:time,place:place,
      latitude:generalLat,longitude:generalLng,
      status:'lost'};

    $.ajax( "/items/lost", {
      type: "post",
      data: dataToStore,
      success: function(data){
        console.log(data);
      }
    });
    closeDynamicDiv();
    generalMarker.setMap(null);
    loadMarkers();
  }
}

///////// Create new Found Item in database
function newFoundItem() {
  title = document.getElementById('foundTitleField').value;
  c1 = document.getElementById('foundCat1Field');
  cat1 = c1.options[c1.selectedIndex].text;
  c2 = document.getElementById('foundCat2Field');
  cat2 = c2.options[c2.selectedIndex].text;
  desc = document.getElementById('foundItemDescField').value;
  date = document.getElementById('foundDateField').value;
  time = document.getElementById('foundTimeField').value;
  place = document.getElementById('foundPlaceField').value;
  question = document.getElementById('foundQuestionField').value;

  if(title==""||cat2=="-----"||desc==""||date==""||time==""||place=="")
    $('#missingFoundMessage').append("Please complete all the fields before proceeding.");
  else{
    dataToStore = {title:title,cat1:cat1,cat2:cat2,
      desc:desc,date:date,time:time,place:place,
      question:question,latitude:generalLat,longitude:generalLng,
      status:'found'};

    $.ajax( "/items/found", {
      type: "post",
      data: dataToStore,
      success: function(data){
      }
    });
    closeDynamicDiv();
    generalMarker.setMap(null);
    loadMarkers();
  }
}
