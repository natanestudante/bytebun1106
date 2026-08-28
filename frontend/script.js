const API = ""; // vazio pq front e back estão no mesmo Render
let cardapio = [];

async function init(){
  const res = await fetch(`/cardapio`);
  cardapio = await res.json();
  document.getElementById("app").innerHTML = `
    <div class="box">
      <h2>Monte seu lanche</h2>
      Pão: <select id="pao"></select>
      Recheio: <select id="recheio"></select>
      Molho: <select id="molho"></select>
      <button onclick="pedir()">CALCULAR TOTAL</button>
      <h3 id="total"></h3>
    </div>
    <div id="lista"></div>
  `;
  fill("pao"); fill("recheio"); fill("molho");
  renderLista();
}
function fill(cat){
  document.getElementById(cat).innerHTML = cardapio.filter(i=>i.categoria===cat).map(i=>`<option value="${i.nome}">${i.nome} - R$ ${i.preco}</option>`).join("");
}
function renderLista(){
  const d = document.getElementById("lista");
  ["pao","recheio","molho"].forEach(c=>{
    d.innerHTML+=`<h2>${c}</h2><div class="grid">${cardapio.filter(i=>i.categoria===c).map(i=>`<div class="card">${i.nome}<span class="preco">R$ ${i.preco.toFixed(2)}</span></div>`).join("")}</div>`;
  });
}
async function pedir(){
  const pao=paoEl().value, recheio=recheioEl().value, molho=molhoEl().value;
  const res = await fetch(`/pedido`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pao,recheio,molho})});
  const data = await res.json();
  document.getElementById("total").innerText = `R$ ${data.total} | ${pao} + ${recheio} + ${molho}`;
}
const paoEl=()=>document.getElementById("pao"), recheioEl=()=>document.getElementById("recheio"), molhoEl=()=>document.getElementById("molho");
init();