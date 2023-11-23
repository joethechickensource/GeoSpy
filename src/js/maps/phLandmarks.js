let panorama;
var map;
var overlay = document.getElementById("overlay");
var ui = document.getElementById("ui");
var guess = document.getElementById("guess");
var guessCont = document.getElementById("button-wrapper");
var guessbtn = document.getElementById("guess-btn");
var completeDiv = document.getElementById("completeLevel");
var next = document.getElementById("next");
var tools = document.getElementById("tools");
var playerScore = 0;
var distanceScore = 5000;
var currentCordsLat, currentCordsLng;
var currentLoc, currentCoords;
var round = 1;
// AUDIOS
var tally = document.getElementById("audio-tally");
//
document.getElementById("mapname").innerHTML = "Philippines";
function phMap(n) {
  var location = [
    [{ lat: 9.829708, lng: 124.1396756 }, { city: "Chocolate Hills" }],
    [{ lat: 16.9239126, lng: 121.055836 }, { city: "Rice Terraces" }],
    [{ lat: 14.0178494, lng: 120.9970307 }, { city: "Taal Lake" }],
    [{ lat: 11.17217, lng: 125.0121195 }, { city: "Leyte Landing Monument" }],
    [{ lat: 14.4451027, lng: 120.9069061 }, { city: "Aguinaldo Shrine" }],
    [{ lat: 14.3895652, lng: 120.5991966 }, { city: "Corregidor Island" }],
    [{ lat: 14.5941553, lng: 120.9705171 }, { city: "Fort Santiago" }],
    [{ lat: 14.5816644, lng: 120.9768291 }, { city: "Luneta Park" }],
    [{ lat: 14.5943746, lng: 120.9944327 }, { city: "Malacañan Palace" }],
  ];

  currentLoc = location[n];
  currentCoords = currentLoc[0];
  return currentCoords;
}
function levelComplete() {
  guess.style.height = "100vh";
  guess.style.width = "100vw";
  guess.style.margin = "0";
  tools.style.display = "none";
  guessbtn.style.display = "none";
  completeDiv.style.display = "flex";
}
function checkDistance() {
  var lat1 = guessMarker.position.lat();
  var lng1 = guessMarker.position.lng();
  var lat2 = currentCordsLat;
  var lng2 = currentCordsLng;
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

function showHide() {
  var x = document.getElementById("map");
  var tools = document.getElementById("tools");
  var show = document.getElementById("show");
  if (x.style.display === "none") {
    x.style.display = "block";
    tools.style.display = "flex";
    show.style.display = "none";
  } else {
    x.style.display = "none";
    tools.style.display = "none";
    show.style.display = "block";
  }
}
function defaultSetting() {
  var tools = document.getElementById("tools");
  var show = document.getElementById("show");
  show.style.display = "none";
  ui.style.display = "none";
  tools.style.display = "flex";
  guess.style.height = "40vh";
  guess.style.width = "35vw";
  guessbtn.style.display = "block";
  guessCont.style.display = "none";
  guess.style.margin = "3.5%";
  overlay.style.display = "flex";
  completeDiv.style.display = "none";
}
function playagain() {
  distanceScore = 5000;
  next.value = "Next";
  next.onclick = function () {
    showHide();
  };
  played = false;
  defaultSetting();
  initMap();
}
played = false;
var marked = false;
function initMap(data, status) {
  if (round <= 5) {
    document.getElementById("round").innerHTML = "" + round + "/5";
    var n = Math.floor(Math.random() * 9);
    var ph = phMap(n);
    currentCordsLat = ph.lat;
    currentCordsLng = ph.lng;
    overlay.style.display = "none";
    ui.style.display = "flex";
    console.clear();
    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("street-view"),
      {
        position: ph,
        pov: {
          heading: 0,
          pitch: 0,
          zoom: 0,
        },
        showRoadLabels: false,
      }
    );

    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      maxZoom: 20,
      minZoom: 5,
      center: { lat: 13.467854269092662, lng: 122.42733472794815 },
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false,
    });
    map.setOptions({ draggableCursor: "crosshair" });
    const myinfowindow = new google.maps.InfoWindow({});
    var marker = new google.maps.Marker({
      map,
    });
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
      marked = true;
    });
    myinfowindow.open(map);
    // YOUR GUESS MARKER
    var set = true;
    map.addListener("click", (mapsMouseEvent) => {
      guessCont.style.display = "flex";
      if (played === true) {
        return;
      }
      if (set == true) {
        guessLatLng = new google.maps.LatLng(
          mapsMouseEvent.latLng.lat(),
          mapsMouseEvent.latLng.lng()
        );
        guessMarker = new google.maps.Marker({
          position: mapsMouseEvent.latLng,
        });
        guessMarker.setMap(map);
        set = false;
        marked = true;
      } else {
        guessMarker.setMap(null);
        set = true;
        marked = false;
      }
    });

    // TRUE LOCATION
    guessbtn.addEventListener("click", () => {
      if (marked == true) {
        targetLatLng = ph;
        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 10,
          maxZoom: 10,
          minZoom: 2,
          center: targetLatLng,
          streetViewControl: false,
          zoomControl: false,
          mapTypeControl: false,
        });
        targetMarker = new google.maps.Marker({
          position: targetLatLng,
          title: "True Location",
          draggable: false,
          icon: {
            url: "/assets/imgs/targetMarker.png?raw=true",
          },
          anchor: new google.maps.Point(15, 15),
        });
        marker = new google.maps.Marker({
          position: guessLatLng,
          map,
        });
        targetMarker.setMap(map);
        distance = checkDistance();
        if (Math.floor(distance) == 0) {
          var yards = Math.round(distance * 1093);
          document.getElementById("score").innerHTML = yards + " yards";
        } else {
          document.getElementById("score").innerHTML =
            Math.floor(distance) + " km";
        }
        var points = Math.round(
          5000 * 0.998036 * Math.exp((-10 * distance) / 1850)
        );
        if (points < 0) {
          points = 0;
        } else if (Math.floor(distance) <= 0) {
          points = 5000;
        }

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
        var counter = points - 50;
        if (points > 100) {
          animateValue("playerScore", counter, points, 2800);
        } else {
          counter = points;
          animateValue("playerScore", counter, points, 2800);
        }
        tally.play();
        played = true;
        next.value = "Next";
        next.onclick = function () {
          round++;
          playerScore += points;
          playagain();
        };
      }
    });
  } else {
    window.location.reload();
  }
}
function animateValue(id, start, end, duration) {
  if (start === end) return;
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var obj = document.getElementById(id);
  var timer = setInterval(function () {
    current += increment;
    obj.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}
