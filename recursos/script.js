let contador = 0;
let qtdecartas = 0;
let carta = [];
let ultimaVirada;
let acertos = 0;
let tempo = 0;
let freezeClic = false;

document.addEventListener("click", freezeClicFn, true);

function comecoJogo() {
  qtdecartas = prompt("Com quantas cartas deseja jogar? (Número par entre 4 e 14)");
  const mincartas = 4;
  const maxcartas = 14;
  while (isNaN(qtdecartas) || qtdecartas % 2 === 1 || qtdecartas < mincartas || qtdecartas > maxcartas) {
    alert("Quantidade não permitida, escolha um número par entre 4 e 14");
    qtdecartas = prompt("Com quantas cartas deseja jogar? (Número par entre 4 e 14)");
  }
  cartas();
  ajusteCartas();
}


function cartas() {
  const faces = 7;
  let frente = Math.floor(Math.random() * faces);

  while (carta.length < qtdecartas) {
    if (!carta.includes(frente)) {
      carta.push(frente);
      carta.push(frente);
    }
    frente = Math.floor(Math.random() * faces);
  }

  shuffle(carta);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function ajusteCartas() {
  let cartas = 0;
  while (cartas < qtdecartas) {
    document.querySelector(".board").innerHTML += `
      <div data-test="card" class="card" onclick="virarCarta(this)">
        <div class="face" >
          <img data-test="face-down-image" src="./recursos/imagens/back.png" alt="" />
        </div>
        <div class="back-face face" >
          <img data-test="face-up-image" src="./recursos/imagens/${carta[cartas]}.gif" alt="" />
        </div>
      </div>`;
    cartas++;
  }
}

function virarCarta(essa) {
  essa.firstElementChild.classList.add("back-face");
  essa.lastElementChild.classList.remove("back-face");
  disableClicksForxs(200);
  if (contador === 0) {
    ultimaVirada = essa;
    contador++;
  }

  checkAcerto(essa);
}

function checkAcerto(nova) {
  if (ultimaVirada !== nova) {
    if (contador % 2 === 1) {
      if (nova.innerHTML === ultimaVirada.innerHTML) {
        acertos++;
        ultimaVirada.removeAttribute("onclick");
        nova.removeAttribute("onclick");
      } else {
        disableClicksForxs(1000);
        setTimeout(desvirar, 1000, ultimaVirada);
        setTimeout(desvirar, 1000, nova);
      }
    }
    ultimaVirada = nova;
    contador++;
  }
  if (acertos === qtdecartas / 2) {
    setTimeout(vitoria, 100);
  }
}

function desvirar(esta) {
  esta.firstElementChild.classList.remove("back-face");
  esta.lastElementChild.classList.add("back-face");
}

function vitoria() {

  alert(`Você ganhou em ${contador} jogadas! A duração do jogo foi de ${tempo} segundos!`);
  clearInterval(tempodejogo);
  let reiniciar = prompt("Você gostaria de reiniciar a partida? (Responda apenas com ''sim'' ou ''não'')");
  while (reiniciar !== "sim" && reiniciar !== "não") {
    reiniciar = prompt("Você gostaria de reiniciar a partida? (Responda apenas com ''sim'' ou ''não'')");
  }
  if (reiniciar === "sim") {
    location.reload();
  }
}

function timer() {
  tempo++;
  document.querySelector(".timer").innerHTML = tempo;

}

function freezeClicFn(e) {
  if (freezeClic) {
    e.stopPropagation();
    e.preventDefault();
  }
}

function disableClicksForxs(tempo) {
  freezeClic = true;
  setTimeout(() => {
    freezeClic = false;
  }, tempo);

}

comecoJogo();
let tempodejogo = setInterval(timer, 1000);
