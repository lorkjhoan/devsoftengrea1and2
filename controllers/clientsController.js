const service = require("../services/clientsService");

const createClient = (req, res) => {
  try {
    const client = service.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listClients = (req, res) => {
  res.json(service.list());
};

const getClient = (req, res) => {
  const id = parseInt(req.params.id);
  const client = service.getById(id);
  if (!client) return res.status(404).json({ error: "Cliente no encontrado." });
  res.json(client);
};

const updateClient = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updated = service.update(id, req.body);
    if (!updated) return res.status(404).json({ error: "Cliente no encontrado." });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createClient, listClients, getClient, updateClient };
