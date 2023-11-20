let panorama;
var map;
var guessbtn = document.getElementById("guess-btn");
guessbtn.style.display = "none";
function levelComplete() {
  var zoomIn = document.getElementById("in");
  var zoomOut = document.getElementById("out");
  var hide = document.getElementById("hide");
  var completeDiv = document.getElementById("completeLevel");
  guess.style.height = "100vh";
  guess.style.width = "100vw";
  guess.style.margin = "0";
  hide.style.display = "none";
  zoomIn.style.display = "none";
  zoomOut.style.display = "none";
}
function checkDistance() {
  var lat1 = guessMarker.position.lat();
  var lng1 = guessMarker.position.lng();
  var lat2 = 37.86926;
  var lng2 = -122.254811;
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLng = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c;
  return distance;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
function generateRandomPoint(callback) {
  var sv = new google.maps.StreetViewService();
  sv.getPanoramaByLocation(
    new google.maps.LatLng(Math.random() * 180 - 90, Math.random() * 360 - 180),
    500,
    callback
  );
}
function initMap(data, status) {
  if (status == google.maps.StreetViewStatus.OK) {
    console.log("EE " + data.location.latLng.toUrlValue(6));
    console.log(data);

    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("street-view"),
      {
        position: data.location.latLng,
        pov: {
          heading: 34,
          pitch: 10,
        },
        disableDefaultUI: true,
      }
    );
  } else generateRandomPoint(initMap);
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    maxZoom: 10,
    minZoom: 2,
    center: { lat: 0, lng: 0 },
    streetViewControl: false,
    zoomControl: false,
    mapTypeControl: false,
  });
  const myinfowindow = new google.maps.InfoWindow({});
  var marker = new google.maps.Marker({
    map,
  });
  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
    });
  });
  myinfowindow.open(map);
  // YOUR GUESS MARKER
  map.addListener("click", (mapsMouseEvent) => {
    guessbtn.style.display = "block";
    guessLatLng = new google.maps.LatLng(
      mapsMouseEvent.latLng.lat(),
      mapsMouseEvent.latLng.lng()
    );
    guessMarker = new google.maps.Marker({
      position: mapsMouseEvent.latLng,
    });

    guessMarker.setMap(map);
    // TRUE LOCATION
  });
  guessbtn.addEventListener("click", () => {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      maxZoom: 10,
      minZoom: 2,
      center: guessLatLng,
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false,
    });
    targetLatLng = new google.maps.LatLng(37.86926, -122.254811);
    targetMarker = new google.maps.Marker({
      position: targetLatLng,
      title: "True Location",
      draggable: false,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      },
      anchor: new google.maps.Point(15, 15),
    });
    marker = new google.maps.Marker({
      position: guessLatLng,

      map,
    });
    targetMarker.setMap(map);
    distance = checkDistance();
    lineCoordinates = [targetLatLng, guessLatLng];
    linePath = new google.maps.Polyline({
      path: lineCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    levelComplete();

    linePath.setMap(map);
  });
}
