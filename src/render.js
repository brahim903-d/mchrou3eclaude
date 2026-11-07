import { GARMENTS, FONTS, SHAPES } from './catalog.js';

export const VIEW = { w: 400, h: 460 };

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const fontOf = (id) => FONTS.find((f) => f.id === id) || FONTS[0];

export function zoneOf(design) {
  const g = GARMENTS[design.garment] || GARMENTS.tshirt;
  return g.zones[design.zone] || Object.values(g.zones)[0];
}

const DEFS = `
<defs>
  <pattern id="st-satin" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="3" height="3" fill="rgba(255,255,255,0)"/>
    <line x1="0" y1="0" x2="0" y2="3" stroke="rgba(255,255,255,.28)" stroke-width="1"/>
    <line x1="1.5" y1="0" x2="1.5" y2="3" stroke="rgba(0,0,0,.18)" stroke-width=".8"/>
  </pattern>
  <pattern id="st-fill" width="6" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
    <line x1="0" y1="1" x2="4" y2="1" stroke="rgba(255,255,255,.25)" stroke-width=".9"/>
    <line x1="2" y1="3" x2="6" y2="3" stroke="rgba(0,0,0,.2)" stroke-width=".9"/>
  </pattern>
  <filter id="st-relief" x="-10%" y="-10%" width="120%" height="120%">
    <feGaussianBlur in="SourceAlpha" stdDeviation=".8" result="b"/>
    <feOffset dx=".8" dy="1.2" in="b" result="o"/>
    <feComponentTransfer in="o" result="s"><feFuncA type="linear" slope=".45"/></feComponentTransfer>
    <feMerge><feMergeNode in="s"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="fabric" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0" result="g"/>
    <feComponentTransfer in="g" result="g2"><feFuncA type="linear" slope=".08"/></feComponentTransfer>
    <feComposite in="g2" in2="SourceGraphic" operator="in" result="t"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="t"/></feMerge>
  </filter>
</defs>`;

function geometry(el) {
  if (el.type === 'text') {
    const f = fontOf(el.font);
    const lines = String(el.text || ' ').split('\n');
    const lh = el.size * 1.1;
    const start = (-(lines.length - 1) * lh) / 2;
    const tspans = lines
      .map((l, i) => `<tspan x="0" y="${(start + i * lh).toFixed(1)}">${esc(l || ' ')}</tspan>`)
      .join('');
    return (attrs) =>
      `<text ${attrs} text-anchor="middle" dominant-baseline="central" font-family="${esc(f.css)}" font-weight="${f.weight}" font-size="${el.size}" letter-spacing="${el.spacing || 0}">${tspans}</text>`;
  }
  if (el.type === 'shape') {
    const d = SHAPES[el.shape] || SHAPES.rect;
    return (attrs) => `<path ${attrs} d="${d}"/>`;
  }
  if (el.type === 'image') {
    return (attrs, isBase) =>
      isBase
        ? `<image href="${esc(el.href)}" x="${-el.w / 2}" y="${-el.h / 2}" width="${el.w}" height="${el.h}" preserveAspectRatio="xMidYMid meet"/>`
        : `<rect ${attrs} x="${-el.w / 2}" y="${-el.h / 2}" width="${el.w}" height="${el.h}"/>`;
  }
  return () => '';
}

export function renderElement(el, { stitchLook = true } = {}) {
  const g = geometry(el);
  const tr = `translate(${el.x} ${el.y}) rotate(${el.rotation || 0}) scale(${el.scale || 1})`;
  let body;
  if (el.type === 'image') {
    body = g('', true) + (stitchLook ? g('fill="url(#st-fill)" opacity=".6"') : '');
  } else if (el.stitch === 'run') {
    body = g(`fill="none" stroke="${el.color}" stroke-width="1.6" stroke-dasharray="3 1.5" stroke-linejoin="round"`);
  } else {
    const pat = el.stitch === 'fill' ? 'st-fill' : 'st-satin';
    body = g(`fill="${el.color}"`) + (stitchLook ? g(`fill="url(#${pat})"`) : '');
  }
  return `<g class="el" data-id="${el.id}" transform="${tr}" ${stitchLook ? 'filter="url(#st-relief)"' : ''}>${body}</g>`;
}

export function renderDesign(design, { editor = false, selectedId = null, stitchLook = true } = {}) {
  const garment = GARMENTS[design.garment] || GARMENTS.tshirt;
  const zone = zoneOf(design);
  const els = design.elements.map((el) => renderElement(el, { stitchLook })).join('');
  const hoop = editor
    ? `<rect class="hoop" x="${zone.x}" y="${zone.y}" width="${zone.w}" height="${zone.h}" rx="6" fill="none" stroke="#c2410c" stroke-width="1.2" stroke-dasharray="5 4" pointer-events="none"/>`
    : '';
  const selected = editor && selectedId ? `<g id="sel-box" pointer-events="none"></g>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW.w} ${VIEW.h}" class="design-svg" role="img" aria-label="${esc(design.name || 'Design')}">
${DEFS}
<rect width="${VIEW.w}" height="${VIEW.h}" fill="${editor ? 'transparent' : '#f4f1ec'}"/>
<path d="${garment.path}" fill="${design.garmentColor}" stroke="rgba(0,0,0,.25)" stroke-width="1.5" filter="url(#fabric)" fill-rule="evenodd"/>
${hoop}
<g class="layer">${els}</g>
${selected}
</svg>`;
}

// Standalone SVG file (no editor chrome) for download / production.
export function exportSvg(design) {
  return renderDesign(design, { editor: false });
}

export function svgToPng(svgText, width = 1200) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgText], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = width;
      c.height = Math.round((width * VIEW.h) / VIEW.w);
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob((b) => (b ? resolve(b) : reject(new Error('PNG export failed'))), 'image/png');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('SVG load failed'));
    };
    img.src = url;
  });
}

export function download(blob, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
