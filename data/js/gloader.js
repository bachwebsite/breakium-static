fetch('https://cdn.jsdelivr.net/gh/bachwebsite/breakium-static/data/json/games.json')
  .then(response => response.json())
  .then(data => {
    const gameContainer = document.body;

    const overlay = document.createElement('div');
    overlay.id = "game-overlay";

    const modal = document.createElement('div');
    modal.id = "game-modal";

    const closeBtn = document.createElement('button');
    closeBtn.id = "close-modal";
    closeBtn.textContent = "X";
    const refreshBtn = document.createElement('button');
    refreshBtn.id = "refresh-modal";
    refreshBtn.textContent = "⟳";

    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.id = "fullscreen-modal";
    fullscreenBtn.textContent = "⛶";


    const iframe = document.createElement('iframe');
    iframe.id = "game-frame";

    modal.appendChild(closeBtn);
    modal.appendChild(refreshBtn);
    modal.appendChild(fullscreenBtn);

    modal.appendChild(iframe);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    function closeModal() {
      overlay.style.display = "none";
      iframe.src = "";
    }

    closeBtn.onclick = closeModal;
    refreshBtn.onclick = () => {
    iframe.src = iframe.src; // reload iframe
    };

    let fullscreen = false;

    fullscreenBtn.onclick = () => {
      fullscreen = !fullscreen;

      if (fullscreen) {
        modal.style.width = "100vw";
        modal.style.height = "100vh";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.transform = "none";
        fullscreenBtn.textContent = "🗗"; // exit icon
      } else {
        modal.style.width = "80vw";
        modal.style.height = "80vh";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        fullscreenBtn.textContent = "⛶"; // fullscreen icon
      }
    };

    overlay.onclick = (e) => { 
      if (e.target === overlay) closeModal();
    };

    data.games.forEach(game => {
      const div = document.createElement('div');
      div.className = 'bubbly-div';

      const img = document.createElement('img');
      img.src = game.image;

      const link = document.createElement('a');
      link.textContent = game.name;
      link.href = '#';
      link.style.cursor = 'pointer';

      function openGame() {
        overlay.style.display = "flex";
        iframe.src = game.directory;
      }

      div.onclick = openGame;
      link.onclick = e => {
        e.preventDefault();
        openGame();
      };

      div.appendChild(img);
      div.appendChild(link);
      gameContainer.appendChild(div);
    });
  })
  .catch(error => console.error('Error loading games:', error));
