import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDyLbiXDeX2qmzr_riDrlEMN379uAVqb2c",
  authDomain: "juvi-da8cd.firebaseapp.com",
  databaseURL: "https://juvi-da8cd-default-rtdb.firebaseio.com",
  projectId: "juvi-da8cd",
  storageBucket: "juvi-da8cd.firebasestorage.app",
  messagingSenderId: "790924164473",
  appId: "1:790924164473:web:91aea6639307118a5403a8",
  measurementId: "G-GWW9LDEJF0",
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document
  .getElementById("nextDateBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Esconde todos os elementos da página
    const allElements = document.body.children;
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].style.display = "none";
    }

    // Exibe apenas a seção de "Próximos Dates"
    document.getElementById("nextDatesSection").style.display = "block";

    // Mostrar a navegação
    document.querySelector("nav").style.display = "block";

    // Criar o botão de voltar para a página inicial
    const backButton = document.createElement("button");
    backButton.innerText = "Voltar para a Página Inicial";
    backButton.onclick = function () {
      // Quando o botão de voltar for clicado, a página é restaurada
      const mainContent = [
        document.querySelector("nav"), // Exibe o menu de navegação
        document.getElementById("names"), // Exibe o título
        document.querySelector("img"), // Exibe a imagem
        document.getElementById("counter"), // Exibe o contador
      ];

      // Exibe apenas os elementos principais
      mainContent.forEach((element) => {
        element.style.display = "block";
      });

      // Esconde novamente a seção de "Próximos Dates"
      document.getElementById("nextDatesSection").style.display = "none";

      // Remove o botão de voltar
      backButton.remove();

      // Exibe o conteúdo que já estava oculto (coisas como o Spotify, carousel, etc.)
      document.getElementById("specialDateBtn").style.display = "block";
      document.getElementById("letterBtn").style.display = "block";
      document.querySelector("#loveThingsSection").style.display = "none"; // Mantém oculta essa parte
      document.querySelector("iframe").style.display = "none"; // Mantém oculto o Spotify
    };

    // Adiciona o botão de voltar à página
    document.body.appendChild(backButton);
  });

// Função para adicionar um novo próximo date no Firebase
document
  .getElementById("nextDateForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const date = document.getElementById("date").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;
    const suggestedBy = document.getElementById("suggestedBy").value;

    // Adiciona o próximo date no Firebase
    const nextDateRef = ref(db, "nextDates/" + new Date().getTime()); // Usando timestamp como chave única
    set(nextDateRef, {
      date: date,
      location: location,
      description: description,
      suggestedBy: suggestedBy,
    });

    // Limpa o formulário
    document.getElementById("nextDateForm").reset();

    // Atualiza a lista de próximos dates
    displayNextDates();
  });

// Função para carregar os próximos dates do Firebase e exibi-los
function displayNextDates() {
  const nextDatesRef = ref(db, "nextDates");

  get(nextDatesRef).then((snapshot) => {
    if (snapshot.exists()) {
      const dates = snapshot.val();
      let datesList = "";

      // Loop para exibir cada próximo date
      for (const key in dates) {
        const date = dates[key];
        datesList += `
        <li class="next-date-card">
            <div class="date-info">
                <strong class="date">${date.date}</strong><br>
                <em class="location"><strong>Local:</strong>${date.location}</em><br>
                <p class="description"><strong>Descição:</strong>${date.description}</p>
                <p class="suggested-by"><strong>Sugestão de:</strong> ${date.suggestedBy}</p>
            </div>
        </li>
    `;
      }

      document.getElementById("nextDateList").innerHTML = datesList;
    } else {
      document.getElementById("nextDateList").innerHTML =
        "Ainda não há próximos dates.";
    }
  });
}

// Chama a função para carregar os dados quando a página carregar
window.onload = displayNextDates;

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

document.getElementById("loveThingsBtn").addEventListener("click", function () {
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

document.getElementById("prevLove").addEventListener("click", function () {
  loveIndex = (loveIndex - 1 + loveTexts.length) % loveTexts.length;
  loveTextElement.textContent = loveTexts[loveIndex];
});

document.getElementById("nextLove").addEventListener("click", function () {
  loveIndex = (loveIndex + 1) % loveTexts.length;
  loveTextElement.textContent = loveTexts[loveIndex];
});

// Pega o botão de Playlist do Amor e o player
const playlistBtn = document.getElementById("playlistBtn");
const spotifyPlayer = document.getElementById("spotifyPlayer");

// Função para alternar o estado do player (mostrar/ocultar)
playlistBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Previne o comportamento padrão do link

  // Alterna entre exibir ou ocultar o player
  if (
    spotifyPlayer.style.display === "none" ||
    spotifyPlayer.style.display === ""
  ) {
    spotifyPlayer.style.display = "block"; // Exibe o player
  } else {
    spotifyPlayer.style.display = "none"; // Oculta o player
  }
});
