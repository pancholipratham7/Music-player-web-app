const closePlaylistBtn = document.querySelector(".playlist-close");
const playlistBtn = document.querySelector(".playlist-button");
closePlaylistBtn.addEventListener("click", function () {
  document.querySelector(".music-list").classList.add("hidden");
});
playlistBtn.addEventListener("click", function () {
  console.log("Playlist button clicked");
  document.querySelector(".music-list").classList.remove("hidden");
});
