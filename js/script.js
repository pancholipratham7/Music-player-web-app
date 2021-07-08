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
const repeatBtn = document.querySelector(".repeat-playlist");
const playListBtn = document.querySelector(".playlist-button");
const musicList = document.querySelector(".music-list");
const closePlaylist = document.querySelector(".playlist-close");
const playList = document.querySelector(".playlist");

//State object will store the state of the application
const state = {
  musicIndex: 4,
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
    songPlaying();
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
  songNotPlaying();
  state.musicIndex === allMusic.length
    ? (state.musicIndex = 1)
    : (state.musicIndex = state.musicIndex + 1);
  state.songState = "pause";
  console.log(state.musicIndex);
  loadMusic(state.musicIndex);
  playAndPause();
  songPlaying();
};

//Function for playing previous music
const prevMusic = function () {
  songNotPlaying();
  state.musicIndex === 1
    ? (state.musicIndex = allMusic.length)
    : (state.musicIndex = state.musicIndex - 1);
  state.songState = "pause";
  loadMusic(state.musicIndex);
  playAndPause();
  songPlaying();
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

//Adding Event Listener to the repeat button
repeatBtn.addEventListener("click", function () {
  if (repeatBtn.textContent === "repeat") {
    repeatBtn.textContent = "repeat_one";
    repeatBtn.setAttribute("title", "Song looped");
  } else if (repeatBtn.textContent === "repeat_one") {
    repeatBtn.textContent = "shuffle";
    repeatBtn.setAttribute("title", "Playback shuffled");
  } else if (repeatBtn.textContent === "shuffle") {
    repeatBtn.textContent = "repeat";
    repeatBtn.setAttribute("title", "Playlist looped");
  }
});

//What happens when the song ends
mainAudio.addEventListener("ended", function () {
  songNotPlaying();
  if (repeatBtn.title === "Playlist looped") {
    nextMusic();
  } else if (repeatBtn.title === "Song looped") {
    mainAudio.currentTime = 0;
    mainAudio.play();
    songPlaying();
  } else if (repeatBtn.title === "Playback shuffled") {
    let randIndex;
    do {
      randIndex = Math.floor(Math.random() * allMusic.length) + 1;
    } while (randIndex === state.musicIndex);
    state.musicIndex = randIndex;
    loadMusic(state.musicIndex);
    mainAudio.play();
    songPlaying();
  }
});

//Adding event to the playlist button
playListBtn.addEventListener("click", function () {
  musicList.classList.add("show");
});

//Close playlist
closePlaylist.addEventListener("click", function () {
  musicList.classList.remove("show");
});

//Creating Li tags according to the array length...!
const markup = allMusic.reduce(function (acc, curr, i) {
  const html = `<li class="playlist-details" data-song="${i + 1}">
  <div class="playlist-song-detail">
    <p class="playlist-song-name">${curr.name}</p>
    <p class="playlist-song-artist">${curr.artist}</p>
  </div>
  <span class="playlist-song-length">${curr.totalDuration}</span>
</li>
`;
  return acc + html;
}, "");
playList.insertAdjacentHTML("afterbegin", markup);

//Adding Event to the ul element..!
playList.addEventListener("click", function (e) {
  songNotPlaying();
  const songNumber = Number(e.target.closest(".playlist-details").dataset.song);
  state.musicIndex = songNumber;
  loadMusic(state.musicIndex);
  state.songState = "pause";
  playAndPause();
});

function songNotPlaying() {
  const li = playList.querySelectorAll("li")[state.musicIndex - 1];
  li.classList.remove("song-playing");
  li.querySelector(".playlist-song-length").textContent =
    allMusic[state.musicIndex - 1].totalDuration;
}

function songPlaying() {
  const li = playList.querySelectorAll("li")[state.musicIndex - 1];
  li.classList.add("song-playing");
  li.querySelector(".playlist-song-length").textContent = "Playing";
}
