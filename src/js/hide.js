var guess = document.getElementById("guess");

guess.style.height = "40vh";
guess.style.width = "35vw";

function zoomIn() {
  guess.style.height = guess.offsetHeight + 100 + "px";
  guess.style.width = guess.offsetWidth + 215 + "px";
}

function zoomOut() {
  guess.style.height = guess.offsetHeight - 100 + "px";
  guess.style.width = guess.offsetWidth - 215 + "px";
}
