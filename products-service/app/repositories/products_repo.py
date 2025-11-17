class ProductsRepo:
    def __init__(self):
        self.products = []
        self.next_id = 1

    def add(self, data):
        if data.get("price") is None or data.get("stock") is None:
            raise ValueError("price and stock are required")
        product = {
            "id": self.next_id,
            "name": data.get("name"),
            "price": data.get("price"),
            "stock": data.get("stock")
        }
        self.products.append(product)
        self.next_id += 1
        return product

    def get_all(self):
        return self.products

    def get_by_id(self, id):
        return next((p for p in self.products if p["id"] == id), None)

    def update(self, id, data):
        p = self.get_by_id(id)
        if not p:
            return None
        if "name" in data: p["name"] = data["name"]
        if "price" in data: p["price"] = data["price"]
        if "stock" in data: p["stock"] = data["stock"]
        return p

    def decrease_stock(self, id, quantity):
        p = self.get_by_id(id)
        if not p:
            return None
        if p["stock"] < quantity:
            return None
        p["stock"] -= quantity
        return p
