let sales = [];
let nextId = 1;

const add = (data) => {
  const s = {
    id: nextId++,
    client_id: data.client_id,
    total: data.total,
    details: data.details,
    created_at: new Date().toISOString()
  };
  sales.push(s);
  return s;
};

// listado resumido para GET /sales
const getAllSummary = () => {
  // Para cada venta mostrar id, client (de repo clients) y total + date simple
  const clientsRepo = require("./clientsRepo");
  return sales.map(s => {
    const client = clientsRepo.getById(s.client_id);
    const date = s.created_at.split("T")[0];
    return { id: s.id, client: client ? client.name : null, total: s.total, date };
  });
};

const getByIdDetail = (id) => {
  const s = sales.find(x => x.id === id);
  if (!s) return null;
  // enriquecer productos con nombre
  const productsRepo = require("./productsRepo");
  const client = require("./clientsRepo").getById(s.client_id);
  const products = s.details.map(d => {
    const prod = productsRepo.getById(d.product_id);
    return { name: prod ? prod.name : null, quantity: d.quantity };
  });
  return { id: s.id, client: client ? client.name : null, products, total: s.total, created_at: s.created_at };
};

module.exports = { add, getAllSummary, getByIdDetail };
