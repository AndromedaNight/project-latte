const trackStatus = document.querySelector(".track-status");
const audioPlayer = document.querySelector(".audio-player");
const trackButtons = document.querySelectorAll(".track-button");

function resetTrackButtons() {
  trackButtons.forEach((button) => {
    button.classList.remove("track-button--active");
    button.setAttribute("aria-pressed", "false");
  });
}

trackButtons.forEach((trackButton) => {
  trackButton.addEventListener("click", () => {
    const selectedTrack = trackButton.dataset.track;
    const selectedTitle = trackButton.dataset.title;

    const sameTrack =
      audioPlayer.dataset.currentTrack === selectedTrack;

    if (sameTrack && !audioPlayer.paused) {
      audioPlayer.pause();
      resetTrackButtons();

      trackStatus.textContent =
        `${selectedTitle} is paused.`;

      return;
    }

    resetTrackButtons();
    trackButton.classList.add("track-button--active");
    trackButton.setAttribute("aria-pressed", "true");

    if (!sameTrack) {
      audioPlayer.src = selectedTrack;
      audioPlayer.dataset.currentTrack = selectedTrack;
    }

    audioPlayer.play();

    trackStatus.textContent =
      `${selectedTitle} is now playing.`;
  });
});

audioPlayer.addEventListener("ended", () => {
  resetTrackButtons();
  trackStatus.textContent = `Choose a sound to begin.`;
});