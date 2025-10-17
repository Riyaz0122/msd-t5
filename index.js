const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
let products = [
  { id: 1, name: "Laptop", price: 60000 },
  { id: 2, name: "Phone", price: 30000 },
  { id: 3, name: "Headphones", price: 2000 }
];
let orders = [];
app.get("/products", (req, res) => {
  res.json(products);
});
app.post("/orders", (req, res) => {
  const { customerName, productId, quantity } = req.body;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const order = {
    id: orders.length + 1,
    customerName,
    product,
    quantity,
    status: "Pending"
  };
  orders.push(order);
  res.status(201).json(order);
});
app.get("/orders", (req, res) => {
  res.json(orders);
});
app.put("/orders/:id", (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: "Order not found" });
  order.status = req.body.status || order.status;
  res.json({ message: "Order status updated", order });
});
app.get("/orders/:id", (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});
app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
