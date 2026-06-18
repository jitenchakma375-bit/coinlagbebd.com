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


    card.innerHTML = `
      <!-- Card Header with product image -->
      <div style="position: relative; overflow: hidden;">
        <img src="${product.image}" alt="${product.name}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block;">
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 0.4rem 0.6rem; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);">
          <h2 style="font-size: 0.78rem; font-weight: 700; color: #fff; margin: 0; line-height: 1.2;">${product.name}</h2>
        </div>
        <span style="position: absolute; top: 0.4rem; right: 0.4rem; font-size: 0.6rem; font-weight: 700; padding: 0.15rem 0.45rem; background: rgba(229,9,20,0.85); color: #fff; border-radius: 9999px;">
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
