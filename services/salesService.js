const clientsRepo = require("../repositories/clientsRepo");
const productsRepo = require("../repositories/productsRepo");
const salesRepo = require("../repositories/salesRepo");

const create = (data) => {
  // validaciones básicas
  if (!data.client_id) throw new Error("client_id es requerido");
  if (!Array.isArray(data.products) || data.products.length === 0) {
    throw new Error("products debe ser un arreglo no vacío");
  }

  const client = clientsRepo.getById(data.client_id);
  if (!client) throw new Error("Cliente no encontrado");

  // construir detalles, validar stock y calcular subTotales
  const details = [];
  let total = 0;

  // Recolectar product changes first to ensure transactional-like behavior in memory
  for (const p of data.products) {
    const prod = productsRepo.getById(p.product_id);
    if (!prod) throw new Error(`Producto id ${p.product_id} no encontrado`);
    if (!Number.isInteger(p.quantity) || p.quantity <= 0) throw new Error(`Quantity inválida para product_id ${p.product_id}`);
    if (prod.stock < p.quantity) throw new Error(`Stock insuficiente para product_id ${p.product_id}`);
    const subtotal = prod.price * p.quantity;
    details.push({ product_id: p.product_id, quantity: p.quantity, subtotal });
    total += subtotal;
  }

  // si todo ok, actualizar stocks (efectuar cambios)
  for (const d of details) {
    productsRepo.decreaseStock(d.product_id, d.quantity);
  }

  // crear venta
  const sale = salesRepo.add({
    client_id: data.client_id,
    total,
    details
  });

  return sale;
};

const list = () => salesRepo.getAllSummary(); // resumen para list
const getById = (id) => salesRepo.getByIdDetail(id); // detalle completo

module.exports = { create, list, getById };
