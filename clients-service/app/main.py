from fastapi import FastAPI, HTTPException
from app.repositories.clients_repo import ClientsRepo

app = FastAPI(title="Clients Service")
repo = ClientsRepo()

@app.post("/clients")
def create_client(data: dict):
    if not data.get("name") or not data.get("email"):
        raise HTTPException(status_code=400, detail="name and email are required")
    client = repo.add(data)
    return client

@app.get("/clients")
def list_clients():
    return repo.get_all()

@app.get("/clients/{id}")
def get_client(id: int):
    client = repo.get_by_id(id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

@app.put("/clients/{id}")
def update_client(id: int, data: dict):
    updated = repo.update(id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Client not found")
    return updated
