// music-player.js
const audio = new Audio();
let isPlaying = false;

// Add your playlist here
const playlist = [
  {
    title: "On & On (feat. Daniel Levi)",
    artist: "Cartoon, Jéja",
    url: "music/Cartoon, Jéja - On & On (feat. Daniel Levi)  Electronic Pop  NCS - Copyright Free Music.mp3", // Update this path
  },
  {
    title: "Blank",
    artist: "Disfigure",
    url: "music/Disfigure - Blank  Melodic Dubstep  NCS - Copyright Free Music.mp3", // Update this path
  },
  {
    title: "Why We Lose (feat. Coleman Trapp)",
    artist: "Cartoon, Jéja",
    url: "music/Cartoon, Jéja - Why We Lose (feat. Coleman Trapp)  DnB  NCS - Copyright Free Music.mp3", // Update this path
  },
  {
    title: "DEAF KEV",
    artist: "Invincible",
    url: "music/DEAF KEV - Invincible  Glitch Hop  NCS - Copyright Free Music.mp3", // Update this path
  },
];

let currentSongIndex = 0;

function loadSong(index) {
  const song = playlist[index];
  audio.src = song.url;
  document.getElementById("song-title").textContent = song.title;
  document.getElementById("artist-name").textContent = song.artist;
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    document.querySelector(".play-btn").textContent = "▶";
  } else {
    audio.play();
    document.querySelector(".play-btn").textContent = "⏸";
  }
  isPlaying = !isPlaying;
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
}

function previousSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
}

function seek(event) {
  const progressBar = document.querySelector(".progress-bar");
  const percent = event.offsetX / progressBar.offsetWidth;
  audio.currentTime = percent * audio.duration;
}

function adjustVolume(value) {
  audio.volume = value / 100;
}

// Update progress bar and time
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  document.getElementById("progress").style.width = `${progress}%`;

  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60);
  document.getElementById(
    "current-time"
  ).textContent = `${currentMinutes}:${currentSeconds
    .toString()
    .padStart(2, "0")}`;
});

audio.addEventListener("loadedmetadata", () => {
  const durationMinutes = Math.floor(audio.duration / 60);
  const durationSeconds = Math.floor(audio.duration % 60);
  document.getElementById(
    "duration"
  ).textContent = `${durationMinutes}:${durationSeconds
    .toString()
    .padStart(2, "0")}`;
});

// Initialize the player when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadSong(currentSongIndex);
});
