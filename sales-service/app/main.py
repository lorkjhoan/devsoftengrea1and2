from fastapi import FastAPI, HTTPException
from app.repositories.sales_repo import SalesRepo
from app.services.clients_client import get_client
from app.services.products_client import get_product, decrease_stock
from datetime import datetime

app = FastAPI(title="Sales Service")
repo = SalesRepo()

@app.post("/sales")
def create_sale(data: dict):
    client_id = data.get("client_id")
    items = data.get("products")
    if not client_id or not isinstance(items, list) or len(items) == 0:
        raise HTTPException(status_code=400, detail="client_id and non-empty products array required")

    # validar cliente
    client = get_client(client_id)
    if not client:
        raise HTTPException(status_code=400, detail="Client not found")

    # verificar productos y stock sin modificar aún
    details = []
    total = 0
    for item in items:
        pid = item.get("product_id")
        qty = item.get("quantity")
        if pid is None or qty is None:
            raise HTTPException(status_code=400, detail="product_id and quantity required for each item")
        if not isinstance(qty, int) or qty <= 0:
            raise HTTPException(status_code=400, detail="quantity must be a positive integer")
        prod = get_product(pid)
        if not prod:
            raise HTTPException(status_code=400, detail=f"Product {pid} not found")
        if prod.get("stock", 0) < qty:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for product {pid}")
        subtotal = prod["price"] * qty
        details.append({"product_id": pid, "quantity": qty, "subtotal": subtotal})
        total += subtotal

    # todos los checks ok -> descontar stock (llamadas HTTP)
    for d in details:
        ok = decrease_stock(d["product_id"], d["quantity"])
        if not ok:
            # Si falla la actualización del stock, devolvemos error (no se implementa rollback distribuido)
            raise HTTPException(status_code=500, detail=f"Failed to update stock for product {d['product_id']}")

    sale = repo.add({
        "client_id": client_id,
        "products": details,
        "total": total,
        "created_at": datetime.utcnow().isoformat()
    })
    return sale

@app.get("/sales")
def list_sales():
    return repo.get_all()

@app.get("/sales/{id}")
def get_sale(id: int):
    s = repo.get_by_id(id)
    if not s:
        raise HTTPException(status_code=404, detail="Sale not found")
    return s
