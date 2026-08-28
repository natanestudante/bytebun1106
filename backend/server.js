const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// CORRIGIDO: frontend está fora do backend
app.use(express.static(path.join(__dirname, "..", "frontend")));

const cardapio = [
  { id: 1, nome: "X-Burguer", preco: 20, categoria: "lanche" },
  { id: 2, nome: "X-Salada", preco: 25, categoria: "lanche" },
  { id: 3, nome: "Batata P", preco: 12, categoria: "porcao" },
  { id: 4, nome: "Refrigerante", preco: 6, categoria: "bebida" }
];

// ROTA PRINCIPAL - ISSO TIRA O Cannot GET /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.get("/api", (req, res) => {
  res.send("API Byte e Bun ok");
});

app.get("/cardapio", (req, res) => {
  res.json(cardapio);
});

app.get("/cardapio/:categoria", (req, res) => {
  const cat = req.params.categoria.toLowerCase();
  const filtrado = cardapio.filter(p => p.categoria === cat);
  res.json(filtrado);
});

app.post("/pedido", (req, res) => {
  const { nome, telefone, itens, total } = req.body;
  if (!nome || !telefone) {
    return res.status(400).json({ erro: "Nome e telefone obrigatórios" });
  }
  console.log("Novo pedido:", { nome, telefone, itens, total });
  res.json({ mensagem: "Pedido recebido com sucesso!", total });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});