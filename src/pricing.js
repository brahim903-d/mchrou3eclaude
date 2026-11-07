import { GARMENTS, STITCH_TYPES } from './catalog.js';

// Mockup scale: the 140-unit chest hoop ≈ 10.5 cm, so 1 SVG unit ≈ 0.75 mm.
// Base density ≈ 2 stitches/mm² (satin); fill is ×1.35 → ~1 750 stitches per in².
const MM_PER_UNIT = 0.75;
const STITCHES_PER_MM2 = 2;
const MIN_STITCHES_PER_ELEMENT = 500;

export const PRICING = {
  currency: 'DH',
  perThousandStitches: 6,
  minEmbroidery: 25,
  perColorChange: 3,
  digitizingFee: 150,
  digitizingFreeFrom: 24,
  tiers: [
    { min: 50, discount: 0.3 },
    { min: 12, discount: 0.2 },
    { min: 5, discount: 0.1 },
    { min: 1, discount: 0 },
  ],
  machineStitchesPerMinute: 800,
};

const densityOf = (stitch) => (STITCH_TYPES.find((s) => s.id === stitch) || STITCH_TYPES[0]).density;

export function elementStitches(el) {
  const scale = (el.scale || 1) ** 2;
  const k = MM_PER_UNIT ** 2 * STITCHES_PER_MM2 * densityOf(el.stitch);
  let area;
  if (el.type === 'text') {
    const chars = (el.text || '').replace(/\s/g, '').length;
    if (!chars) return 0;
    area = chars * el.size * 0.6 * el.size * 0.4;
  } else if (el.type === 'shape') {
    area = 80 * 80 * 0.65;
  } else if (el.type === 'image') {
    area = el.w * el.h * 0.6;
  } else {
    return 0;
  }
  if (el.stitch === 'run') {
    // Outline stitches scale with perimeter rather than area.
    const side = Math.sqrt(area);
    return Math.max(MIN_STITCHES_PER_ELEMENT, Math.round(side * 4 * MM_PER_UNIT * 2.5 * Math.sqrt(scale)));
  }
  return Math.max(MIN_STITCHES_PER_ELEMENT, Math.round(area * scale * k));
}

export function designStats(design) {
  const stitches = design.elements.reduce((sum, el) => sum + elementStitches(el), 0);
  const colors = [...new Set(design.elements.map((el) => el.color))];
  const minutes = Math.ceil(stitches / PRICING.machineStitchesPerMinute);
  return { stitches, colors, colorChanges: Math.max(0, colors.length - 1), minutes };
}

export function tierFor(qty) {
  return PRICING.tiers.find((t) => qty >= t.min) || PRICING.tiers[PRICING.tiers.length - 1];
}

export function quote(design, qty = 1) {
  qty = Math.max(1, Math.floor(qty) || 1);
  const stats = designStats(design);
  const garment = GARMENTS[design.garment] || GARMENTS.tshirt;
  const embroideryRaw = stats.stitches
    ? Math.max(PRICING.minEmbroidery, (stats.stitches / 1000) * PRICING.perThousandStitches) +
      stats.colorChanges * PRICING.perColorChange
    : 0;
  const tier = tierFor(qty);
  const embroidery = round2(embroideryRaw * (1 - tier.discount));
  const unit = round2(garment.base + embroidery);
  const digitizing = stats.stitches && qty < PRICING.digitizingFreeFrom ? PRICING.digitizingFee : 0;
  const total = round2(unit * qty + digitizing);
  return { ...stats, qty, garmentBase: garment.base, embroidery, discount: tier.discount, unit, digitizing, total };
}

export const money = (n) => `${n.toFixed(2)} ${PRICING.currency}`;

function round2(n) {
  return Math.round(n * 100) / 100;
}
