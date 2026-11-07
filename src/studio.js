import { GARMENTS, GARMENT_COLORS, THREADS, FONTS, STITCH_TYPES, SHAPES, threadByHex } from './catalog.js';
import { renderDesign, zoneOf, exportSvg, svgToPng, download } from './render.js';
import { quote, money, elementStitches, PRICING } from './pricing.js';
import { store, uid } from './store.js';
import { toast, h } from './ui.js';

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_HISTORY = 100;

export function newDesign() {
  return {
    name: 'Nouveau design',
    garment: 'tshirt',
    garmentColor: GARMENT_COLORS[0].hex,
    zone: 'chest',
    elements: [],
  };
}

const TEMPLATES = [
  {
    name: 'Initiales',
    build: (z) => [
      { type: 'shape', shape: 'circle', color: '#0033a0', stitch: 'run', scale: 1.4 },
      { type: 'text', text: 'AB', font: 'serif', size: 46, color: '#0033a0', stitch: 'satin' },
    ].map((e) => ({ ...e, x: z.x + z.w / 2, y: z.y + z.h / 2 })),
  },
  {
    name: 'Club sportif',
    build: (z) => [
      { type: 'shape', shape: 'badge', color: '#c8102e', stitch: 'fill', scale: 1.3, y: 0 },
      { type: 'text', text: 'FC\nCASA', font: 'block', size: 24, color: '#ffffff', stitch: 'satin', y: 0 },
    ].map((e) => ({ ...e, x: z.x + z.w / 2, y: z.y + z.h / 2 })),
  },
  {
    name: 'Prénom script',
    build: (z) => [
      { type: 'text', text: 'Salma', font: 'script', size: 44, color: '#c5a552', stitch: 'satin', x: z.x + z.w / 2, y: z.y + z.h / 2 },
    ],
  },
  {
    name: 'Cœur minimal',
    build: (z) => [
      { type: 'shape', shape: 'heart', color: '#c8102e', stitch: 'satin', scale: 0.6, x: z.x + z.w / 2, y: z.y + z.h / 2 },
    ],
  },
];

const normalize = (e) => ({
  id: uid('el'),
  rotation: 0,
  scale: 1,
  stitch: 'satin',
  color: THREADS[1].hex,
  ...e,
});

