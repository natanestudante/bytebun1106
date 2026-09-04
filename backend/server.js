const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

// serve o frontend - corrigido pra não dar Cannot GET /
app.use(express.static(path.join(__dirname, "..", "frontend")));

const cardapio = [
  {categoria: "pao", nome:"Frances", preco: 1.5},
  {categoria: "pao", nome:"Integral", preco: 2.0},
  {categoria: "pao", nome:"Australiano", preco: 3.0},
  {categoria: "pao", nome:"Ciabatta", preco: 2.5},
  {categoria: "recheio", nome:"Frango", preco: 5.0},
  {categoria: "recheio", nome:"Carne", preco: 6.5},
  {categoria: "recheio", nome:"Peixe", preco: 6.0},
  {categoria: "recheio", nome:"Vegano", preco: 6.5},
  {categoria: "molho", nome:"Maionese", preco: 0.5},
  {categoria: "molho", nome:"Barbecue", preco: 0.5},
  {categoria: "molho", nome:"Ketchup", preco: 0.5},
  {categoria: "molho", nome:"Especial", preco: 1.75}
]

// ----- exercicio 01 -----
app.get("/", (req, res) => {
  res.send("Byte e Bun API no ar!");
})

// ----- exercicio 02 -----
app.get("/cardapio", (req, res) => {
  res.json(cardapio);
})

app.get("/cardapio/:categoria", (req, res) => {
  const cat = req.params.categoria;
  const filtrado = cardapio.filter(item => item.categoria === cat);
  res.json(filtrado);
})

app.get("/site", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Rodando na porta " + PORT);
});

