const express = require("express");
const app = express();
const port = 5002;

app.use(express.json());

// rutas
app.use("/clients", require("./routes/clients"));
app.use("/products", require("./routes/products"));
app.use("/sales", require("./routes/sales"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
