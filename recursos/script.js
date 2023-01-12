let contador = 0;
let qtdecartas = 0;
let carta = [];
let ultimaVirada;
let acertos = 0;

function comecoJogo() {
  qtdecartas = prompt("Com quantas cartas deseja jogar?");
  while (qtdecartas % 2 == 1 || qtdecartas < 4 || qtdecartas > 14) {
    alert("Quantidade não permitida, escolha um número par entre 4 e 14");
    qtdecartas = prompt("Com quantas cartas deseja jogar?");
  }
  cartas();
  ajusteCartas();
}

function cartas() {
  let frente = Math.floor(Math.random() * 7);

  while (carta.length < qtdecartas) {
    if (!carta.includes(frente)) {
      carta.push(frente);
      carta.push(frente);
    }
    frente = Math.floor(Math.random() * 7);
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
  let numero = 0;
  while (cartas < qtdecartas) {
    numero = carta[cartas];
    document.querySelector(".board").innerHTML += `
      <div data-test="card" class="card" onclick="virarCarta(this)">
        <div class="face" >
          <img data-test="face-down-image" src="./recursos/imagens/back.png" alt="" />
        </div>
        <div class="back-face face" >
          <img data-test="face-up-image" src="./recursos/imagens/${numero}.gif" alt="" />
        </div>
      </div>`;
    cartas++;
  }
}

function virarCarta(essa) {
  essa.firstElementChild.classList.add("back-face");
  essa.lastElementChild.classList.remove("back-face");
  let checkacerto;

  if (contador === 0) {
    ultimaVirada = essa;
    contador++;
  }

  if (ultimaVirada !== essa) {
    if (contador % 2 == 1) {
      if (essa.innerHTML == ultimaVirada.innerHTML) {
        acertos++;
        ultimaVirada.removeAttribute("onclick");
        essa.removeAttribute("onclick");
      } else {
        setTimeout(desvirar, 1000, ultimaVirada);
        setTimeout(desvirar, 1000, essa);
      }
    }
    ultimaVirada = essa;
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
  alert(`Você ganhou em ${contador} jogadas!`);
}

comecoJogo();
