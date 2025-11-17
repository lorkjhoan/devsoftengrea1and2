class SalesRepo:
    def __init__(self):
        self.sales = []
        self.next_id = 1

    def add(self, data):
        sale = {
            "id": self.next_id,
            "client_id": data["client_id"],
            "products": data["products"],  # lista de {product_id, quantity, subtotal}
            "total": data["total"],
            "created_at": data.get("created_at")
        }
        self.sales.append(sale)
        self.next_id += 1
        return sale

    def get_all(self):
        return self.sales

    def get_by_id(self, id):
        return next((s for s in self.sales if s["id"] == id), None)
