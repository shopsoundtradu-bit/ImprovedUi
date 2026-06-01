const canvasArea = document.querySelector('.canvas-area');
  const canvasCard = document.getElementById('canvasCard');
  const zoomIndicator = document.getElementById('zoomLevel');
  
  let scale = 1;
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 5;
  let fadeTimer = null;

  function showZoomIndicator() {
    zoomIndicator.classList.add('visible');
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(() => {
      zoomIndicator.classList.remove('visible');
    }, 1000); // Fades out after 1 second of inactivity
  }

  function updateZoom(newScale) {
    scale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
    canvasCard.style.transform = `scale(${scale})`;
    zoomIndicator.textContent = `${Math.round(scale * 100)}%`;
    showZoomIndicator();
  }

  // Mouse Wheel Zoom
  canvasArea.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    updateZoom(scale * delta);
  }, { passive: false });

  // Pinch Zoom Logic
  let initialDistance = null;
  canvasArea.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      if (initialDistance === null) {
        initialDistance = dist;
      } else {
        const delta = dist / initialDistance;
        updateZoom(scale * delta);
        initialDistance = dist;
      }
    }
  });

  canvasArea.addEventListener('touchend', () => { initialDistance = null; });
