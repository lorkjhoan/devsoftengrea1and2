const repo = require("../repositories/clientsRepo");

const create = (data) => {
  if (!data.name || !data.email) throw new Error("name y email son obligatorios");
  return repo.add({ name: data.name, email: data.email, phone: data.phone });
};

const list = () => repo.getAll();

const getById = (id) => repo.getById(id);

const update = (id, data) => {
  // no permitimos cambiar email vacio ni name vacío
  if (data.name !== undefined && !data.name) throw new Error("name no puede ser vacío");
  return repo.update(id, data);
};

module.exports = { create, list, getById, update };
