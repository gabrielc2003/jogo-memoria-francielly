function verificarSenha() {
    var senhaCorreta = "Felipe";
    var senhaDigitada = document.getElementById("senha").value;
    
    if (senhaDigitada.toLowerCase() === senhaCorreta.toLowerCase()) {
        Swal.fire({
            title: "Acertou, docinho! 🎉",
            text: "Você pode avançar para o jogo ❤️",
            icon: "success",
            confirmButtonText: "Continuar"
        }).then(() => {
            window.location.href = "intro.html";
        });
    } else {
        Swal.fire({
            title: "Você errou?",
            text: "Tente de novo, amor 💕",
            icon: "error",
            confirmButtonText: "Tentar novamente"
        });
    }
}

document.getElementById('close-message').addEventListener('click', function() {
    document.querySelector('.mensagem').style.display = 'none';
});

let images = [
    "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg", "foto6.jpg",
    "foto7.jpg", "foto8.jpg", "foto9.jpg", "foto10.jpg", "foto11.jpg", "foto12.jpg",
    "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg", "foto6.jpg",
    "foto7.jpg", "foto8.jpg", "foto9.jpg", "foto10.jpg", "foto11.jpg", "foto12.jpg",
];

const gameBoard = document.getElementById("gameBoard");
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function iniciarJogo() {
    // Limpa o tabuleiro
    gameBoard.innerHTML = "";

    // Embaralha as imagens
    images.sort(() => 0.5 - Math.random());

    // Cria as cartas
    images.forEach(image => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = image;
        card.appendChild(img);

        card.addEventListener("click", () => {
            if (lockBoard || card.classList.contains("flipped")) return;
            card.classList.add("flipped");

            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                lockBoard = true;

                if (firstCard.children[0].src === secondCard.children[0].src) {
                    firstCard = null;
                    secondCard = null;
                    lockBoard = false;
                    checkGameOver();
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove("flipped");
                        secondCard.classList.remove("flipped");
                        firstCard = null;
                        secondCard = null;
                        lockBoard = false;
                    }, 1000);
                }
            }
        });

        gameBoard.appendChild(card);
    });
}

function checkGameOver() {
    const allCardsFlipped = document.querySelectorAll('.card:not(.flipped)').length === 0;
    if (allCardsFlipped) {
        Swal.fire({
            title: "Parabéns xuxu! 🎉",
            text: "Aceita ser a minha pessoa? Quer namorar comigo? ❤️",
            icon: "success",
            showDenyButton: true,
            confirmButtonText: "Sim",
            denyButtonText: "Claro!"
        }).then((result) => {
            if (result.isConfirmed || result.isDenied) {
                confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.6 }
                });

                Swal.fire({
                    title: "Estamos namorando agora! 💖",
                    text: "Te amo muito 😍",
                    icon: "success",
                    confirmButtonText: "Oba!"
                }).then(() => {
                    resetGame();
                });
            }
        });
    }
}

function resetGame() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    iniciarJogo(); // Reinicia tudo direitinho
}

// Começa o jogo ao carregar a página
iniciarJogo();
