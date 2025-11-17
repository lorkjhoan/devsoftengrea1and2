class ClientsRepo:
    def __init__(self):
        self.clients = []
        self.next_id = 1

    def add(self, data):
        client = {
            "id": self.next_id,
            "name": data.get("name"),
            "email": data.get("email"),
            "phone": data.get("phone")
        }
        self.clients.append(client)
        self.next_id += 1
        return client

    def get_all(self):
        return self.clients

    def get_by_id(self, id):
        return next((c for c in self.clients if c["id"] == id), None)

    def update(self, id, data):
        client = self.get_by_id(id)
        if not client:
            return None
        if "name" in data: client["name"] = data["name"]
        if "email" in data: client["email"] = data["email"]
        if "phone" in data: client["phone"] = data["phone"]
        return client
