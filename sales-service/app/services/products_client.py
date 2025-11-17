import requests

BASE = "http://products-service:5002"

def get_product(product_id):
    try:
        r = requests.get(f"{BASE}/products/{product_id}", timeout=5)
        if r.status_code != 200:
            return None
        return r.json()
    except requests.RequestException:
        return None

def decrease_stock(product_id, quantity):
    try:
        r = requests.patch(f"{BASE}/products/{product_id}/stock", json={"quantity": quantity}, timeout=5)
        return r.status_code == 200
    except requests.RequestException:
        return False
