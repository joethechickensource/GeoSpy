var game = document.getElementById("game");
var menu = document.getElementById("menu");
var play = document.getElementById("play");

function playGame() {
  var googleAPI;
  var getLoc;
  var mechanics;
  menu.style.display = "none";
  game.style.display = "block";
  googleAPI = document.createElement("script");
  googleAPI.src = "./assets/mapsJavaScriptAPI.js";
  googleAPI.async = true;
  googleAPI.defer = true;
  document.documentElement.lastChild.appendChild(googleAPI);

  getLoc = document.createElement("script");
  getLoc.src = "./assets/getLoc.js";
  document.documentElement.lastChild.appendChild(getLoc);

  mechanics = document.createElement("script");
  mechanics.src = "./assets/hide.js";

  document.documentElement.firstChild.appendChild(mechanics);
}
