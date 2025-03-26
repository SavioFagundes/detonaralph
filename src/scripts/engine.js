const state = {
    view: {
        squares: document.querySelectorAll(".square"), // Lista de todos os quadrados do jogo
        enemy: document.querySelector(".enemy"), // Referência ao inimigo (pode ser atualizado dinamicamente)
        timeleft: document.querySelector("#time-left"), // Elemento que exibe o tempo restante
        score: document.querySelector("#score"), // Elemento que exibe a pontuação
    },
    values: {
        timerId: null, // ID do intervalo que controla o movimento do inimigo
        countDownTimerId: setInterval(countDown, 1000), // Inicia a contagem regressiva a cada segundo
        gameVelocity: 1000, // Velocidade do jogo (tempo entre a mudança do inimigo de lugar)
        hitPosition: 0, // Guarda a posição do inimigo
        result: 0, // Armazena a pontuação do jogador
        currentTime: 60, // Tempo total do jogo em segundos
    },
};

// Função para tocar o som de acerto ao clicar no inimigo
function playSound() {
    let audio = new Audio("./src/audios/hit.m4a"); // Caminho do arquivo de áudio
    audio.play(); // Toca o áudio
}

// Função responsável pela contagem regressiva do tempo de jogo
function countDown() {
    state.values.currentTime--; // Reduz o tempo em 1 segundo
    state.view.timeleft.textContent = state.values.currentTime; // Atualiza o tempo exibido na tela

    // Verifica se o tempo chegou a zero
    if (state.values.currentTime <= 0) {
        clearInterval(state.values.countDownTimerId); // Para a contagem regressiva
        clearInterval(state.values.timerId); // Para o movimento do inimigo
        alert("Game Over! O seu resultado foi: " + state.values.result); // Exibe mensagem com a pontuação final
        playSound(); // Toca o som ao final do jogo
    }
}

// Função para escolher um quadrado aleatório e posicionar o inimigo nele
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy"); // Remove a classe "enemy" de todos os quadrados
    });

    let randomNumber = Math.floor(Math.random() * state.view.squares.length); // Gera um número aleatório dentro do intervalo de quadrados disponíveis
    let randomSquare = state.view.squares[randomNumber]; // Seleciona um quadrado aleatório
    
    if (randomSquare) { // Verifica se o quadrado existe antes de modificar
        randomSquare.classList.add("enemy"); // Adiciona a classe "enemy" ao quadrado selecionado
        state.values.hitPosition = randomSquare.id; // Atualiza a posição do inimigo
    }
}

// Função que faz o inimigo se mover continuamente
function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity); // Chama randomSquare em intervalos de tempo
}

// Função que adiciona os eventos de clique para detectar acertos
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => { // Adiciona um evento de clique em cada quadrado
            if (square.id === state.values.hitPosition) { // Verifica se o quadrado clicado é onde o inimigo está
                state.values.result++; // Aumenta a pontuação
                state.view.score.textContent = state.values.result; // Atualiza a pontuação exibida na tela
                state.values.hitPosition = null; // Reseta a posição do inimigo para evitar cliques repetidos
                playSound(); // Toca o som de acerto
            }
        });
    });
}

// Função principal que inicia o jogo
function initialize() {
    moveEnemy(); // Inicia o movimento do inimigo
    addListenerHitBox(); // Adiciona os eventos de clique
}

initialize(); // Chama a função para começar o jogo