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
  document.getElementById(
    "counter"
  ).textContent = `${years} anos, ${months} meses, ${days} dias, ${Math.abs(
    hours
  )} horas, ${Math.abs(minutes)} minutos, ${Math.abs(seconds)} segundos`;
}

// Atualizar o contador a cada segundo
setInterval(updateCounter, 1000);

document.getElementById("specialDateBtn").onclick = function () {
  const message = document.getElementById("specialDateMessage");
  message.style.display = message.style.display === "none" ? "block" : "none";
};

document.getElementById("letterBtn").onclick = function () {
  const modal = document.getElementById("letterModal");
  const messageText = document.getElementById("messageText");

  // Limpar o conteúdo do modal antes de iniciar a animação
  messageText.innerHTML = ""; // Limpa tudo o que está dentro do modal

  // Texto com 20 linhas, incluindo "Para Julia!" e a assinatura final
  const textLines = [
    "Para Julia!", // Primeira linha centralizada com o nome dela
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
    "Assinado: Vinicius",
  ];

  let currentLine = 0;
  let currentWord = 0;

  // Exibir o modal
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Desabilitar rolagem do body

  // Função para digitar letra por letra
  function typeLine() {
    if (currentLine < textLines.length) {
      let line = textLines[currentLine];

      // Verificar se é a primeira linha e aplicar a classe de centralização
      if (currentLine === 0) {
        let paraJulia = document.createElement("span");
        paraJulia.textContent = line;
        paraJulia.classList.add("para-julia"); // Classe para centralizar
        messageText.appendChild(paraJulia);
        currentLine++;
        setTimeout(typeLine, 1000); // Aguardar um pouco antes de começar a próxima linha
        return;
      }

      // Verificar se é a última linha (assinatura)
      if (currentLine === textLines.length - 1) {
        let signature = document.createElement("span");
        signature.textContent = line;
        signature.classList.add("signature"); // Classe para a assinatura
        messageText.appendChild(signature);
        currentLine++;
        return;
      }

      let words = line.split(" ");

      function typeWord() {
        if (currentWord < words.length) {
          let word = words[currentWord];
          let wordContainer = document.createElement("span");
          wordContainer.style.whiteSpace = "nowrap"; // Impede quebras de linha dentro da palavra

          // Criar a animação para cada letra
          for (let i = 0; i < word.length; i++) {
            let letter = document.createElement("span");
            letter.textContent = word[i];
            letter.classList.add("letter");
            wordContainer.appendChild(letter);

            // Controlar o tempo de digitação de cada letra
            letter.style.animationDelay = `${i * 0.1}s`; // Ajusta a velocidade da digitação
          }

          messageText.appendChild(wordContainer);
          messageText.appendChild(document.createTextNode(" ")); // Espaço após a palavra

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
  const modal = document.getElementById("letterModal");
  const messageText = document.getElementById("messageText");

  // Limpar o conteúdo do modal ao fechar
  messageText.innerHTML = "";

  // Reiniciar as variáveis de controle
  currentLine = 0;
  currentWord = 0;

  modal.style.display = "none"; // Fecha o modal
  document.body.style.overflow = "auto"; // Habilita a rolagem do body novamente
}

document.getElementById("roletaBtn").onclick = function () {
  const modal = document.getElementById("roletaModal");
  modal.style.display = "flex";
  drawWheel();
};

function closeRoleta() {
  document.getElementById("roletaModal").style.display = "none";
  document.getElementById("roletaResult").textContent = "";
}

const options = [
  "Massagem relaxante (ou não tão relaxante)",
  "Uma noite de filmes com direito a muitas carícias",
  "Um jantar romântico",
  "Um passeio especial",
  "Uma declaração de amor",
  "Noite de fondue",
];

const colors = [
  "#ff9a9e",
  "#fad0c4",
  "#fbc2eb",
  "#ff7f7f",
  "#ffc3a0",
  "#ffdfba",
];
const canvas = document.getElementById("roletaWheel");
const ctx = canvas.getContext("2d");
const radius = canvas.width / 2;
let currentAngle = 0;

function drawWheel() {
    const arcSize = (2 * Math.PI) / options.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Garantir que a roleta seja redesenhada

    for (let i = 0; i < options.length; i++) {
        const startAngle = i * arcSize + currentAngle;
        const endAngle = startAngle + arcSize;

        // Desenhar cada seção colorida
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, startAngle, endAngle);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        // Adicionar texto ao centro da seção
        const text = options[i];
        const lines = breakTextIntoLines(text, 15); // Quebra o texto em linhas de até 15 caracteres
        const fontSize = lines.length > 1 ? 12 : 14; // Ajusta o tamanho da fonte para textos maiores

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(startAngle + arcSize / 2); // Centraliza o texto no arco
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.font = `${fontSize}px Arial`;

        // Desenhar cada linha do texto no arco
        lines.forEach((line, index) => {
            const lineHeight = 16; // Altura entre linhas
            ctx.fillText(line, radius / 2, -lines.length * lineHeight / 2 + index * lineHeight);
        });

        ctx.restore();
    }

    // Desenhar o ponteiro
    drawPointer();
}

function drawPointer() {
    ctx.beginPath();
    // Ponta do ponteiro (no centro da roleta, partindo da direita)
    ctx.moveTo(canvas.width - 50, radius); 
    // Base superior
    ctx.lineTo(canvas.width - 5, radius - 15); 
    // Base inferior
    ctx.lineTo(canvas.width - 5, radius + 15); 
    ctx.closePath();

    ctx.fillStyle = "red"; // Cor do ponteiro
    ctx.fill();

    ctx.strokeStyle = "#333";
    ctx.stroke();
}



// Função para quebrar texto em várias linhas
function breakTextIntoLines(text, maxCharsPerLine) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    for (const word of words) {
        if ((currentLine + word).length > maxCharsPerLine) {
            lines.push(currentLine.trim());
            currentLine = word + " ";
        } else {
            currentLine += word + " ";
        }
    }

    if (currentLine.trim()) {
        lines.push(currentLine.trim());
    }

    return lines;
}


let isSpinning = false;
document.getElementById("spinButton").onclick = function () {
  if (isSpinning) return;

  isSpinning = true;
  const spinDuration = 3000;
  const spinAngle = Math.random() * 2 * Math.PI + 6 * Math.PI;

  const startTime = performance.now();
  function animate() {
    const now = performance.now();
    const elapsed = now - startTime;

    if (elapsed < spinDuration) {
      const easing = easeOutCubic(elapsed / spinDuration);
      currentAngle += easing * spinAngle;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawWheel();
      requestAnimationFrame(animate);
    } else {
      currentAngle += spinAngle;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawWheel();

      const normalizedAngle = currentAngle % (2 * Math.PI);
      const arcSize = (2 * Math.PI) / options.length;
      const resultIndex =
        Math.floor((2 * Math.PI - normalizedAngle) / arcSize) % options.length;

      document.getElementById(
        "roletaResult"
      ).textContent = `Resultado: ${options[resultIndex]}`;
      isSpinning = false;
    }
  }
  animate();
};

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Obtendo os elementos
const specialPhoto = document.getElementById('specialPhoto');
const translations = document.getElementById('translations');

// Adicionando o evento de clique
specialPhoto.addEventListener('click', function() {
    // Alterna a visibilidade das traduções
    if (translations.style.display === 'block') {
        translations.style.display = 'none';
    } else {
        translations.style.display = 'block';
    }
});
