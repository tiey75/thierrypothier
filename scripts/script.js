document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const overlayMenu = document.getElementById('overlayMenu');
  const closeMenuBtn = document.getElementById('closeMenu');
  const iframe = document.getElementById('youtubePlayer');
  const unmuteBtn = document.getElementById('unmuteBtn');

  // Fonction pour envoyer message à l'iframe YouTube
  function postMessageToPlayer(command) {
    if (!iframe) return;
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: command,
        args: []
      }),
      '*'
    );
  }

  // Au départ, vidéo en pause, bouton unmute visible
  postMessageToPlayer('pauseVideo');
  if (unmuteBtn) unmuteBtn.style.display = 'block';

  // Ouvre menu, met vidéo en pause
  burger.addEventListener('click', () => {
    overlayMenu.classList.add('active');
    burger.classList.add('active');
    postMessageToPlayer('pauseVideo');
  });

  // Ferme menu, relance vidéo
  closeMenuBtn.addEventListener('click', () => {
    overlayMenu.classList.remove('active');
    burger.classList.remove('active');
    postMessageToPlayer('playVideo');
  });

  // Ferme menu et relance vidéo quand on clique sur un lien
  overlayMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      overlayMenu.classList.remove('active');
      burger.classList.remove('active');
      postMessageToPlayer('playVideo');
    });
  });

  // Clique sur bouton unmute : active son et cache le bouton
  if (unmuteBtn) {
    unmuteBtn.addEventListener('click', () => {
      postMessageToPlayer('unMute');
      postMessageToPlayer('playVideo');
      unmuteBtn.style.display = 'none';
    });
  }
});
