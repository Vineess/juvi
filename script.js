function updateCounter() {
    const startDate = new Date("2024-12-25T00:35:27"); // Data inicial
    const now = new Date(); // Data atual

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
    
        // Ajustar meses e anos caso o mês atual seja menor que o mês de início
        if (months < 0) {
            years--;
            months += 12;
        }
    
        // Ajustar dias caso o dia atual seja menor que o dia de início
        if (days < 0) {
            months--;
            const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Último dia do mês anterior
            days += previousMonth.getDate();
            if (months < 0) {
                years--;
                months += 12;
            }
        }
    
        // Diferença de horas, minutos e segundos
        const hours = now.getHours() - startDate.getHours();
        const minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();
    
        // Ajustar segundos para contar corretamente de 0 a 59
        if (seconds < 0) {
            seconds += 60;
        }
    
        // Exibir o contador formatado
        document.getElementById('counter').textContent = 
            `${years} anos, ${months} meses, ${days} dias, ${Math.abs(hours)} horas, ${Math.abs(minutes)} minutos, ${Math.abs(seconds)} segundos`;
    }

    // Atualizar o contador a cada segundo
    setInterval(updateCounter, 1000);


document.getElementById('specialDateBtn').onclick = function() {
    const message = document.getElementById('specialDateMessage');
    message.style.display = message.style.display === 'none' ? 'block' : 'none';
};

document.getElementById('letterBtn').onclick = function() {
    const modal = document.getElementById('letterModal');
    const messageText = document.getElementById('messageText');
    
    // Limpar o conteúdo do modal antes de iniciar a animação
    messageText.innerHTML = '';  // Limpa tudo o que está dentro do modal

    // Texto com 20 linhas, incluindo "Para Julia!" e a assinatura final
    const textLines = [
        "Para Julia!",  // Primeira linha centralizada com o nome dela
        "Cada momento que passamos juntos tem sido uma verdadeira descoberta.",
        "A forma como você ilumina o ambiente com seu sorriso me deixa sem palavras.",
        "É impressionante como, a cada conversa, você me surpreende mais e mais.",
        "Admiro a sua inteligência, o jeito que vê o mundo e as suas opiniões.",
        "Eu me sinto verdadeiramente grato por te conhecer e aprender com você a cada dia.",
        "Quando estamos juntos, sinto uma sensação de paz que nunca havia experimentado antes.",
        "As nossas conversas sobre tudo e sobre nada são as minhas favoritas.",
        "Você tem um jeito único de transformar os momentos simples em memórias especiais.",
        "Estou muito feliz por ter cruzado o seu caminho e ter a oportunidade de compartilhar o meu tempo com você.",
        "Mesmo em um mês, você já fez uma enorme diferença na minha vida.",
        "É curioso como os pequenos gestos se tornam grandes quando feitos com alguém especial.",
        "Cada dia ao seu lado me deixa mais ansioso para o próximo.",
        "Nosso tempo juntos é precioso, e eu quero aproveitar cada momento ao seu lado.",
        "Que venham muitos mais risos, descobertas e momentos inesquecíveis!",
        "Sempre que sentir saudade, lembre-se de que estou pensando em você, com o coração cheio de carinho. S2",
        "",
        "Assinado: Vinicius"
    ];

    let currentLine = 0;
    let currentWord = 0;

    // Exibir o modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Desabilitar rolagem do body

    // Função para digitar letra por letra
    function typeLine() {
        if (currentLine < textLines.length) {
            let line = textLines[currentLine];

            // Verificar se é a primeira linha e aplicar a classe de centralização
            if (currentLine === 0) {
                let paraJulia = document.createElement('span');
                paraJulia.textContent = line;
                paraJulia.classList.add('para-julia');  // Classe para centralizar
                messageText.appendChild(paraJulia);
                currentLine++;
                setTimeout(typeLine, 1000); // Aguardar um pouco antes de começar a próxima linha
                return;
            }

            // Verificar se é a última linha (assinatura)
            if (currentLine === textLines.length - 1) {
                let signature = document.createElement('span');
                signature.textContent = line;
                signature.classList.add('signature');  // Classe para a assinatura
                messageText.appendChild(signature);
                currentLine++;
                return;
            }

            let words = line.split(' ');

            function typeWord() {
                if (currentWord < words.length) {
                    let word = words[currentWord];
                    let wordContainer = document.createElement('span');
                    wordContainer.style.whiteSpace = 'nowrap'; // Impede quebras de linha dentro da palavra

                    // Criar a animação para cada letra
                    for (let i = 0; i < word.length; i++) {
                        let letter = document.createElement('span');
                        letter.textContent = word[i];
                        letter.classList.add('letter');
                        wordContainer.appendChild(letter);

                        // Controlar o tempo de digitação de cada letra
                        letter.style.animationDelay = `${i * 0.1}s`;  // Ajusta a velocidade da digitação
                    }

                    messageText.appendChild(wordContainer);
                    messageText.appendChild(document.createTextNode(' ')); // Espaço após a palavra

                    currentWord++;
                    setTimeout(typeWord, 500); // Ajuste o tempo entre as palavras
                } else {
                    // Quando a linha estiver completa, passar para a próxima linha
                    currentLine++;
                    currentWord = 0;
                    setTimeout(typeLine, 1000); // Aguardar um pouco antes de começar a próxima linha
                }
            }

            typeWord(); // Começar a digitação da primeira palavra
        }
    }

    // Iniciar a digitação
    typeLine();
};

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('letterModal');
    const messageText = document.getElementById('messageText');
    
    // Limpar o conteúdo do modal ao fechar
    messageText.innerHTML = '';
    
    // Reiniciar as variáveis de controle
    currentLine = 0;
    currentWord = 0;

    modal.style.display = 'none'; // Fecha o modal
    document.body.style.overflow = 'auto'; // Habilita a rolagem do body novamente
}

document.getElementById("loveThingsBtn").addEventListener("click", function() {
    const section = document.getElementById("loveThingsSection");
    section.style.display = section.style.display === "block" ? "none" : "block";
});


const loveTexts = [
    "Seu sorriso ilumina meu dia. 😊",
    "O jeito que você me olha me faz sentir especial. 💖",
    "Seu abraço é meu lugar favorito. 🤗",
    "A forma como você se preocupa comigo me faz te amar mais. 🥰",
    "Seu cheiro é o melhor perfume do mundo. 😍",
];

let loveIndex = 0;
const loveTextElement = document.getElementById("loveText");

document.getElementById("prevLove").addEventListener("click", function() {
    loveIndex = (loveIndex - 1 + loveTexts.length) % loveTexts.length;
    loveTextElement.textContent = loveTexts[loveIndex];
});

document.getElementById("nextLove").addEventListener("click", function() {
    loveIndex = (loveIndex + 1) % loveTexts.length;
    loveTextElement.textContent = loveTexts[loveIndex];
});