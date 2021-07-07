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
const songTotalDuration = document.querySelector(".end-time");
const songCurrentDuration = document.querySelector(".start-time");
const progressBar = document.querySelector(".progress-bar");
const progressArea = document.querySelector(".progress-area");

//State object will store the state of the application
const state = {
  musicIndex: 5,
  songState: "pause",
};

//LoadMusic function
const loadMusic = function (indexNumber) {
  musicImage.src = `images/${allMusic[indexNumber - 1].img}.jpg`;
  musicName.textContent = allMusic[indexNumber - 1].name;
  musicArtist.textContent = allMusic[indexNumber - 1].artist;
  mainAudio.src = `songs/${allMusic[indexNumber - 1].src}.mp3`;
  songTotalDuration.textContent = allMusic[indexNumber - 1].totalDuration;
};

//Loading the app
window.addEventListener("load", () => {
  loadMusic(state.musicIndex);
});

//Function for pausing and playing the music....!
const playAndPause = function () {
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
  state.musicIndex === allMusic.length
    ? (state.musicIndex = 1)
    : (state.musicIndex = state.musicIndex + 1);
  state.songState = "pause";
  loadMusic(state.musicIndex);
  playAndPause();
};

//Function for playing previous music
const prevMusic = function () {
  state.musicIndex === 1
    ? (state.musicIndex = allMusic.length)
    : (state.musicIndex = state.musicIndex - 1);
  state.songState = "pause";
  loadMusic(state.musicIndex);
  playAndPause();
};

//  Adding Event to play next and prev button
nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);

//updating currenttime of the song
mainAudio.addEventListener("timeupdate", function (e) {
  let mins = Math.floor(mainAudio.currentTime / 60);
  let secs = Math.floor(mainAudio.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  progressBar.style.width = `${(currentTime / duration) * 100}%`;
  songCurrentDuration.textContent = `${mins}:${secs}`;
});

progressArea.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("progress-area") ||
    e.target.classList.contains("progress-bar")
  ) {
    const positionInfo = progressArea.getBoundingClientRect();
    const width = Math.floor(positionInfo.width);
    const percentSongPlayed = (e.offsetX / width) * 100;
    progressBar.style.width = `${(e.offsetX / width) * 100}%`;
    const calCurrentTime = (mainAudio.duration * percentSongPlayed) / 100;
    mainAudio.currentTime = calCurrentTime;
    state.songState = "pause";
    playAndPause();
  }
});
