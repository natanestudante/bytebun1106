const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

const cardapio = [
  { categoria: "pao", nome: "Frances", preco: 1.5 },
  { categoria: "pao", nome: "Integral", preco: 2.0 },
  { categoria: "pao", nome: "Australiano", preco: 3.0 },
  { categoria: "pao", nome: "Ciabatta", preco: 2.5 },
  { categoria: "recheio", nome: "Frango", preco: 5.0 },
  { categoria: "recheio", nome: "Carne", preco: 6.5 },
  { categoria: "recheio", nome: "Peixe", preco: 6.0 },
  { categoria: "recheio", nome: "Vegetariano", preco: 5.5 },
  { categoria: "molho", nome: "Maionese", preco: 0.5 },
  { categoria: "molho", nome: "Mostarda", preco: 0.5 },
  { categoria: "molho", nome: "Especial", preco: 1.5 },
  { categoria: "molho", nome: "Chipotle", preco: 1.75 }
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.get("/cardapio", (req, res) => {
  res.json(cardapio);
});

app.get("/cardapio/:categoria", (req, res) => {
  res.json(cardapio.filter(i => i.categoria === req.params.categoria));
});

app.post("/pedido", (req, res) => {
  const { pao, recheio, molho } = req.body;
  let total = 0;
  const p = cardapio.find(i => i.nome === pao);
  const r = cardapio.find(i => i.nome === recheio);
  const m = cardapio.find(i => i.nome === molho);
  if (p) total += p.preco;
  if (r) total += r.preco;
  if (m) total += m.preco;
  res.json({ pedido: { pao, recheio, molho }, total: Number(total.toFixed(2)) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Rodando na " + PORT));