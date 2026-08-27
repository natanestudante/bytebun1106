const URL_API = "http://localhost:3000";
const selectPao = document.querySelector("#selectPao");
const selectRecheio = document.querySelector("#selectRecheio");
const selectMolho = document.querySelector("#selectMolho");
const btnCalcularPedido = document.querySelector("#btnCalcularPedido");
const cupom = document.querySelector("#cupom");

function popularSelect(idSelect, itens) {
  const select = document.querySelector("#" + idSelect);
  select.innerHTML = '<option value="">Selecione...</option>';
  for (let i = 0; i < itens.length; i++) {
    const option = document.createElement("option");
    option.value = itens[i].nome;
    option.textContent = itens[i].nome + " - R$ " + itens[i].preco.toFixed(2);
    select.appendChild(option);
  }
}

async function carregarCardapio() {
  const resposta = await fetch(URL_API + "/cardapio");
  const itens = await resposta.json();
  popularSelect("selectPao", itens.filter(function(i){ return i.categoria === "pao" }));
  popularSelect("selectRecheio", itens.filter(function(i){ return i.categoria === "recheio" }));
  popularSelect("selectMolho", itens.filter(function(i){ return i.categoria === "molho" }));
}

carregarCardapio();

btnCalcularPedido.addEventListener("click", async function() {
  const pao = selectPao.value;
  const recheio = selectRecheio.value;
  const molho = selectMolho.value;
  const resposta = await fetch(URL_API + "/pedido", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pao: pao, recheio: recheio, molho: molho })
  });
  const dados = await resposta.json();
  cupom.innerText = "PAO: " + dados.itens.pao + "\nRECHEIO: " + dados.itens.recheio + "\nMOLHO: " + dados.itens.molho + "\nTOTAL: R$ " + dados.total.toFixed(2);
});