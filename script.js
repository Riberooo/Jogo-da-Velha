var tabuleiro;
var jogadorO = "O";
var jogadorX = "X";
var jogadorAtual = jogadorX;
var fimdejogo = false;

window.onload = function() {
    jogo();
    document.getElementById('vez').innerText = "Jogador " + jogadorAtual + ' é a sua vez'
}

function jogo() {
    tabuleiro = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    for (let l = 0; l < 3; l++) {
        for (let c = 0; c < 3; c++) {
            let quadrado = document.createElement("div");
            quadrado.id = l.toString() + "-" + c.toString();
            quadrado.classList.add("quadrado");
            if (l == 0 || l == 1) {
                quadrado.classList.add("linha_hori")
            }
            if (c == 0 || c == 1) {
                quadrado.classList.add("linha_vert")
            }
            quadrado.addEventListener("click", marcar)
            document.getElementById("tabuleiro").appendChild(quadrado);
        }
    }
}

function marcar() {
    if (fimdejogo) {
        return;
    }

    let local = this.id.split("-");
    let l = parseInt(local[0]);
    let c = parseInt(local[1]);

    if (tabuleiro[l][c] != ' ') {
        return;
    }
    
    tabuleiro[l][c] = jogadorAtual;
    this.innerText = jogadorAtual;
    
    if (jogadorAtual == jogadorX) {
        jogadorAtual = jogadorO
    } else {
        jogadorAtual = jogadorX
    }

    vencedor();

    function vencedor() {

        for (let l = 0; l < 3; l++) {
            if (tabuleiro[l][0] == tabuleiro[l][1] && tabuleiro[l][1] == tabuleiro[l][2] && tabuleiro[l][0] != ' ') {
                for (let i = 0; i < 3; i++) {
                    let quadrado = document.getElementById(l.toString() + "-" + i.toString());
                    quadrado.classList.add('ganhador')
                }
                fimdejogo = true;
                return;
            }
        }

        for  (let c = 0; c < 3; c++) {
            if (tabuleiro[0][c] == tabuleiro[1][c] && tabuleiro[1][c] == tabuleiro[2][c] && tabuleiro[0][c] != ' ') {
                for (let i = 0; i < 3; i++) {
                    let quadrado = document.getElementById(i.toString() + "-" + c.toString());
                    quadrado.classList.add('ganhador');
                }
                fimdejogo = true;
                return;
            }
        }

        if (tabuleiro[0][0] == tabuleiro[1][1] && tabuleiro[1][1] == tabuleiro[2][2] && tabuleiro[0][0] != ' ') {
            for (let i = 0; i < 3; i++) {
                let quadrado = document.getElementById(i.toString() + '-' + i.toString());
                quadrado.classList.add('ganhador')
            }
            fimdejogo = true;
            return;
        }

        if (tabuleiro[0][2] == tabuleiro[1][1] && tabuleiro[1][1] == tabuleiro[2][0] && tabuleiro[0][2] != ' ') {
            let quadrado = document.getElementById('0-2');
            quadrado.classList.add('ganhador');

            quadrado = document.getElementById('1-1');
            quadrado.classList.add('ganhador');

            quadrado = document.getElementById('2-0');
            quadrado.classList.add('ganhador');

            fimdejogo = true;
            return;
        }

    }

    if (fimdejogo) {
        if (jogadorAtual == jogadorX) {
            document.getElementById('vez').innerText = "Jogador " + jogadorO + " è o vencedor!";
        } else {
            document.getElementById('vez').innerText = "Jogador " + jogadorX + " è o vencedor!";
        }
        
    } else {
        document.getElementById('vez').innerText = "Jogador " + jogadorAtual + " é a sua vez";
    }

}