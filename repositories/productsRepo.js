let products = [];
let nextId = 1;

const add = (data) => {
  const p = {
    id: nextId++,
    name: data.name,
    price: data.price,
    stock: data.stock
  };
  products.push(p);
  return p;
};

const getAll = () => products.map(p => ({ id: p.id, name: p.name, price: p.price, stock: p.stock }));

const getById = (id) => products.find(p => p.id === id) || null;

const update = (id, data) => {
  const p = products.find(x => x.id === id);
  if (!p) return null;
  if (data.name !== undefined) p.name = data.name;
  if (data.price !== undefined) p.price = data.price;
  if (data.stock !== undefined) p.stock = data.stock;
  return p;
};

const decreaseStock = (id, qty) => {
  const p = products.find(x => x.id === id);
  if (!p) return false;
  p.stock -= qty;
  return true;
};

module.exports = { add, getAll, getById, update, decreaseStock };
