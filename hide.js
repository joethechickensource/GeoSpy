var guess = document.getElementById("guess");
var hide = document.getElementById("hide");
var show = document.getElementById("show");

guess.style.height = "40vh";
guess.style.width = "40vw";

function zoomIn() {
  guess.style.height = guess.offsetHeight + 100 + "px";
  guess.style.width = guess.offsetWidth + 150 + "px";
  console.log(guess.style.height);
}

function zoomOut() {
  guess.style.height = guess.offsetHeight - 100 + "px";
  guess.style.width = guess.offsetWidth - 150 + "px";
}

function hideMap() {
  guess.style.display = "none";
  show.style.display = "block";
}

function showMap() {
  guess.style.display = "block";
  hide.style.display = "block";
}