export function mountStudio(root, params) {
  const fromSaved = params.get('id') && store.design(params.get('id'));
  const s = {
    design: fromSaved ? structuredClone(fromSaved) : store.draft() || newDesign(),
    selectedId: null,
    past: [],
    future: [],
    lastCommit: { key: null, at: 0 },
    qty: 1,
  };

  root.innerHTML = `
  <section class="studio" data-testid="studio">
    <aside class="tools panel" aria-label="Outils">
      <h2>Ajouter</h2>
      <div class="tool-grid">
        <button data-act="add-text" data-testid="add-text">＋ Texte</button>
        ${Object.keys(SHAPES).map((k) => `<button data-act="add-shape" data-shape="${k}" data-testid="add-shape-${k}" title="Forme ${k}">${shapeIcon(k)}</button>`).join('')}
        <label class="btn file" data-testid="upload-label">⇪ Logo / image
          <input type="file" accept="image/png,image/jpeg,image/svg+xml" data-testid="upload-image" hidden />
        </label>
      </div>
      <h2>Modèles</h2>
      <div class="templates">
        ${TEMPLATES.map((t, i) => `<button data-act="template" data-i="${i}" data-testid="template-${i}">${t.name}</button>`).join('')}
      </div>
      <h2>Calques</h2>
      <ol class="layers" data-testid="layers"></ol>
    </aside>

    <div class="canvas-wrap">
      <div class="canvas-bar">
        <input class="design-name" data-testid="design-name" aria-label="Nom du design" />
        <div class="bar-actions">
          <button data-act="undo" data-testid="undo" title="Annuler (Ctrl+Z)">↶</button>
          <button data-act="redo" data-testid="redo" title="Rétablir (Ctrl+Y)">↷</button>
          <label class="toggle"><input type="checkbox" data-testid="stitch-look" checked /> Rendu points</label>
        </div>
      </div>
      <div class="canvas" data-testid="canvas"></div>
      <ul class="warnings" data-testid="warnings"></ul>
    </div>

    <aside class="side panel" aria-label="Réglages">
      <h2>Produit</h2>
      <label>Article
        <select data-field="garment" data-testid="garment">${Object.entries(GARMENTS).map(([k, g]) => `<option value="${k}">${g.name} — ${money(g.base)}</option>`).join('')}</select>
      </label>
      <label>Emplacement <select data-field="zone" data-testid="zone"></select></label>
      <div class="field-label">Couleur de l'article</div>
      <div class="swatches" data-testid="garment-colors">
        ${GARMENT_COLORS.map((c) => `<button class="swatch" data-act="garment-color" data-hex="${c.hex}" style="--c:${c.hex}" title="${c.name}" aria-label="${c.name}"></button>`).join('')}
      </div>

      <div class="props" data-testid="props"></div>

      <h2>Devis</h2>
      <div class="quote" data-testid="quote"></div>
      <div class="actions">
        <button class="primary" data-act="cart" data-testid="add-to-cart">Ajouter au panier</button>
        <button data-act="save" data-testid="save-design">Enregistrer</button>
        <button data-act="export-svg" data-testid="export-svg">Export SVG</button>
        <button data-act="export-png" data-testid="export-png">Export PNG</button>
        <button data-act="sheet" data-testid="production-sheet">Fiche de production</button>
        <button data-act="new" data-testid="new-design">Nouveau</button>
      </div>
    </aside>
  </section>`;

  // Listeners go on the Studio section (replaced on every navigation), never on the
  // shared #app root, so revisiting the Studio cannot stack duplicate handlers.
  const view = root.querySelector('.studio');
  const $ = (sel) => view.querySelector(sel);
  const canvas = $('.canvas');
  const nameInput = $('.design-name');
  const stitchToggle = $('[data-testid="stitch-look"]');

  const sel = () => s.design.elements.find((e) => e.id === s.selectedId);

  // ---------- history ----------
  function commit(key = null) {
    const now = Date.now();
    if (key && key === s.lastCommit.key && now - s.lastCommit.at < 800) {
      s.lastCommit.at = now;
      return;
    }
    s.lastCommit = { key, at: now };
    s.past.push(structuredClone(s.design));
    if (s.past.length > MAX_HISTORY) s.past.shift();
    s.future = [];
  }
  function undo() {
    if (!s.past.length) return;
    s.future.push(structuredClone(s.design));
    s.design = s.past.pop();
    s.lastCommit = { key: null, at: 0 };
    if (!sel()) s.selectedId = null;
    renderAll();
  }
  function redo() {
    if (!s.future.length) return;
    s.past.push(structuredClone(s.design));
    s.design = s.future.pop();
    s.lastCommit = { key: null, at: 0 };
    if (!sel()) s.selectedId = null;
    renderAll();
  }

  // ---------- rendering ----------
  function renderCanvas() {
    canvas.innerHTML = renderDesign(s.design, { editor: true, selectedId: s.selectedId, stitchLook: stitchToggle.checked });
    drawSelection();
    store.saveDraft(s.design);
  }

  function drawSelection() {
    const box = canvas.querySelector('#sel-box');
    const node = s.selectedId && canvas.querySelector(`.el[data-id="${s.selectedId}"]`);
    if (!box || !node) return;
    let bb;
    try {
      bb = node.getBBox();
    } catch {
      return;
    }
    const pad = 4;
    box.setAttribute('transform', node.getAttribute('transform'));
    box.innerHTML = `<rect x="${bb.x - pad}" y="${bb.y - pad}" width="${bb.width + pad * 2}" height="${bb.height + pad * 2}" fill="none" stroke="#2563eb" stroke-width="1" stroke-dasharray="4 3" vector-effect="non-scaling-stroke"/>`;
  }

  function renderLayers() {
    const ol = $('.layers');
    if (!s.design.elements.length) {
      ol.innerHTML = '<li class="muted">Aucun élément. Ajoutez un texte, une forme ou un logo.</li>';
      return;
    }
    ol.innerHTML = [...s.design.elements]
      .map((el, i) => ({ el, i }))
      .reverse()
      .map(
        ({ el, i }) => `<li class="${el.id === s.selectedId ? 'active' : ''}">
          <button class="layer-pick" data-act="select" data-id="${el.id}" data-testid="layer-${i}">
            <span class="dot" style="--c:${el.color}"></span>${h(labelOf(el))}
          </button>
          <span class="layer-tools">
            <button data-act="up" data-id="${el.id}" title="Monter" aria-label="Monter">▲</button>
            <button data-act="down" data-id="${el.id}" title="Descendre" aria-label="Descendre">▼</button>
          </span>
        </li>`,
      )
      .join('');
  }

  function renderProduct() {
    $('[data-field="garment"]').value = s.design.garment;
    const zones = GARMENTS[s.design.garment].zones;
    if (!zones[s.design.zone]) s.design.zone = Object.keys(zones)[0];
    $('[data-field="zone"]').innerHTML = Object.entries(zones)
      .map(([k, z]) => `<option value="${k}" ${k === s.design.zone ? 'selected' : ''}>${z.label}</option>`)
      .join('');
    view.querySelectorAll('[data-act="garment-color"]').forEach((b) => b.classList.toggle('on', b.dataset.hex === s.design.garmentColor));
    nameInput.value = s.design.name;
  }

  function renderProps() {
    const el = sel();
    const box = $('.props');
    if (!el) {
      box.innerHTML = `<h2>Élément</h2><p class="muted">Sélectionnez un élément sur l'article pour le modifier. Glissez pour déplacer, flèches pour ajuster.</p>`;
      return;
    }
    const threadOpts = THREADS.map(
      (t) => `<button class="swatch thread ${t.hex === el.color ? 'on' : ''}" data-act="thread" data-hex="${t.hex}" style="--c:${t.hex}" title="${t.code} ${t.name}" aria-label="Fil ${t.name}"></button>`,
    ).join('');
    box.innerHTML = `
      <h2>Élément — ${h(el.type === 'text' ? 'Texte' : el.type === 'shape' ? 'Forme' : 'Image')}</h2>
      ${
        el.type === 'text'
          ? `<label>Texte <textarea rows="2" data-prop="text" data-testid="prop-text">${h(el.text)}</textarea></label>
             <label>Police <select data-prop="font" data-testid="prop-font">${FONTS.map((f) => `<option value="${f.id}" ${f.id === el.font ? 'selected' : ''}>${f.label}</option>`).join('')}</select></label>
             <label>Taille <span class="val">${el.size}</span><input type="range" min="6" max="90" data-prop="size" data-num value="${el.size}" data-testid="prop-size"/></label>
             <label>Espacement <span class="val">${el.spacing || 0}</span><input type="range" min="-5" max="20" data-prop="spacing" data-num value="${el.spacing || 0}" data-testid="prop-spacing"/></label>`
          : ''
      }
      ${el.type === 'shape' ? `<label>Forme <select data-prop="shape" data-testid="prop-shape">${Object.keys(SHAPES).map((k) => `<option ${k === el.shape ? 'selected' : ''}>${k}</option>`).join('')}</select></label>` : ''}
      <label>Échelle <span class="val">${el.scale.toFixed(2)}</span><input type="range" min="0.2" max="3" step="0.05" data-prop="scale" data-num value="${el.scale}" data-testid="prop-scale"/></label>
      <label>Rotation <span class="val">${el.rotation}°</span><input type="range" min="-180" max="180" data-prop="rotation" data-num value="${el.rotation}" data-testid="prop-rotation"/></label>
      ${el.type !== 'image' ? `<label>Point <select data-prop="stitch" data-testid="prop-stitch">${STITCH_TYPES.map((t) => `<option value="${t.id}" ${t.id === el.stitch ? 'selected' : ''}>${t.label}</option>`).join('')}</select></label>
      <div class="field-label">Fil — ${h(threadByHex(el.color).code)} ${h(threadByHex(el.color).name)}</div>
      <div class="swatches threads" data-testid="threads">${threadOpts}</div>` : '<p class="muted">Les images sont digitalisées par notre équipe avant broderie.</p>'}
      <div class="row">
        <button data-act="center" data-testid="center">Centrer</button>
        <button data-act="duplicate" data-testid="duplicate">Dupliquer</button>
        <button class="danger" data-act="delete" data-testid="delete">Supprimer</button>
      </div>
      <p class="muted small">≈ ${elementStitches(el).toLocaleString('fr-FR')} points</p>`;
  }

  function renderQuote() {
    const q = quote(s.design, s.qty);
    $('.quote').innerHTML = `
      <label class="qty">Quantité <input type="number" min="1" max="5000" value="${s.qty}" data-testid="qty"/></label>
      <dl>
        <dt>Points</dt><dd data-testid="stitch-count">${q.stitches.toLocaleString('fr-FR')}</dd>
        <dt>Couleurs de fil</dt><dd>${q.colors.length}</dd>
        <dt>Temps machine</dt><dd>${q.minutes} min / pièce</dd>
        <dt>Article</dt><dd>${money(q.garmentBase)}</dd>
        <dt>Broderie${q.discount ? ` (−${q.discount * 100}%)` : ''}</dt><dd>${money(q.embroidery)}</dd>
        <dt>Prix unitaire</dt><dd data-testid="unit-price">${money(q.unit)}</dd>
        ${q.digitizing ? `<dt>Digitalisation</dt><dd>${money(q.digitizing)}</dd>` : ''}
        <dt class="total">Total</dt><dd class="total" data-testid="total-price">${money(q.total)}</dd>
      </dl>
      <p class="muted small">Digitalisation offerte dès ${PRICING.digitizingFreeFrom} pièces. Remises : 5+ −10%, 12+ −20%, 50+ −30%.</p>`;
  }

  function renderWarnings() {
    const z = zoneOf(s.design);
    const out = [];
    for (const el of s.design.elements) {
      if (el.x < z.x || el.x > z.x + z.w || el.y < z.y || el.y > z.y + z.h)
        out.push(`« ${labelOf(el)} » est hors de la zone de broderie.`);
      if (el.type === 'text' && el.size * (el.scale || 1) < 8) out.push(`« ${labelOf(el)} » est trop petit pour être brodé lisiblement (min. ~5 mm).`);
    }
    const colors = new Set(s.design.elements.map((e) => e.color)).size;
    if (colors > 12) out.push('Plus de 12 couleurs : la machine ne peut pas broder ce design en une passe.');
    $('.warnings').innerHTML = out.map((w) => `<li>⚠ ${h(w)}</li>`).join('');
  }

  function renderAll() {
    renderProduct();
    renderCanvas();
    renderLayers();
    renderProps();
    renderQuote();
    renderWarnings();
  }
  // Light refresh while editing a property (keeps focus in the panel).
  function refreshLive() {
    renderCanvas();
    renderLayers();
    renderQuote();
    renderWarnings();
  }

  // ---------- mutations ----------
  function add(partial) {
    commit();
    const z = zoneOf(s.design);
    const el = normalize({ x: z.x + z.w / 2, y: z.y + z.h / 2, ...partial });
    s.design.elements.push(el);
    s.selectedId = el.id;
    renderAll();
    return el;
  }
  function removeSelected() {
    if (!sel()) return;
    commit();
    s.design.elements = s.design.elements.filter((e) => e.id !== s.selectedId);
    s.selectedId = null;
    renderAll();
  }
  function move(id, dir) {
    const arr = s.design.elements;
    const i = arr.findIndex((e) => e.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= arr.length) return;
    commit();
    [arr[i], arr[j]] = [arr[j], arr[i]];
    renderAll();
  }
  function nudge(dx, dy) {
    const el = sel();
    if (!el) return;
    commit('nudge');
    el.x += dx;
    el.y += dy;
    refreshLive();
  }

  async function onUpload(file) {
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) return toast('Image trop lourde (max 2 Mo).', 'error');
    const href = await new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
    const dims = await new Promise((res) => {
      const img = new Image();
      img.onload = () => res({ w: img.naturalWidth || 100, h: img.naturalHeight || 100 });
      img.onerror = () => res({ w: 100, h: 100 });
      img.src = href;
    });
    const z = zoneOf(s.design);
    const k = Math.min((z.w * 0.8) / dims.w, (z.h * 0.8) / dims.h);
    add({ type: 'image', href, w: Math.round(dims.w * k), h: Math.round(dims.h * k), color: '#888888', stitch: 'fill', name: file.name });
    toast('Logo ajouté — il sera digitalisé avant production.');
  }

  // ---------- events ----------
  view.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    const el = sel();
    switch (act) {
      case 'add-text':
        add({ type: 'text', text: 'Votre texte', font: 'block', size: 28, color: THREADS[1].hex });
        break;
      case 'add-shape':
        add({ type: 'shape', shape: b.dataset.shape, color: THREADS[2].hex });
        break;
      case 'template': {
        commit();
        const t = TEMPLATES[+b.dataset.i];
        const els = t.build(zoneOf(s.design)).map(normalize);
        s.design.elements.push(...els);
        s.selectedId = els[els.length - 1].id;
        renderAll();
        break;
      }
      case 'select':
        s.selectedId = b.dataset.id;
        renderAll();
        break;
      case 'up':
        move(b.dataset.id, +1);
        break;
      case 'down':
        move(b.dataset.id, -1);
        break;
      case 'garment-color':
        commit();
        s.design.garmentColor = b.dataset.hex;
        renderAll();
        break;
      case 'thread':
        if (!el) break;
        commit();
        el.color = b.dataset.hex;
        renderAll();
        break;
      case 'center': {
        if (!el) break;
        commit();
        const z = zoneOf(s.design);
        el.x = z.x + z.w / 2;
        el.y = z.y + z.h / 2;
        renderAll();
        break;
      }
      case 'duplicate': {
        if (!el) break;
        commit();
        const copy = { ...structuredClone(el), id: uid('el'), x: el.x + 10, y: el.y + 10 };
        s.design.elements.push(copy);
        s.selectedId = copy.id;
        renderAll();
        break;
      }
      case 'delete':
        removeSelected();
        break;
      case 'undo':
        undo();
        break;
      case 'redo':
        redo();
        break;
      case 'save': {
        const saved = store.saveDesign(s.design);
        s.design.id = saved.id;
        s.design.createdAt = saved.createdAt;
        store.saveDraft(s.design);
        toast('Design enregistré.');
        break;
      }
      case 'cart': {
        if (!s.design.elements.length) return toast('Ajoutez au moins un élément avant de commander.', 'error');
        const saved = store.saveDesign(s.design);
        s.design.id = saved.id;
        store.addToCart({ designId: saved.id, snapshot: structuredClone(saved), qty: s.qty, size: 'M' });
        toast('Ajouté au panier.');
        break;
      }
      case 'export-svg':
        download(new Blob([exportSvg(s.design)], { type: 'image/svg+xml' }), `${slug(s.design.name)}.svg`);
        break;
      case 'export-png':
        svgToPng(exportSvg(s.design))
          .then((blob) => download(blob, `${slug(s.design.name)}.png`))
          .catch(() => toast("L'export PNG a échoué.", 'error'));
        break;
      case 'sheet':
        download(new Blob([JSON.stringify(productionSheet(s.design, s.qty), null, 2)], { type: 'application/json' }), `${slug(s.design.name)}-production.json`);
        break;
      case 'new':
        commit();
        s.design = newDesign();
        s.selectedId = null;
        renderAll();
        break;
    }
  });

  view.addEventListener('input', (e) => {
    const t = e.target;
    if (t === nameInput) {
      commit('name');
      s.design.name = t.value || 'Sans titre';
      store.saveDraft(s.design);
      return;
    }
    if (t.dataset.testid === 'qty') {
      s.qty = Math.max(1, Math.min(5000, parseInt(t.value, 10) || 1));
      const cur = t.selectionStart;
      renderQuote();
      const q = $('[data-testid="qty"]');
      q.focus();
      try { q.setSelectionRange(cur, cur); } catch { /* number inputs */ }
      return;
    }
    const prop = t.dataset.prop;
    const el = sel();
    if (!prop || !el) return;
    commit(`prop:${el.id}:${prop}`);
    el[prop] = 'num' in t.dataset ? parseFloat(t.value) : t.value;
    const val = t.closest('label')?.querySelector('.val');
    if (val) val.textContent = prop === 'rotation' ? `${el.rotation}°` : prop === 'scale' ? el.scale.toFixed(2) : String(el[prop]);
    refreshLive();
  });

  view.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.field === 'garment' || t.dataset.field === 'zone') {
      commit();
      s.design[t.dataset.field] = t.value;
      renderAll();
    } else if (t === stitchToggle) {
      renderCanvas();
    } else if (t.dataset.testid === 'upload-image') {
      onUpload(t.files[0]).catch(() => toast("Impossible de lire l'image.", 'error'));
      t.value = '';
    } else if (t.dataset.prop === 'font' || t.dataset.prop === 'stitch' || t.dataset.prop === 'shape') {
      renderProps();
    }
  });

  // Drag to move.
  let drag = null;
  canvas.addEventListener('pointerdown', (e) => {
    const node = e.target.closest('.el');
    if (!node) {
      if (s.selectedId) {
        s.selectedId = null;
        renderAll();
      }
      return;
    }
    const id = node.dataset.id;
    if (id !== s.selectedId) {
      s.selectedId = id;
      renderAll();
    }
    const svg = canvas.querySelector('svg');
    const el = sel();
    const p = toSvg(svg, e);
    drag = { svg, el, ox: p.x - el.x, oy: p.y - el.y, moved: false, id: e.pointerId };
    canvas.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const p = toSvg(drag.svg, e);
    if (!drag.moved) {
      commit();
      drag.moved = true;
    }
    drag.el.x = Math.round(p.x - drag.ox);
    drag.el.y = Math.round(p.y - drag.oy);
    const node = canvas.querySelector(`.el[data-id="${drag.el.id}"]`);
    const tr = `translate(${drag.el.x} ${drag.el.y}) rotate(${drag.el.rotation}) scale(${drag.el.scale})`;
    node?.setAttribute('transform', tr);
    canvas.querySelector('#sel-box')?.setAttribute('transform', tr);
  });
  const endDrag = () => {
    if (drag?.moved) {
      renderWarnings();
      store.saveDraft(s.design);
    }
    drag = null;
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  const onKey = (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key.toLowerCase() === 'z' && !typing) {
      e.preventDefault();
      e.shiftKey ? redo() : undo();
    } else if (mod && e.key.toLowerCase() === 'y' && !typing) {
      e.preventDefault();
      redo();
    } else if (mod && e.key.toLowerCase() === 'd' && sel() && !typing) {
      e.preventDefault();
      view.querySelector('[data-act="duplicate"]')?.click();
    } else if ((e.key === 'Delete' || e.key === 'Backspace') && !typing && sel()) {
      e.preventDefault();
      removeSelected();
    } else if (e.key.startsWith('Arrow') && !typing && sel()) {
      e.preventDefault();
      const step = e.shiftKey ? 10 : 1;
      const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      nudge(...d);
    } else if (e.key === 'Escape' && s.selectedId) {
      s.selectedId = null;
      renderAll();
    }
  };
  document.addEventListener('keydown', onKey);

  renderAll();
  return () => document.removeEventListener('keydown', onKey);
}

