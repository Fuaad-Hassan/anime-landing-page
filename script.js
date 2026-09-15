document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const heroVideo = document.getElementById("heroVideo");
  const backgroundMusic = document.getElementById("backgroundMusic");

  const audioModal = document.getElementById("audioModal");
  const audioStartBtn = document.getElementById("audioStartBtn");

  let isDark = false;
  let canPlayAudio = false;

  function changeTheme() {
    document.body.dataset.theme = isDark ? "dark" : "light";

    const sunIcon = themeToggle.querySelector('[data-lucide="sun"]');
    const moonIcon = themeToggle.querySelector('[data-lucide="moon"]');

    if (sunIcon && moonIcon) {
      sunIcon.style.display = isDark ? "block" : "none";
      moonIcon.style.display = isDark ? "none" : "block";
    }

    if (window.lucide) {
      lucide.createIcons();
    }

    updateMedia(
      isDark ? "https://res.cloudinary.com/chhytxqs/video/upload/f_auto,q_auto/v1789471609/Dark_Mode_V.mp4" : "https://res.cloudinary.com/chhytxqs/video/upload/f_auto,q_auto/v1789471625/Light_Mode_V.mp4",
      isDark ? "https://res.cloudinary.com/chhytxqs/video/upload/f_auto,q_auto/v1789471609/Dark_Mode_V.jpg" : "https://res.cloudinary.com/chhytxqs/video/upload/f_auto,q_auto/v1789471625/Light_Mode_V.jpg",
      isDark ? "Dark Mode Music.mp3" : "Main Page Music.mp3"
    );
  }

  function updateMedia(videoUrl, posterUrl, musicFile) {
    if (heroVideo) {
      heroVideo.poster = posterUrl;
      const vSrc = heroVideo.querySelector("source");
      if (vSrc) {
        vSrc.src = videoUrl;
        heroVideo.load();
        if (canPlayAudio) {
          heroVideo.play().catch(() => {});
        }
      }
    }

    if (backgroundMusic) {
      const aSrc = backgroundMusic.querySelector("source");
      if (aSrc) {
        aSrc.src = "src/Audio/" + musicFile;
        backgroundMusic.load();
        if (canPlayAudio) {
          backgroundMusic.play().catch(() => {});
        }
      }
    }
  }

  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      isDark = !isDark;
      changeTheme();
    });
  }

  // Popup: start video + music only when button is clicked
  if (audioModal && audioStartBtn) {
    audioStartBtn.addEventListener("click", () => {
      canPlayAudio = true;

      if (heroVideo) {
        heroVideo.play().catch(() => {});
      }
      if (backgroundMusic) {
        backgroundMusic.play().catch(() => {});
      }

      audioModal.remove(); 
    });
  }


  changeTheme();
});
