import { products } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('pricingGrid');

  // Make 2 columns on mobile, auto-fit on desktop
  grid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  `;

  // Override to single col on larger screens
  if (window.innerWidth >= 768) {
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(340px, 1fr))';
    grid.style.gap = '1.5rem';
  }

  products.forEach(product => {
    // Generate Rows for each Package - compact on mobile
    const packagesHtml = product.packages.map(pkg => `
      <div style="display: grid; grid-template-columns: 2fr 1fr; align-items: center; padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid transparent; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
        <span style="color: var(--color-text); font-weight: 500; font-size: 0.78rem;">${pkg.name}</span>
        <div style="text-align: right;">
          <span style="font-size: 0.85rem; font-weight: 800; color: #e50914;">${pkg.price}</span>
        </div>
      </div>
    `).join('');

    const card = document.createElement('div');
    card.style.cssText = `
      background-color: rgba(30, 41, 59, 0.5);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 12px;
      border: 1px solid var(--color-border);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: border-color 0.3s;
    `;
    card.onmouseover = () => card.style.borderColor = 'rgba(255,255,255,0.2)';
    card.onmouseout = () => card.style.borderColor = 'var(--color-border)';

    let icon = 'star';
    let bgColor = 'var(--color-primary)';

    switch(product.id.toLowerCase()) {
      case 'spotify': icon = 'music_note'; bgColor = '#1DB954'; break;
      case 'facebook': icon = 'thumb_up'; bgColor = '#1877F2'; break;
      case 'likee': icon = 'favorite'; bgColor = '#FF0050'; break;
      case 'chamet': icon = 'videocam'; bgColor = '#E91E63'; break;
      case 'bigo': icon = 'live_tv'; bgColor = '#00E5FF'; break;
      case 'tango': icon = 'payments'; bgColor = '#F97316'; break;
      case 'imo': icon = 'chat'; bgColor = '#1877F2'; break;
      case 'mico': icon = 'mic'; bgColor = '#FFC107'; break;
      default:
        if(product.category === 'streaming') { icon = 'play_circle'; bgColor = '#E50914'; }
        else if(product.category === 'social') { icon = 'thumb_up'; bgColor = '#1877F2'; }
        else if(product.category === 'coins') { icon = 'diamond'; bgColor = '#F5A623'; }
    }

    card.innerHTML = `
      <!-- Card Header -->
      <div style="padding: 0.75rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-border); background: rgba(255,255,255,0.02);">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div style="width: 2rem; height: 2rem; border-radius: 8px; background-color: ${bgColor}; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">
            <span class="material-symbols-outlined" style="font-size: 1rem;">${icon}</span>
          </div>
          <h2 style="font-size: 0.82rem; font-weight: 700; color: var(--color-text); margin: 0; line-height: 1.2;">${product.name}</h2>
        </div>
        <span style="font-size: 0.62rem; font-weight: 700; padding: 0.15rem 0.5rem; background: rgba(255,255,255,0.08); color: var(--color-text-light); border-radius: 9999px; white-space: nowrap; flex-shrink: 0;">
          ${product.packages.length} opts
        </span>
      </div>

      <!-- Package list -->
      <div style="flex-grow: 1; display: flex; flex-direction: column; padding: 0.35rem;">
        <div style="display: grid; grid-template-columns: 2fr 1fr; padding: 0.35rem 0.75rem; font-size: 0.65rem; font-weight: 700; color: var(--color-text-light); margin-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.5px;">
          <span>Package</span>
          <span style="text-align: right;">Price</span>
        </div>
        ${packagesHtml}
      </div>

      <!-- Buy Button -->
      <div style="padding: 0.6rem;">
        <a href="./product.html?id=${product.id}" style="display: flex; align-items: center; justify-content: center; gap: 0.35rem; width: 100%; padding: 0.55rem; border-radius: 8px; background: rgba(229,9,20,0.15); border: 1px solid rgba(229,9,20,0.3); color: #e50914; font-weight: 700; font-size: 0.75rem; text-decoration: none; transition: background 0.3s;" onmouseover="this.style.background='rgba(229,9,20,0.25)'" onmouseout="this.style.background='rgba(229,9,20,0.15)'">
          Buy Now <span class="material-symbols-outlined" style="font-size: 0.9rem;">arrow_forward</span>
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
});
