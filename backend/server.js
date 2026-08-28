const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const cardapio = [
  {categoria: "pao", nome:"Frances", preco: 1.5},
  {categoria: "pao", nome:"Integral", preco: 2.0},
  {categoria: "pao", nome:"Australiano", preco: 3.0},
  {categoria: "pao", nome:"Ciabatta", preco: 2.5},
  {categoria: "recheio", nome:"Frango", preco: 5.0},
  {categoria: "recheio", nome:"Carne", preco: 6.5},
  {categoria: "recheio", nome:"Peixe", preco: 6.0},
  {categoria: "molho", nome:"Maionese", preco: 0.5},
  {categoria: "molho", nome:"Mostarda", preco: 0.5},
  {categoria: "molho", nome:"Especial", preco: 1.5},
  {categoria: "molho", nome:"Chipotle", preco: 1.75},
]

// ----- exercicio 01 -----
app.get("/", (req, res) => {
  res.send("Byte e Bun API no ar!")
})

// ----- exercicio 02 -----
app.get("/cardapio", (req, res) => {
  res.json(cardapio)
})

// ----- exercicio 03 -----
app.get("/cardapio/:categoria", (req, res) => {
  res.json(cardapio.filter(i => i.categoria === req.params.categoria))
})

// ----- exercicio 04 -----
app.post("/pedido", (req, res) => {
  const { pao, recheio, molho } = req.body;
  let total = 0;
  const a = cardapio.find(i => i.nome === pao);
  const b = cardapio.find(i => i.nome === recheio);
  const c = cardapio.find(i => i.nome === molho);
  if(a) total+=a.preco; if(b) total+=b.preco; if(c) total+=c.preco;
  res.json({ pedido: { pao, recheio, molho }, total: total.toFixed(2) });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("rodando na " + PORT));