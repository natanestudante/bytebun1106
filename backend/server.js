import express from "express"
import cors from "cors"
const app=express()
app.use(cors())
app.use(express.json())
const cardapio=[
{nome:"Francês",preco:5,categoria:"pao"},
{nome:"Integral",preco:6,categoria:"pao"},
{nome:"Australiano",preco:7,categoria:"pao"},
{nome:"Ciabatta",preco:7.5,categoria:"pao"},
{nome:"Carne",preco:15,categoria:"recheio"},
{nome:"Frango",preco:12,categoria:"recheio"},
{nome:"Vegetariano",preco:13,categoria:"recheio"},
{nome:"Maionese",preco:2,categoria:"molho"},
{nome:"Barbecue",preco:3,categoria:"molho"},
{nome:"Pimenta",preco:2.5,categoria:"molho"}
]
app.get("/cardapio",(req,res)=>res.json(cardapio))
app.post("/pedido",(req,res)=>{
const {pao,recheio,molho}=req.body
const get=(n)=>cardapio.find(i=>i.nome===n)?.preco||0
res.json({itens:{pao,recheio,molho},total:get(pao)+get(recheio)+get(molho)})
})
app.listen(process.env.PORT||3000)