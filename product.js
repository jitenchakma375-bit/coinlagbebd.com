import { products, whatsappNumber } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) { window.location.href = './index.html'; return; }
  const product = products.find(p => p.id === productId);
  if (!product) { window.location.href = './index.html'; return; }

  // Page title & SEO Meta Tags
  document.title = `${product.name} - CoinBD`;
  document.getElementById('meta-desc').content = product.description;
  document.getElementById('meta-canonical').href = `https://coinbd.org/product.html?id=${product.id}`;
  
  // OG Tags
  document.getElementById('og-url').content = `https://coinbd.org/product.html?id=${product.id}`;
  document.getElementById('og-title').content = `${product.name} - CoinBD`;
  document.getElementById('og-desc').content = product.description;
  
  // Twitter Tags
  document.getElementById('twitter-title').content = `${product.name} - CoinBD`;
  document.getElementById('twitter-desc').content = product.description;

  // JSON-LD Product Schema
  const lowestPrice = product.packages.length > 0 ? parseFloat(product.packages[0].price.replace(/[^0-9.]/g, '')) : 0;
  
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": `https://coinbd.org${product.image}`,
    "description": product.description,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "BDT",
      "lowPrice": lowestPrice || 100,
      "offerCount": product.packages.length
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);

  // Hero
  document.getElementById('heroImage').src = product.image;
  document.getElementById('heroTitle').textContent = product.name;
  document.getElementById('heroDesc').textContent = product.description;
  document.getElementById('heroBadge').textContent = product.badge;

  const baseMsg = `Hello CoinBD! I want to order:\n*Service:* ${product.name}\n*Plan:* Best Plan\n\nPlease confirm my order. Thank you!`;
  document.getElementById('heroWhatsApp').href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(baseMsg)}`;

  // Features - compact cards
  document.getElementById('featuresGrid').innerHTML = product.features.map(f => `
    <div style="background: var(--color-surface); padding: 0.85rem; border-radius: 10px; border: 1px solid var(--color-border); display: flex; align-items: flex-start; gap: 0.65rem;">
      <div style="background: var(--color-primary); color: white; padding: 0.4rem; border-radius: 8px; display: flex; flex-shrink: 0;">
        <span class="material-symbols-outlined" style="font-size: 1.1rem;">${f.icon}</span>
      </div>
      <div>
        <h3 style="margin-bottom: 0.2rem; font-size: 0.85rem;">${f.title}</h3>
        <p style="color: var(--color-text-light); font-size: 0.75rem; line-height: 1.4;">${f.desc}</p>
      </div>
    </div>
  `).join('');

  // Pricing Packages - compact 2-col grid
  document.getElementById('pricingGrid').innerHTML = product.packages.map(pkg => {
    const msg = `Hello CoinBD!\n\nI want to order:\n*Service:* ${product.name}\n*Plan:* ${pkg.name}\n*Price:* ${pkg.price}\n\nPlease confirm. Thank you!`;
    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    return `
      <div style="background: var(--color-surface); padding: 1rem 0.75rem; border-radius: 10px; border: 1px solid var(--color-border); text-align: center; display: flex; flex-direction: column; gap: 0.6rem; transition: border-color 0.3s;" onmouseover="this.style.borderColor='rgba(229,9,20,0.5)'" onmouseout="this.style.borderColor='var(--color-border)'">
        <h3 style="font-size: 0.8rem; color: var(--color-text-light); margin: 0;">${pkg.name}</h3>
        <div style="font-size: 1.4rem; font-weight: 800; color: var(--color-primary); line-height: 1;">${pkg.price}</div>
        <div style="display: flex; gap: 0.5rem; justify-content: space-between; margin-top: 0.5rem;">
          <a href="${link}" target="_blank" style="flex: 1; display: flex; justify-content: center; align-items: center; gap: 0.3rem; padding: 0.5rem 0.2rem; background: #25D366; color: white; border-radius: 8px; font-weight: 700; font-size: 0.72rem; text-decoration: none; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Buy
          </a>
          <a href="https://m.me/100083546743661" target="_blank" style="flex: 1; display: flex; justify-content: center; align-items: center; gap: 0.3rem; padding: 0.5rem 0.2rem; background: #1877F2; color: white; border-radius: 8px; font-weight: 700; font-size: 0.72rem; text-decoration: none; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C6.477 2 2 6.145 2 11.26c0 2.913 1.545 5.467 3.922 7.102V22l3.585-1.968c1.385.394 2.89.608 4.493.608 5.523 0 10-4.145 10-9.26S17.523 2 12 2zm1.094 12.385l-2.77-2.96-5.42 2.96 5.964-6.335 2.872 2.96 5.318-2.96-5.964 6.335z"/></svg>
            Buy
          </a>
        </div>
      </div>
    `;
  }).join('');

  // FAQs - compact
  const faqList = document.getElementById('faqList');
  if (product.faqs && product.faqs.length > 0) {
    faqList.innerHTML = product.faqs.map(faq => `
      <details style="background: var(--color-surface); padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid var(--color-border); cursor: pointer;">
        <summary style="font-weight: 600; font-size: 0.85rem; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;">
          ${faq.q}
          <span class="material-symbols-outlined" style="font-size: 1.1rem; flex-shrink: 0;">expand_more</span>
        </summary>
        <p style="margin-top: 0.6rem; color: var(--color-text-light); font-size: 0.78rem; border-top: 1px solid var(--color-border); padding-top: 0.6rem; line-height: 1.5;">
          ${faq.a}
        </p>
      </details>
    `).join('');
  } else {
    document.querySelector('.faq-section').style.display = 'none';
  }

  // Hide loader
  const loadingEl = document.getElementById('productLoading');
  if (loadingEl) loadingEl.style.display = 'none';
});
