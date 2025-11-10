let clients = [];
let nextId = 1;

const add = (data) => {
  const client = {
    id: nextId++,
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    created_at: new Date().toISOString()
  };
  clients.push(client);
  return client;
};

const getAll = () => clients.map(c => ({ id: c.id, name: c.name, email: c.email }));

const getById = (id) => clients.find(c => c.id === id) || null;

const update = (id, data) => {
  const c = clients.find(x => x.id === id);
  if (!c) return null;
  if (data.name !== undefined) c.name = data.name;
  if (data.email !== undefined) c.email = data.email;
  if (data.phone !== undefined) c.phone = data.phone;
  return c;
};

module.exports = { add, getAll, getById, update };
