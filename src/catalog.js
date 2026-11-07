// Garments, thread palette and fonts offered in the Studio.

export const GARMENTS = {
  tshirt: {
    name: 'T-shirt',
    base: 60,
    // Embroidery zone (hoop) in the 400x460 mockup coordinate space.
    zones: {
      chest: { label: 'Poitrine (centre)', x: 130, y: 120, w: 140, h: 140 },
      left: { label: 'Cœur (gauche)', x: 215, y: 120, w: 70, h: 70 },
      back: { label: 'Dos', x: 110, y: 110, w: 180, h: 200 },
    },
    path: 'M120 40 L160 25 Q200 55 240 25 L280 40 L360 95 L325 155 L290 135 L290 430 L110 430 L110 135 L75 155 L40 95 Z',
  },
  hoodie: {
    name: 'Hoodie',
    base: 160,
    zones: {
      chest: { label: 'Poitrine (centre)', x: 135, y: 140, w: 130, h: 110 },
      left: { label: 'Cœur (gauche)', x: 215, y: 135, w: 65, h: 65 },
      back: { label: 'Dos', x: 105, y: 110, w: 190, h: 210 },
    },
    path: 'M125 45 Q200 -5 275 45 L365 110 L330 230 L295 210 L295 435 L105 435 L105 210 L70 230 L35 110 Z',
  },
  cap: {
    name: 'Casquette',
    base: 70,
    zones: {
      front: { label: 'Face avant', x: 140, y: 150, w: 120, h: 70 },
      side: { label: 'Côté', x: 260, y: 190, w: 60, h: 40 },
    },
    path: 'M80 260 Q80 110 200 105 Q320 110 320 260 Z M60 260 L360 260 Q380 300 330 305 L60 285 Z',
  },
  tote: {
    name: 'Tote bag',
    base: 45,
    zones: {
      front: { label: 'Face avant', x: 110, y: 170, w: 180, h: 180 },
    },
    path: 'M90 130 L310 130 L330 440 L70 440 Z M150 130 Q150 40 200 40 Q250 40 250 130 L235 130 Q235 58 200 58 Q165 58 165 130 Z',
  },
};

export const GARMENT_COLORS = [
  { name: 'Blanc', hex: '#f8f8f6' },
  { name: 'Noir', hex: '#1f1f22' },
  { name: 'Marine', hex: '#1e2a4a' },
  { name: 'Gris chiné', hex: '#9ca3af' },
  { name: 'Bordeaux', hex: '#6b1d2a' },
  { name: 'Sable', hex: '#d8c7a3' },
  { name: 'Vert forêt', hex: '#24452f' },
];

// Polyester embroidery thread palette (subset).
export const THREADS = [
  { code: 'T1001', name: 'Blanc', hex: '#ffffff' },
  { code: 'T1002', name: 'Noir', hex: '#111111' },
  { code: 'T1147', name: 'Rouge', hex: '#c8102e' },
  { code: 'T1187', name: 'Orange', hex: '#f26c21' },
  { code: 'T1023', name: 'Jaune', hex: '#ffcd00' },
  { code: 'T1034', name: 'Or', hex: '#c5a552' },
  { code: 'T1252', name: 'Vert', hex: '#00843d' },
  { code: 'T1076', name: 'Turquoise', hex: '#00a3ad' },
  { code: 'T1176', name: 'Bleu royal', hex: '#0033a0' },
  { code: 'T1011', name: 'Bleu ciel', hex: '#7bafd4' },
  { code: 'T1032', name: 'Violet', hex: '#5f259f' },
  { code: 'T1121', name: 'Rose', hex: '#ef95cf' },
  { code: 'T1057', name: 'Marron', hex: '#6e4c1e' },
  { code: 'T1011G', name: 'Gris', hex: '#8a8d8f' },
  { code: 'T1300', name: 'Argent', hex: '#c0c4c8' },
  { code: 'T1080', name: 'Beige', hex: '#e3c9a1' },
];

export const FONTS = [
  { id: 'block', label: 'Block', css: '"Arial Black", "Helvetica Neue", Arial, sans-serif', weight: 900 },
  { id: 'serif', label: 'Varsity Serif', css: 'Georgia, "Times New Roman", serif', weight: 700 },
  { id: 'script', label: 'Script', css: '"Brush Script MT", "Segoe Script", cursive', weight: 400 },
  { id: 'mono', label: 'Typewriter', css: '"Courier New", monospace', weight: 700 },
  { id: 'rounded', label: 'Rounded', css: '"Trebuchet MS", Verdana, sans-serif', weight: 700 },
];

export const STITCH_TYPES = [
  { id: 'satin', label: 'Satin', density: 1.0 },
  { id: 'fill', label: 'Remplissage (tatami)', density: 1.35 },
  { id: 'run', label: 'Contour (point avant)', density: 0.25 },
];

export const SHAPES = {
  rect: 'M-40 -30 H40 V30 H-40 Z',
  circle: 'M-40 0 A40 40 0 1 0 40 0 A40 40 0 1 0 -40 0 Z',
  star: 'M0 -42 L12 -13 L42 -13 L18 6 L27 38 L0 19 L-27 38 L-18 6 L-42 -13 L-12 -13 Z',
  heart: 'M0 38 C-55 0 -40 -45 0 -20 C40 -45 55 0 0 38 Z',
  badge: 'M0 -44 L38 -22 L38 22 L0 44 L-38 22 L-38 -22 Z',
};

export const threadByHex = (hex) => THREADS.find((t) => t.hex === hex) || { code: '—', name: hex, hex };
