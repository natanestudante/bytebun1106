// COLOCA SEUS LINKS AQUI - tem que ser link direto que termina em .jpg .png .webp
// ou se voce baixar as fotos coloca tipo "./img/frances.jpg"
const imagens = {
  Frances: "https://images.tcdn.com.br/img/img_prod/1249907/pao_hamburguer_frances_panidor_300gr_5_unidades_385_1_bf3141cb2c203087d7172b45d49022df.jpeg",
  Integral: "https://www.puropao.com.br/wp-content/uploads/2021/02/Pao-de-Hamburguer-Integral-Congelado-com-Gergelim_v.png",
  Australiano: "https://www.puropao.com.br/wp-content/uploads/2021/02/Pao-de-Hamburguer-Australiano.png",
  Ciabatta: "https://receitatodahora.com.br/wp-content/uploads/2023/10/pao-ciabatta-17-10-805x805.jpg",
  Frango: "https://cdn0.umcomo.com.br/pt/posts/5/9/8/como_fazer_hamburguer_de_frango_17895_orig.jpg",
  Carne: "https://cdn.oceanserver.com.br/lojas/gymchef/uploads_produto/hamburguer-de-carne-690bf362c5379.png",
  Peixe: "https://www.comidaereceitas.com.br/wp-content/uploads/2008/06/Hamburguer-de-peixe-freepik-780x520.jpg",
  Vegano: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp7r5XBpO_2BnPhk3a0QOb5BAwfPyQIrghd8_ZHwjEsw&s=10",
  Maionese: "https://swiftbr.vteximg.com.br/arquivos/ids/210161/623073-maionese-grill_rec.jpg?v=638908797183800000",
  Barbecue: "https://swiftbr.vteximg.com.br/arquivos/ids/210158/623080-molho-barbecue-rustico_rec.jpg?v=638908774998130000",
  Ketchup: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnNppWrgYDqynKGOgXG2m5g5LGxrAyY01ueMcJtVv_Ug&s=10",
  Especial: "https://swiftbr.vteximg.com.br/arquivos/ids/210879/623079-molho-swift_rec.jpg?v=638941716248470000"
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
    let imgSrc = imagens[item.nome] ? imagens[item.nome] : "";
    c.innerHTML = `${imgSrc ? `<img src="${imgSrc}">` : `<div style="height:110px;background:#eee;border-radius:8px;display:flex;align-items:center;justify-content:center">SEM IMAGEM</div>`}<h3>${item.nome}</h3><p>R$ ${item.preco.toFixed(2)}</p>`;
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
    let imgSrc = imagens[item.nome] ? imagens[item.nome] : "";
    c.innerHTML = `${imgSrc ? `<img src="${imgSrc}">` : `<div style="height:110px;background:#eee;border-radius:8px;display:flex;align-items:center;justify-content:center">SEM IMAGEM</div>`}<h3>${item.nome}</h3><p>R$ ${item.preco.toFixed(2)}</p>`;
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
    let imgSrc = imagens[item.nome] ? imagens[item.nome] : "";
    c.innerHTML = `${imgSrc ? `<img src="${imgSrc}">` : `<div style="height:110px;background:#eee;border-radius:8px;display:flex;align-items:center;justify-content:center">SEM IMAGEM</div>`}<h3>${item.nome}</h3><p>R$ ${item.preco.toFixed(2)}</p>`;
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