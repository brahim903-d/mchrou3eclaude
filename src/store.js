// Persistence layer (localStorage, failure-tolerant).

const KEYS = { designs: 'stitchly.designs', cart: 'stitchly.cart', orders: 'stitchly.orders', draft: 'stitchly.draft' };

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export const uid = (prefix) => `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const listeners = new Set();
export const onChange = (fn) => listeners.add(fn);
const emit = () => listeners.forEach((fn) => fn());

export const store = {
  designs: () => read(KEYS.designs, []),
  design: (id) => store.designs().find((d) => d.id === id),
  saveDesign(design) {
    const all = store.designs();
    const now = new Date().toISOString();
    const copy = { ...structuredClone(design), updatedAt: now };
    if (!copy.id) copy.id = uid('dsg');
    if (!copy.createdAt) copy.createdAt = now;
    const i = all.findIndex((d) => d.id === copy.id);
    if (i >= 0) all[i] = copy;
    else all.unshift(copy);
    write(KEYS.designs, all);
    emit();
    return copy;
  },
  deleteDesign(id) {
    write(KEYS.designs, store.designs().filter((d) => d.id !== id));
    emit();
  },

  draft: () => read(KEYS.draft, null),
  saveDraft: (design) => write(KEYS.draft, design),

  cart: () => read(KEYS.cart, []),
  addToCart(item) {
    const cart = store.cart();
    cart.push({ ...item, id: uid('itm') });
    write(KEYS.cart, cart);
    emit();
  },
  updateCartItem(id, patch) {
    write(KEYS.cart, store.cart().map((i) => (i.id === id ? { ...i, ...patch } : i)));
    emit();
  },
  removeCartItem(id) {
    write(KEYS.cart, store.cart().filter((i) => i.id !== id));
    emit();
  },
  clearCart() {
    write(KEYS.cart, []);
    emit();
  },

  orders: () => read(KEYS.orders, []),
  placeOrder(order) {
    const orders = store.orders();
    const full = { ...order, id: `CMD-${String(orders.length + 1001)}`, status: 'reçue', createdAt: new Date().toISOString() };
    orders.unshift(full);
    write(KEYS.orders, orders);
    emit();
    return full;
  },
  setOrderStatus(id, status) {
    write(KEYS.orders, store.orders().map((o) => (o.id === id ? { ...o, status } : o)));
    emit();
  },
};
