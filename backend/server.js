const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "frontend")));

const cardapio = {
  pao: ["Brioche", "Australiano", "Pão de Batata", "Integral"],
  recheio: ["Blend Bovino 180g", "Frango Crocante", "Costela", "Veggie"],
  molho: ["Maionese da Casa", "Barbecue", "Alho", "Cheddar"]
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.get("/cardapio", (req, res) => {
  res.json(cardapio);
});

app.get("/cardapio/:categoria", (req, res) => {
  const cat = req.params.categoria.toLowerCase();
  res.json(cardapio[cat] || []);
});

app.post("/pedido", (req, res) => {
  console.log("Novo pedido:", req.body);
  res.json({ mensagem: "Pedido recebido!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Rodando na porta " + PORT));