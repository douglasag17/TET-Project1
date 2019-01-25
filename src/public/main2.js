function initMap(){
    
    // In the following example, markers appear when the user clicks on the map.
    // Each marker is labeled with a single alphabetical character.

    function initialize() {
      var eafitLocation = { lat: 6.201700799999999, lng: -75.57816179999999 };
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: eafitLocation
      });

      // Add a marker at the center of the map.
      
      //addMarker( { lat: latitude, lng: longitude } , map);
      addMarker( { lat: 6.204900604782, lng: -75.56972893485715 }, map);

      //var numPoints = points
      //while (numPoints > 0) {
      //  markers = [
      //    {
      //      {lat:42.4668,lng:-70.9495}
      //    }
      //  ]
      //}
      //for (var i = 0; markers.lenth; i++) {
      //  addMarker(markers[i], map)
      //}
    }

    // Adds a marker to the map.
    function addMarker(location, map) {
      // Add the marker at the clicked location, and add the next-available label
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable:true
      });
    }
    google.maps.event.addDomListener(window, 'load', initialize);  
}

document.body.innerHTML = '<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLfvcsagRYKp9CgzE3Uq2FRJLk-YnTvZI&callback=initMap"> </script>'