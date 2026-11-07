import './style.css';
import { GARMENTS } from './catalog.js';
import { renderDesign } from './render.js';
import { quote, money, PRICING } from './pricing.js';
import { store, onChange } from './store.js';
import { mountStudio, productionSheet } from './studio.js';
import { download } from './render.js';
import { h, toast, fmtDate } from './ui.js';

const app = document.getElementById('app');
const SHIPPING = { fee: 30, freeFrom: 500 };
const STATUSES = ['reçue', 'en digitalisation', 'en production', 'expédiée', 'livrée'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
let cleanup = null;

const routes = { '': home, studio, designs, cart, orders };

function route() {
  const [path, qs] = location.hash.replace(/^#\/?/, '').split('?');
  const page = routes[path] ? path : '';
  cleanup?.();
  cleanup = null;
  document.querySelectorAll('[data-route]').forEach((a) => a.classList.toggle('active', a.dataset.route === (page || 'home')));
  const r = routes[page](new URLSearchParams(qs || ''));
  if (typeof r === 'function') cleanup = r;
  app.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

function updateBadge() {
  document.getElementById('cart-count').textContent = store.cart().reduce((n, i) => n + i.qty, 0);
}

onChange(updateBadge);
window.addEventListener('hashchange', route);
updateBadge();
route();

// ---------------- pages ----------------

function home() {
  const tiers = [...PRICING.tiers].reverse();
  app.innerHTML = `
  <section class="hero">
    <div>
      <h1>Votre broderie, conçue en ligne.</h1>
      <p class="lead">Créez votre design dans le Studio, voyez le rendu point par point, obtenez un prix instantané et commandez — du t-shirt unique à la série pour votre équipe.</p>
      <div class="row">
        <a class="btn primary" href="#/studio" data-testid="cta-studio">Ouvrir le Studio</a>
        <a class="btn" href="#/designs">Mes designs</a>
      </div>
    </div>
    <div class="hero-art">${renderDesign({
      name: 'Exemple',
      garment: 'hoodie',
      garmentColor: '#1e2a4a',
      zone: 'chest',
      elements: [
        { id: 'a', type: 'shape', shape: 'badge', x: 200, y: 195, rotation: 0, scale: 1.1, color: '#c5a552', stitch: 'run' },
        { id: 'b', type: 'text', text: 'ATLAS\nCLUB', font: 'block', size: 22, x: 200, y: 195, rotation: 0, scale: 1, color: '#ffffff', stitch: 'satin' },
      ],
    })}</div>
  </section>

  <section class="steps">
    <article><span>1</span><h3>Concevez</h3><p>Texte, formes, modèles ou votre logo. Choisissez l'article, l'emplacement et les fils.</p></article>
    <article><span>2</span><h3>Estimez</h3><p>Nombre de points, temps machine et prix calculés en direct, remises de quantité incluses.</p></article>
    <article><span>3</span><h3>Commandez</h3><p>Paiement à la livraison ou virement. Suivez chaque étape : digitalisation, production, expédition.</p></article>
  </section>

  <section class="pricing">
    <h2>Tarifs</h2>
    <div class="price-grid">
      <table>
        <caption>Articles</caption>
        <tbody>${Object.values(GARMENTS).map((g) => `<tr><th>${g.name}</th><td>${money(g.base)}</td></tr>`).join('')}</tbody>
      </table>
      <table>
        <caption>Broderie</caption>
        <tbody>
          <tr><th>Par 1 000 points</th><td>${money(PRICING.perThousandStitches)}</td></tr>
          <tr><th>Minimum broderie</th><td>${money(PRICING.minEmbroidery)}</td></tr>
          <tr><th>Changement de couleur</th><td>${money(PRICING.perColorChange)}</td></tr>
          <tr><th>Digitalisation (&lt; ${PRICING.digitizingFreeFrom} pcs)</th><td>${money(PRICING.digitizingFee)}</td></tr>
        </tbody>
      </table>
      <table>
        <caption>Remises quantité</caption>
        <tbody>${tiers.map((t) => `<tr><th>${t.min}+ pièces</th><td>${t.discount ? `−${t.discount * 100}%` : '—'}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <p class="muted">Livraison ${money(SHIPPING.fee)}, offerte dès ${money(SHIPPING.freeFrom)}.</p>
  </section>`;
}

function studio(params) {
  return mountStudio(app, params);
}

function designs() {
  const list = store.designs();
  app.innerHTML = `
  <section class="page">
    <div class="page-head"><h1>Mes designs</h1><a class="btn primary" href="#/studio" data-testid="designs-new">Nouveau design</a></div>
    ${
      list.length
        ? `<div class="cards" data-testid="design-list">${list
            .map((d) => {
              const q = quote(d, 1);
              return `<article class="card">
                <div class="thumb">${renderDesign(d)}</div>
                <h3>${h(d.name)}</h3>
                <p class="muted small">${GARMENTS[d.garment].name} · ${q.stitches.toLocaleString('fr-FR')} points · ${money(q.unit)}<br>Modifié le ${fmtDate(d.updatedAt)}</p>
                <div class="row">
                  <a class="btn" href="#/studio?id=${d.id}" data-testid="open-design">Ouvrir</a>
                  <button data-dup="${d.id}">Dupliquer</button>
                  <button class="danger" data-del="${d.id}">Supprimer</button>
                </div>
              </article>`;
            })
            .join('')}</div>`
        : `<div class="empty"><p>Aucun design enregistré pour l'instant.</p><a class="btn primary" href="#/studio">Créer mon premier design</a></div>`
    }
  </section>`;
  app.onclick = (e) => {
    const del = e.target.closest('[data-del]')?.dataset.del;
    const dup = e.target.closest('[data-dup]')?.dataset.dup;
    if (del && confirm('Supprimer ce design ?')) {
      store.deleteDesign(del);
      designs();
    } else if (dup) {
      const d = store.design(dup);
      store.saveDesign({ ...d, id: undefined, createdAt: undefined, name: `${d.name} (copie)` });
      designs();
    }
  };
  return () => (app.onclick = null);
}

function cart() {
  const items = store.cart();
  if (!items.length) {
    app.innerHTML = `<section class="page"><h1>Panier</h1><div class="empty"><p>Votre panier est vide.</p><a class="btn primary" href="#/studio">Ouvrir le Studio</a></div></section>`;
    return;
  }
  const lines = items.map((i) => ({ ...i, q: quote(i.snapshot, i.qty) }));
  const subtotal = lines.reduce((s, l) => s + l.q.total, 0);
  const shipping = subtotal >= SHIPPING.freeFrom ? 0 : SHIPPING.fee;
  const total = subtotal + shipping;

  app.innerHTML = `
  <section class="page">
    <h1>Panier</h1>
    <div class="cart-layout">
      <div class="cart-lines" data-testid="cart-lines">
        ${lines
          .map((l) => {
            const g = GARMENTS[l.snapshot.garment];
            const sized = l.snapshot.garment === 'tshirt' || l.snapshot.garment === 'hoodie';
            return `<article class="line">
              <div class="thumb">${renderDesign(l.snapshot)}</div>
              <div>
                <h3>${h(l.snapshot.name)}</h3>
                <p class="muted small">${g.name} · ${l.q.stitches.toLocaleString('fr-FR')} points · ${money(l.q.unit)} / pièce${l.q.digitizing ? ` · digitalisation ${money(l.q.digitizing)}` : ''}</p>
                <div class="row">
                  ${sized ? `<label>Taille <select data-size="${l.id}">${SIZES.map((s) => `<option ${s === l.size ? 'selected' : ''}>${s}</option>`).join('')}</select></label>` : '<span class="muted small">Taille unique</span>'}
                  <label>Qté <input type="number" min="1" max="5000" value="${l.qty}" data-qty="${l.id}" data-testid="cart-qty"/></label>
                  <button class="danger" data-remove="${l.id}">Retirer</button>
                </div>
              </div>
              <strong class="line-total">${money(l.q.total)}</strong>
            </article>`;
          })
          .join('')}
      </div>
      <form class="panel checkout" data-testid="checkout" novalidate>
        <h2>Récapitulatif</h2>
        <dl>
          <dt>Sous-total</dt><dd>${money(subtotal)}</dd>
          <dt>Livraison</dt><dd>${shipping ? money(shipping) : 'Offerte'}</dd>
          <dt class="total">Total</dt><dd class="total" data-testid="cart-total">${money(total)}</dd>
        </dl>
        <h2>Livraison</h2>
        <label>Nom complet <input name="name" required autocomplete="name" data-testid="ck-name"/></label>
        <label>Téléphone <input name="phone" required inputmode="tel" placeholder="06XXXXXXXX" autocomplete="tel" data-testid="ck-phone"/></label>
        <label>Ville <input name="city" required autocomplete="address-level2" data-testid="ck-city"/></label>
        <label>Adresse <textarea name="address" rows="2" required autocomplete="street-address" data-testid="ck-address"></textarea></label>
        <label>Paiement
          <select name="payment" data-testid="ck-payment">
            <option value="cod">Paiement à la livraison</option>
            <option value="transfer">Virement bancaire</option>
          </select>
        </label>
        <label>Notes <textarea name="notes" rows="2" placeholder="Date souhaitée, précisions…"></textarea></label>
        <p class="form-error" data-testid="ck-error" role="alert"></p>
        <button class="primary" type="submit" data-testid="place-order">Confirmer la commande</button>
      </form>
    </div>
  </section>`;

  const rerender = () => cart();
  app.querySelectorAll('[data-qty]').forEach((inp) =>
    inp.addEventListener('change', () => {
      store.updateCartItem(inp.dataset.qty, { qty: Math.max(1, Math.min(5000, parseInt(inp.value, 10) || 1)) });
      rerender();
    }),
  );
  app.querySelectorAll('[data-size]').forEach((sel) =>
    sel.addEventListener('change', () => store.updateCartItem(sel.dataset.size, { size: sel.value })),
  );
  app.querySelectorAll('[data-remove]').forEach((b) =>
    b.addEventListener('click', () => {
      store.removeCartItem(b.dataset.remove);
      rerender();
    }),
  );
  app.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    const err = validateCheckout(f);
    app.querySelector('.form-error').textContent = err || '';
    if (err) return;
    const fresh = store.cart().map((i) => ({ ...i, q: quote(i.snapshot, i.qty) }));
    const sub = fresh.reduce((s, l) => s + l.q.total, 0);
    const ship = sub >= SHIPPING.freeFrom ? 0 : SHIPPING.fee;
    const order = store.placeOrder({
      customer: { name: f.name.trim(), phone: f.phone.replace(/\s/g, ''), city: f.city.trim(), address: f.address.trim() },
      payment: f.payment,
      notes: (f.notes || '').trim(),
      items: fresh.map(({ q, ...i }) => ({ ...i, unit: q.unit, total: q.total, stitches: q.stitches })),
      subtotal: sub,
      shipping: ship,
      total: sub + ship,
    });
    store.clearCart();
    toast(`Commande ${order.id} confirmée !`);
    location.hash = '#/orders';
  });
}

export function validateCheckout(f) {
  if (!f.name || f.name.trim().length < 3) return 'Indiquez votre nom complet.';
  if (!/^(\+212|0)[5-7]\d{8}$/.test((f.phone || '').replace(/[\s.-]/g, ''))) return 'Numéro de téléphone invalide (ex. 0612345678 ou +212612345678).';
  if (!f.city || !f.city.trim()) return 'Indiquez votre ville.';
  if (!f.address || f.address.trim().length < 5) return 'Indiquez une adresse de livraison complète.';
  return '';
}

function orders() {
  const list = store.orders();
  app.innerHTML = `
  <section class="page">
    <h1>Commandes</h1>
    ${
      list.length
        ? `<div class="orders" data-testid="order-list">${list
            .map(
              (o) => `<article class="panel order">
              <header>
                <div><strong>${o.id}</strong> <span class="muted small">· ${fmtDate(o.createdAt)}</span></div>
                <label class="small">Statut
                  <select data-status="${o.id}" data-testid="order-status">${STATUSES.map((s) => `<option ${s === o.status ? 'selected' : ''}>${s}</option>`).join('')}</select>
                </label>
              </header>
              <ol class="progress">${STATUSES.map((s, i) => `<li class="${i <= STATUSES.indexOf(o.status) ? 'done' : ''}">${s}</li>`).join('')}</ol>
              <ul class="order-items">${o.items
                .map(
                  (i, idx) => `<li>
                    <div class="thumb sm">${renderDesign(i.snapshot)}</div>
                    <div>${h(i.snapshot.name)} — ${GARMENTS[i.snapshot.garment].name}${i.size && ['tshirt', 'hoodie'].includes(i.snapshot.garment) ? ` (${i.size})` : ''} × ${i.qty}<br><span class="muted small">${i.stitches.toLocaleString('fr-FR')} points · ${money(i.total)}</span></div>
                    <button data-sheet="${o.id}:${idx}" class="small">Fiche production</button>
                  </li>`,
                )
                .join('')}</ul>
              <footer class="muted small">${h(o.customer.name)} · ${h(o.customer.phone)} · ${h(o.customer.city)} — ${o.payment === 'cod' ? 'Paiement à la livraison' : 'Virement'} · <strong>Total ${money(o.total)}</strong></footer>
            </article>`,
            )
            .join('')}</div>`
        : `<div class="empty"><p>Aucune commande pour l'instant.</p><a class="btn primary" href="#/studio">Créer un design</a></div>`
    }
  </section>`;
  app.querySelectorAll('[data-status]').forEach((sel) =>
    sel.addEventListener('change', () => {
      store.setOrderStatus(sel.dataset.status, sel.value);
      orders();
      toast('Statut mis à jour.');
    }),
  );
  app.querySelectorAll('[data-sheet]').forEach((b) =>
    b.addEventListener('click', () => {
      const [id, idx] = b.dataset.sheet.split(':');
      const o = store.orders().find((x) => x.id === id);
      const item = o.items[+idx];
      const sheet = { order: o.id, customer: o.customer, size: item.size, ...productionSheet(item.snapshot, item.qty) };
      download(new Blob([JSON.stringify(sheet, null, 2)], { type: 'application/json' }), `${o.id}-${+idx + 1}-production.json`);
    }),
  );
}
