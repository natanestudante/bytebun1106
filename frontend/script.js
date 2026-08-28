const API_URL = "https://bytebun1106.onrender.com";

const selectPao = document.getElementById('selectPao');
const selectRecheio = document.getElementById('selectRecheio');
const selectMolho = document.getElementById('selectMolho');
const cupom = document.getElementById('cupom');
const btn = document.getElementById('btnCalcularPedido');

async function carregarDados() {
  try {
    const res = await fetch(`${API_URL}/produtos`);
    const dados = await res.json();
    
    // Ajuste aqui conforme seu backend retorna
    // Vou preencher com exemplo que funciona
    const paes = dados.paes || [{nome: "Brioche", preco: 5}, {nome: "Australiano", preco: 6}];
    const recheios = dados.recheios || [{nome: "Blend 180g", preco: 15}];
    const molhos = dados.molhos || [{nome: "Cheddar", preco: 3}];

    paes.forEach(p => {
      let opt = document.createElement('option');
      opt.value = JSON.stringify(p);
      opt.textContent = `${p.nome} - R$ ${p.preco}`;
      selectPao.appendChild(opt);
    });
    
    recheios.forEach(r => {
      let opt = document.createElement('option');
      opt.value = JSON.stringify(r);
      opt.textContent = `${r.nome} - R$ ${r.preco}`;
      selectRecheio.appendChild(opt);
    });
    
    molhos.forEach(m => {
      let opt = document.createElement('option');
      opt.value = JSON.stringify(m);
      opt.textContent = `${m.nome} - R$ ${m.preco}`;
      selectMolho.appendChild(opt);
    });

  } catch (e) {
    cupom.textContent = "Erro ao conectar na API: " + e;
    console.error(e);
  }
}

btn.addEventListener('click', () => {
  const pao = JSON.parse(selectPao.value);
  const recheio = JSON.parse(selectRecheio.value);
  const molho = JSON.parse(selectMolho.value);
  
  const total = pao.preco + recheio.preco + molho.preco;
  
  cupom.textContent = `--- CUPOM BYTE BUN ---\nPão: ${pao.nome}\nRecheio: ${recheio.nome}\nMolho: ${molho.nome}\n\nTOTAL: R$ ${total.toFixed(2)}`;
});

carregarDados();