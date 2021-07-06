//Selecting all the elements---
const wrapper = document.querySelector(".wrapper");
const musicImage = document.querySelector(".song-image");
const musicName = document.querySelector(".song-name");
const musicArtist = document.querySelector(".artist");
const mainAudio = document.querySelector("#main-audio");
const playPause = document.querySelector(".play-pause-button");
const playPauseIcon = document.querySelector(".play-pause-icon");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

//State object will store the state of the application
const state = {
  musicIndex: 6,
  songState: "pause",
};

//LoadMusic function
const loadMusic = function (indexNumber) {
  musicImage.src = `images/${allMusic[indexNumber - 1].img}.jpg`;
  musicName.textContent = allMusic[indexNumber - 1].name;
  musicArtist.textContent = allMusic[indexNumber - 1].artist;
  mainAudio.src = `songs/${allMusic[indexNumber - 1].src}.mp3`;
};

//Loading the app
window.addEventListener("load", () => {
  loadMusic(state.musicIndex);
});

//Function for pausing and playing the music....!
const playAndPause = function () {
  console.log("Hello");
  if (state.songState === "pause") {
    playPauseIcon.textContent = "pause";
    state.songState = "playing";
    mainAudio.play();
  } else if (state.songState === "playing") {
    playPauseIcon.textContent = "play_arrow";
    state.songState = "pause";
    mainAudio.pause();
  }
};

//Adding event to play-pause button
playPause.addEventListener("click", playAndPause);

//Function for playing next music
const nextMusic = function () {
  state.musicIndex === 6
    ? (state.musicIndex = 1)
    : (state.musicIndex = state.musicIndex + 1);
  state.songState = "pause";
  loadMusic(state.musicIndex);
  playAndPause();
};

//Function for playing previous music
const prevMusic = function () {
  state.musicIndex === 1
    ? (state.musicIndex = 6)
    : (state.musicIndex = state.musicIndex - 1);
  state.songState = "pause";
  loadMusic(state.musicIndex);
  playAndPause();
};

//  Adding Event to play next and prev button
nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);
