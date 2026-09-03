const imagens = {
  Frances: "https://images.unsplash.com/photo-1589367920969-ab8c050bbb74?w=400",
  Integral: "https://images.unsplash.com/photo-1549931319-a545dcf3d696?w=400",
  Australiano: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
  Ciabatta: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400",
  Frango: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=400",
  Carne: "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400",
  Peixe: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
  Vegano: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400",
  Maionese: "https://images.unsplash.com/photo-1472476443506-c7a5948772fc?w=400",
  Barbecue: "https://images.unsplash.com/photo-1472476443506-c7a5948772fc?w=400",
  Ketchup: "https://images.unsplash.com/photo-1472476443506-c7a5948772fc?w=400",
  Especial: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400"
};

let escolha = { pao: null, recheio: null, molho: null };
let cardapio = [];

async function carregar() {
  const res = await fetch("/cardapio");
  cardapio = await res.json();
  render();
}

function render() {
  const grupos = { pao: [], recheio: [], molho: [] };
  cardapio.forEach(i => grupos[i.categoria].push(i));

  const divPaes = document.getElementById("paes");
  divPaes.innerHTML = "";
  grupos.pao.forEach(item => {
    const c = document.createElement("div");
    c.className = "card" + (escolha.pao && escolha.pao.nome === item.nome ? " selecionado" : "");
    c.innerHTML = `<img src="${imagens[item.nome]}"><h3>${item.nome}</h3><p>R$ ${item.preco.toFixed(2)}</p>`;
    c.onclick = () => {
      if (escolha.pao && escolha.pao.nome === item.nome) escolha.pao = null;
      else escolha.pao = item;
      render(); calcula();
    };
    divPaes.appendChild(c);
  });

  const divRecheios = document.getElementById("recheios");
  divRecheios.innerHTML = "";
  grupos.recheio.forEach(item => {
    const c = document.createElement("div");
    c.className = "card" + (escolha.recheio && escolha.recheio.nome === item.nome ? " selecionado" : "");
    c.innerHTML = `<img src="${imagens[item.nome]}"><h3>${item.nome}</h3><p>R$ ${item.preco.toFixed(2)}</p>`;
    c.onclick = () => {
      if (escolha.recheio && escolha.recheio.nome === item.nome) escolha.recheio = null;
      else escolha.recheio = item;
      render(); calcula();
    };
    divRecheios.appendChild(c);
  });

  const divMolhos = document.getElementById("molhos");
  divMolhos.innerHTML = "";
  grupos.molho.forEach(item => {
    const c = document.createElement("div");
    c.className = "card" + (escolha.molho && escolha.molho.nome === item.nome ? " selecionado" : "");
    c.innerHTML = `<img src="${imagens[item.nome]}"><h3>${item.nome}</h3><p>R$ ${item.preco.toFixed(2)}</p>`;
    c.onclick = () => {
      if (escolha.molho && escolha.molho.nome === item.nome) escolha.molho = null;
      else escolha.molho = item;
      render(); calcula();
    };
    divMolhos.appendChild(c);
  });
}

function calcula() {
  let total = 0;
  if (escolha.pao) total += escolha.pao.preco;
  if (escolha.recheio) total += escolha.recheio.preco;
  if (escolha.molho) total += escolha.molho.preco;
  document.getElementById("total").innerText = total.toFixed(2);
}

function fazerPedido() {
  if (!escolha.pao || !escolha.recheio) {
    alert("Escolha pelo menos pao e recheio!");
    return;
  }
  fetch("/pedido", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(escolha)
  }).then(() => alert("Pedido feito! Total R$ " + document.getElementById("total").innerText));
}

carregar();