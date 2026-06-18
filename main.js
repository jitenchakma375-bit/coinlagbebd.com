import { products } from './data.js';

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card voucher-style-card';
  
  let icon = 'star';
  let bgColor = 'var(--color-primary)';
  let cardTitle = product.name;
  let smallLabel = product.name.split(' ')[0]; // Default to first word

  switch(product.id.toLowerCase()) {
    case 'spotify': icon = 'music_note'; bgColor = '#1DB954'; smallLabel = 'Spotify'; break;
    case 'facebook': icon = 'thumb_up'; bgColor = '#1877F2'; smallLabel = 'Facebook'; break;
    case 'likee': icon = 'favorite'; bgColor = '#FF0050'; smallLabel = 'Likee'; break;
    case 'chamet': icon = 'videocam'; bgColor = '#A855F7'; smallLabel = 'Chamet'; cardTitle = 'Chamet Diamond'; break;
    case 'bigo': icon = 'live_tv'; bgColor = '#06B6D4'; smallLabel = 'BIGO LIVE'; cardTitle = 'Bigo Diamonds'; break;
    case 'tango': icon = 'payments'; bgColor = '#F43F5E'; smallLabel = 'LIVE'; cardTitle = 'Tango Gift Card'; break;
    case 'imo': icon = 'chat'; bgColor = '#1D4ED8'; smallLabel = 'imo'; cardTitle = 'IMO Diamonds'; break;
    case 'mico': icon = 'mic'; bgColor = '#EAB308'; smallLabel = 'Mico'; cardTitle = 'Mico Coins'; break;
    default:
      if(product.category === 'streaming') { icon = 'play_circle'; bgColor = '#E50914'; }
      else if(product.category === 'social') { icon = 'thumb_up'; bgColor = '#1877F2'; }
      else if(product.category === 'coins') { icon = 'diamond'; bgColor = '#F5A623'; }
  }

  card.innerHTML = `
    <div class="voucher-card-top" style="background: ${bgColor};">
      <div class="voucher-icon-circle">
        <span class="material-symbols-outlined">${icon}</span>
      </div>
      <div class="voucher-small-label">${smallLabel}</div>
    </div>
    <div class="voucher-card-bottom">
      <h3 class="voucher-card-title">${cardTitle}</h3>
    </div>
  `;
  
  card.style.cursor = 'pointer';
  card.onclick = (e) => {
    window.location.href = `./product.html?id=${product.id}`;
  };
  
  return card;
}

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  if (filteredProducts.length === 0) {
    grid.innerHTML = `<div class="search-no-results">No services found. Try a different search term.</div>`;
    return;
  }

  filteredProducts.forEach(product => {
    grid.appendChild(createProductCard(product));
  });
}

function renderSearchResults(term) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(term) || 
    p.category.toLowerCase().includes(term) ||
    p.description.toLowerCase().includes(term)
  );

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="search-no-results">No services found for "${term}".</div>`;
    return;
  }

  filtered.forEach(product => {
    grid.appendChild(createProductCard(product));
  });
}

function setupFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderProducts(e.target.dataset.filter);
    });
  });
}

function setupSearch() {
  const searchInput = document.querySelector('.search-bar input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.trim().toLowerCase();
    if (term.length > 0) {
      renderSearchResults(term);
    } else {
      renderProducts('all');
    }
  });
}

function setupMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.header-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const icon = toggle.querySelector('.material-symbols-outlined');
    icon.textContent = nav.classList.contains('open') ? 'close' : 'menu';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupFilters();
  setupSearch();
  setupMobileMenu();
});
