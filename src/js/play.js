var game = document.getElementById("game");
var menu = document.getElementById("menu");
var play = document.getElementById("play");
var playBtn = document.getElementById("play");
var geoGuessr = document.getElementById("geoGuessr");
audioBtn = document.getElementById("audio-button");
audioCollect = document.getElementById("audio-collect");
audios = document.querySelectorAll("audio");
function playGame() {
  var googleAPI;
  var getLoc;
  var mechanics;
  menu.style.display = "none";
  game.style.display = "block";
  googleAPI = document.createElement("script");
  googleAPI.src = "./src/js/mapsJavaScriptAPI.js";
  googleAPI.async = true;
  googleAPI.defer = true;
  document.documentElement.lastChild.appendChild(googleAPI);

  getLoc = document.createElement("script");
  getLoc.src = "./src/js/getLoc.js";
  document.documentElement.lastChild.appendChild(getLoc);

  mechanics = document.createElement("script");
  mechanics.src = "./src/js/hide.js";

  document.documentElement.firstChild.appendChild(mechanics);
}

playBtn.addEventListener(
  "mouseover",
  function () {
    audioBtn.play();
  },
  false
);

playBtn.addEventListener(
  "mouseleave",
  function () {
    audioBtn.pause();
    audioBtn.currentTime = 0;
  },
  false
);

playBtn.addEventListener(
  "click",
  function () {
    audioCollect.play();
  },
  false
);

geoGuessr.addEventListener(
  "mouseover",
  function () {
    audioBtn.play();
  },
  false
);

geoGuessr.addEventListener(
  "mouseleave",
  function () {
    audioBtn.pause();
    audioBtn.currentTime = 0;
  },
  false
);
