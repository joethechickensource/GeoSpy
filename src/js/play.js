var game = document.getElementById("game");
var menu = document.getElementById("menu");
var play = document.getElementById("play");
var menu_cat = document.getElementById("game-mode");
var init_menu = document.getElementById("init-menu");
var playBtn = document.getElementById("play");
var geoGuessr = document.getElementById("geoGuessr");
var phBtn = document.getElementById("phBtn");
var euBtn = document.getElementById("euBtn");
var naBtn = document.getElementById("naBtn");
var worldBtn = document.getElementById("worldBtn");
audioBtn = document.getElementById("audio-button");
audioCollect = document.getElementById("audio-collect");
audios = document.querySelectorAll("audio");
function clickPlay() {
  menu_cat.style.display = "flex";

  menu_cat.style.transform = "translateY(0px)";
  init_menu.style.transition = "1s ease";
  init_menu.style.display = "none";
}
function world() {
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
  getLoc.src = "./src/js/maps/randomWorld.js";
  document.documentElement.lastChild.appendChild(getLoc);

  mechanics = document.createElement("script");
  mechanics.src = "./src/js/hide.js";

  document.documentElement.firstChild.appendChild(mechanics);
}
function ph() {
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
  getLoc.src = "./src/js/maps/phLandmarks.js";
  document.documentElement.lastChild.appendChild(getLoc);

  mechanics = document.createElement("script");
  mechanics.src = "./src/js/hide.js";

  document.documentElement.firstChild.appendChild(mechanics);
}
function eu() {
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
  getLoc.src = "./src/js/maps/europe.js";
  document.documentElement.lastChild.appendChild(getLoc);

  mechanics = document.createElement("script");
  mechanics.src = "./src/js/hide.js";

  document.documentElement.firstChild.appendChild(mechanics);
}
function na() {
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
  getLoc.src = "./src/js/maps/uscanada.js";
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
geoGuessr.addEventListener(
  "click",
  function () {
    audioCollect.play();
  },
  false
);

// MENU CATEGORY AUDIO

audioButtons(phBtn);
audioButtons(worldBtn);
audioButtons(euBtn);
audioButtons(naBtn);

function audioButtons(button) {
  button.addEventListener(
    "mouseover",
    function () {
      audioBtn.play();
    },
    false
  );
  
  button.addEventListener(
    "mouseleave",
    function () {
      audioBtn.pause();
      audioBtn.currentTime = 0;
    },
    false
  );
  button.addEventListener(
    "click",
    function () {
      audioCollect.play();
    },
    false
  );
}


