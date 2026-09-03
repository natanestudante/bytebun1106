const paes = [
  {nome:"Francês", preco:1.5, img:"https://images.unsplash.com/photo-1589367920969-ab8c050bbb74?w=300"},
  {nome:"Brioche", preco:2, img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300"},
  {nome:"Australiano", preco:2.5, img:"https://images.unsplash.com/photo-1549931319-a545dcf3d696?w=300"},
]
const recheios = [
  {nome:"Frango", preco:5, img:"https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=300"},
  {nome:"Carne", preco:6, img:"https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=300"},
  {nome:"Veggie", preco:5, img:"https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300"},
]
const molhos = [
  {nome:"Maionese", preco:0.5, img:"https://images.unsplash.com/photo-1472476443506-c7a5948772fc?w=300"},
  {nome:"Cheddar", preco:1, img:"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300"},
  {nome:"Especial", preco:1.5, img:"https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=300"},
]

let escolha = {pao:null, recheio:null, molho:null}

function criarCards(lista, divId, tipo){
  const div = document.getElementById(divId)
  lista.forEach((item, i)=>{
    const c = document.createElement("div")
    c.className="card"
    c.innerHTML=`<img src="${item.img}"><h3>${item.nome}</h3><p>R$ ${item.preco}</p>`
    c.onclick=()=>{
      // desmarcar se clicar de novo
      if(escolha[tipo]===i){ escolha[tipo]=null; c.classList.remove("selecionado") }
      else{
        document.querySelectorAll(`#${divId}.card`).forEach(x=>x.classList.remove("selecionado"))
        escolha[tipo]=i
        c.classList.add("selecionado")
      }
      calcula()
    }
    div.appendChild(c)
  })
}
function calcula(){
  let total=0
  if(escolha.pao!==null) total+=paes[escolha.pao].preco
  if(escolha.recheio!==null) total+=recheios[escolha.recheio].preco
  if(escolha.molho!==null) total+=molhos[escolha.molho].preco
  document.getElementById("total").innerText=total.toFixed(2)
}
function fazerPedido(){
  alert("Pedido feito! Total R$ "+document.getElementById("total").innerText)
  // se tiver backend: fetch("/pedido", {method:"POST", body:JSON.stringify(escolha)})
}

criarCards(paes,"paes","pao")
criarCards(recheios,"recheios","recheio")
criarCards(molhos,"molhos","molho")