function toSvg(svg, e) {
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function labelOf(el) {
  if (el.type === 'text') return (el.text || '').replace(/\n/g, ' ').slice(0, 24) || 'Texte';
  if (el.type === 'image') return el.name || 'Image';
  return `Forme ${el.shape}`;
}

function shapeIcon(k) {
  return `<svg viewBox="-50 -50 100 100" width="22" height="22" aria-hidden="true"><path d="${SHAPES[k]}" fill="currentColor"/></svg>`;
}

const slug = (s) => (s || 'design').toLowerCase().normalize('NFD').replace(/[^\w]+/g, '-').replace(/^-|-$/g, '') || 'design';

export function productionSheet(design, qty) {
  const q = quote(design, qty);
  const garment = GARMENTS[design.garment];
  return {
    design: design.name,
    garment: garment.name,
    garmentColor: GARMENT_COLORS.find((c) => c.hex === design.garmentColor)?.name || design.garmentColor,
    placement: zoneOf(design).label,
    quantity: q.qty,
    totalStitches: q.stitches,
    machineMinutesPerPiece: q.minutes,
    threadSequence: q.colors.map((hex, i) => ({ step: i + 1, ...threadByHex(hex) })),
    elements: design.elements.map((el) => ({
      type: el.type,
      text: el.text,
      shape: el.shape,
      stitch: el.stitch,
      thread: threadByHex(el.color).code,
      stitches: elementStitches(el),
      position: { x: el.x, y: el.y },
      rotation: el.rotation,
      scale: el.scale,
    })),
    generatedAt: new Date().toISOString(),
  };
}
