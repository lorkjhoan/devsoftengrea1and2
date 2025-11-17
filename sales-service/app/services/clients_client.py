import requests

BASE = "http://clients-service:5001"

def get_client(client_id):
    try:
        r = requests.get(f"{BASE}/clients/{client_id}", timeout=5)
        if r.status_code != 200:
            return None
        return r.json()
    except requests.RequestException:
        return None
