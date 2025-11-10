const repo = require("../repositories/productsRepo");

const create = (data) => {
  if (!data.name || data.price == null || data.stock == null) {
    throw new Error("name, price y stock son obligatorios");
  }
  if (data.price < 0 || data.stock < 0) throw new Error("price y stock deben ser >= 0");
  return repo.add({ name: data.name, price: data.price, stock: data.stock });
};

const list = () => repo.getAll();

const getById = (id) => repo.getById(id);

const update = (id, data) => {
  // permitir actualizar price y/o stock y/o name
  if (data.price !== undefined && data.price < 0) throw new Error("price debe ser >= 0");
  if (data.stock !== undefined && data.stock < 0) throw new Error("stock debe ser >= 0");
  return repo.update(id, data);
};

module.exports = { create, list, getById, update };
