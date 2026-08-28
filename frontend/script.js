async function carregarCardapio() {
  try {
    const res = await fetch("/cardapio");
    const data = await res.json();

    const paoSelect = document.querySelectorAll("select")[0];
    const recheioSelect = document.querySelectorAll("select")[1];
    const molhoSelect = document.querySelectorAll("select")[2];

    function preencher(select, itens) {
      select.innerHTML = '<option value="">Selecione</option>';
      itens.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item;
        opt.textContent = item;
        select.appendChild(opt);
      });
    }

    preencher(paoSelect, data.pao);
    preencher(recheioSelect, data.recheio);
    preencher(molhoSelect, data.molho);

  } catch (err) {
    console.error("Erro ao carregar cardapio", err);
  }
}

carregarCardapio();

document.querySelector("button").addEventListener("click", async () => {
  const selects = document.querySelectorAll("select");
  const pedido = {
    pao: selects[0].value,
    recheio: selects[1].value,
    molho: selects[2].value
  };

  if(!pedido.pao ||!pedido.recheio ||!pedido.molho){
    alert("Seleciona tudo!");
    return;
  }

  const res = await fetch("/pedido", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido)
  });
  const json = await res.json();
  alert(json.mensagem);
});