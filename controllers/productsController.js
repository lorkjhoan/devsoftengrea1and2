const service = require("../services/productsService");

const createProduct = (req, res) => {
  try {
    const product = service.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listProducts = (req, res) => {
  res.json(service.list());
};

const getProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const p = service.getById(id);
  if (!p) return res.status(404).json({ error: "Producto no encontrado." });
  res.json(p);
};

const updateProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updated = service.update(id, req.body);
    if (!updated) return res.status(404).json({ error: "Producto no encontrado." });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createProduct, listProducts, getProduct, updateProduct };
