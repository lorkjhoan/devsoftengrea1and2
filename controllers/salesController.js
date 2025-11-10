const service = require("../services/salesService");

const createSale = (req, res) => {
  try {
    const sale = service.create(req.body);
    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listSales = (req, res) => {
  res.json(service.list());
};

const getSale = (req, res) => {
  const id = parseInt(req.params.id);
  const s = service.getById(id);
  if (!s) return res.status(404).json({ error: "Venta no encontrada." });
  res.json(s);
};

module.exports = { createSale, listSales, getSale };
