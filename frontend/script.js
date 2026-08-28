async function carregar() {
  const res = await fetch("/cardapio");
  const cardapio = await res.json();
  
  const selects = document.querySelectorAll("select");
  const fill = (cat, sel) => {
    sel.innerHTML = '<option value="">Selecione</option>';
    cardapio.filter(i => i.categoria === cat).forEach(i => {
      sel.innerHTML += `<option value="${i.nome}">${i.nome} - R$ ${i.preco}</option>`;
    });
  };
  fill("pao", selects[0]);
  fill("recheio", selects[1]);
  fill("molho", selects[2]);
}
carregar();

document.querySelector("button").addEventListener("click", async () => {
  const s = document.querySelectorAll("select");
  const pedido = { pao: s[0].value, recheio: s[1].value, molho: s[2].value };
  
  if(!pedido.pao || !pedido.recheio || !pedido.molho) return alert("Seleciona tudo!");
  
  const res = await fetch("/pedido", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(pedido)
  });
  const data = await res.json();
  alert(`${data.mensagem}\nTotal: R$ ${data.total.toFixed(2)}`);
});