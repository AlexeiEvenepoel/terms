(function() {
  'use strict';

  const TIKTOK_CLIENT_KEY = 'awk1x8wosci65mtq';
  const REDIRECT_URI = 'https://ladyfragile-gamestt.netlify.app/';
  const SCOPES = 'video.upload,video.publish';

  const GAMES = [
    { name: 'Cyberpunk 2077 Ultimate Edition', img: 'images/cyberpunk-2077.png', slug: 'cyberpunk-2077' },
    { name: 'Elden Ring Deluxe Edition',       img: 'images/elden-ring.png', slug: 'elden-ring' },
    { name: 'Grand Theft Auto V Enhanced',      img: 'images/grand-theft-auto.png', slug: 'grand-theft-auto' },
    { name: 'Final Fantasy VII Rebirth',        img: 'images/final-fantasy.png', slug: 'final-fantasy' },
    { name: 'Call of Duty Modern Warfare II',   img: 'images/call-of-duty.png', slug: 'call-of-duty' },
    { name: 'Days Gone',                        img: 'images/days-gone.png', slug: 'days-gone' },
    { name: 'Detroit Become Human',             img: 'images/detroit-become-human.png', slug: 'detroit-become-human' },
    { name: 'Dead Island 2 Ultimate Edition',   img: 'images/dead-island-2.png', slug: 'dead-island-2' },
    { name: 'Tekken 8',                         img: 'images/tekken-8.png', slug: 'tekken-8' },
    { name: 'Stellar Blade',                    img: 'images/stellar-blade.png', slug: 'stellar-blade' },
    { name: 'Alien Isolation Complete Edition', img: 'images/alien-isolation.png', slug: 'alien-isolation' },
    { name: 'Borderlands 4 Deluxe Edition',     img: 'images/borderlands-4.png', slug: 'borderlands-4' },
  ];

  const REVIEWS = [
    {
      name: 'Carlos M.', color: '#fe2c55',
      text: 'The quality of these game videos is incredible. I\'ve discovered so many new games through this TikTok channel. The Spanish voiceover makes it even better.',
      stars: 5,
    },
    {
      name: 'Ana G.', color: '#5b9aff',
      text: 'Love the consistency! Every day there\'s a new game video with great editing, banner, and description. Really well done automated pipeline.',
      stars: 5,
    },
    {
      name: 'Luis R.', color: '#f5a623',
      text: 'The banner designs are fire. Clean, informative, and the videos always have the download link in the bio. Exactly what the gaming community needs.',
      stars: 4,
    },
    {
      name: 'Sofia K.', color: '#6b3fa0',
      text: 'I follow this channel for game recommendations. The automated reviews with gameplay footage help me decide what to play next. Highly recommended.',
      stars: 5,
    },
  ];

  function renderStars(rating) {
    return Array.from({ length: 5 }, (_, i) =>
      `<span class="star${i < rating ? ' active' : ''}">&#9733;</span>`
    ).join('');
  }

  function getInitials(name) {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('');
  }

  function handleOAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) return;

    const display = document.getElementById('oauthCodeDisplay');
    const box = document.getElementById('oauthCallback');
    if (display && box) {
      display.textContent = code;
      box.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Clean the URL without reloading
    const url = new URL(window.location);
    url.searchParams.delete('code');
    url.searchParams.delete('state');
    window.history.replaceState({}, '', url);
  }

  function getLoginUrl() {
    const state = 'login_' + Math.random().toString(36).slice(2);
    return 'https://www.tiktok.com/v2/auth/authorize/?' +
      'client_key=' + encodeURIComponent(TIKTOK_CLIENT_KEY) +
      '&scope=' + encodeURIComponent(SCOPES) +
      '&response_type=code' +
      '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
      '&state=' + encodeURIComponent(state);
  }

  function init() {
    // OAuth callback handling
    handleOAuthCallback();

    // Login button handlers
    const loginBtns = document.querySelectorAll('#loginBtn, #heroLoginBtn');
    loginBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          window.open(getLoginUrl(), '_blank', 'width=600,height=800');
        });
      }
    });

    const gamesGrid = document.getElementById('gamesGrid');
    if (gamesGrid) {
      gamesGrid.innerHTML = GAMES.map(game => `
        <a href="https://www.tiktok.com/@ladyfragile1" target="_blank" class="game-card-link">
          <div class="game-card">
            <img class="game-thumb" src="${game.img}" alt="${game.name}" loading="lazy">
            <div class="game-info">
              <div class="game-name">${game.name}</div>
              <div class="game-stars">${renderStars(4 + Math.round(Math.random()))}</div>
              <span class="game-link">&#9654; Watch on TikTok</span>
            </div>
          </div>
        </a>
      `).join('');
    }

    const reviewsGrid = document.getElementById('reviewsGrid');
    if (reviewsGrid) {
      reviewsGrid.innerHTML = REVIEWS.map(r => `
        <div class="review-card">
          <div class="review-header">
            <div class="review-avatar" style="background: ${r.color}">${getInitials(r.name)}</div>
            <div>
              <div class="review-author">${r.name}</div>
              <div class="review-stars">${renderStars(r.stars)}</div>
            </div>
          </div>
          <div class="review-text">${r.text}</div>
        </div>
      `).join('');
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();

function copyOAuthCode() {
  const code = document.getElementById('oauthCodeDisplay');
  if (!code) return;
  navigator.clipboard.writeText(code.textContent).catch(() => {});
  const btn = document.querySelector('.oauth-code-box .btn');
  if (btn) {
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  }
}

function dismissOAuthCallback() {
  const box = document.getElementById('oauthCallback');
  if (box) box.classList.add('hidden');
}
