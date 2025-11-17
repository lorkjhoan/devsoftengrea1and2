from fastapi import FastAPI, HTTPException
from app.repositories.products_repo import ProductsRepo

app = FastAPI(title="Products Service")
repo = ProductsRepo()

@app.post("/products")
def create_product(data: dict):
    try:
        p = repo.add(data)
        return p
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/products")
def list_products():
    return repo.get_all()

@app.get("/products/{id}")
def get_product(id: int):
    p = repo.get_by_id(id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return p

@app.put("/products/{id}")
def update_product(id: int, data: dict):
    updated = repo.update(id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated

@app.patch("/products/{id}/stock")
def update_stock(id: int, request: dict):
    qty = request.get("quantity")
    if qty is None or not isinstance(qty, int) or qty <= 0:
        raise HTTPException(status_code=400, detail="quantity must be a positive integer")
    updated = repo.decrease_stock(id, qty)
    if not updated:
        raise HTTPException(status_code=400, detail="Product not found or insufficient stock")
    return updated
