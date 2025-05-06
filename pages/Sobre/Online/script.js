document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const nav = document.querySelector("nav");
  const mainLogo = document.getElementById("mainLogo");
  const footerContainer = document.querySelector(".footer__container");
  const contentContainer = document.querySelector(".content__container");
  const cardsList = document.querySelector(".cards-list");
  const pricesSection = document.querySelector(".prices");
  const aboutUsSection = document.querySelector(".about_us");
  const aboutContainer = document.querySelector(".about__container");
  const increaseFontButton = document.getElementById("increaseFont");
  const decreaseFontButton = document.getElementById("decreaseFont");

  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileNavLinks = document.getElementById("mobileNavLinks");
  const menuIcon = document.getElementById("menuIcon");
  
  if (mobileMenuToggle && mobileNavLinks && menuIcon) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileNavLinks.classList.toggle("open");
  
      // Alterna ícone do menu
      if (mobileNavLinks.classList.contains("open")) {
        menuIcon.classList.remove("bx-menu");
        menuIcon.classList.add("bx-x");
      } else {
        menuIcon.classList.remove("bx-x");
        menuIcon.classList.add("bx-menu");
      }
    });
  }
  new window.VLibras.Widget("https://vlibras.gov.br/app");

  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const arrow = this.querySelector(".arrow-icon");

      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        arrow.textContent = "▼";
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        arrow.textContent = "▲";
      }
    });
  });

  let currentFontSize =
    parseFloat(getComputedStyle(document.documentElement).fontSize) || 16; // Pega o tamanho da fonte base (padrão é 16px)
  const maxFontSize = 24;
  const minFontSize = 12;
  const fontSizeStep = 2;

  const updateFontSize = () => {
    document.documentElement.style.fontSize = `${currentFontSize}px`;
    localStorage.setItem("fontSize", currentFontSize); // Salva o tamanho da fonte
  };

  increaseFontButton.addEventListener("click", () => {
    if (currentFontSize < maxFontSize) {
      currentFontSize += fontSizeStep;
      updateFontSize();
    }
  });

  decreaseFontButton.addEventListener("click", () => {
    if (currentFontSize > minFontSize) {
      currentFontSize -= fontSizeStep;
      updateFontSize();
    }
  });

  // Carrega o tamanho da fonte salvo ao carregar a página
  const savedFontSize = localStorage.getItem("fontSize");
  if (savedFontSize) {
    currentFontSize = parseFloat(savedFontSize);
    updateFontSize();
  }

  const enableDarkMode = () => {
    body.classList.add("dark-mode");
    nav.classList.add("dark-mode");
    footerContainer?.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  };

  const disableDarkMode = () => {
    body.classList.remove("dark-mode");
    nav.classList.remove("dark-mode");
    footerContainer?.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  };

  const updateTheme = () => {
    if (darkModeToggle.checked) {
      enableDarkMode();
      mainLogo.src = "../../../assets/logob.png";
    } else {
      disableDarkMode();
      mainLogo.src = "../../../assets/logo.png";
    }
  };

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    darkModeToggle.checked = true;
    enableDarkMode();
  } else {
    darkModeToggle.checked = false;
    disableDarkMode();
  }

  // Ouvinte de evento para a mudança no checkbox
  darkModeToggle.addEventListener("change", updateTheme);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  });
});

const materias = {
  portugues:
    "Estudo da narrativa em diferentes gêneros, Discurso artístico: diferentes formas de representação, Acentuação e Pontuação, Pronomes, Tempos e modos verbais, Discurso direto e indireto, Figuras de linguagem, Adjetivos e locuções adjetivas, Advérbio e locuções adverbiais, Variedades linguísticas, Linguagem conotativa e denotativa, Gênero textual: notícia, Sujeito e predicado, Vozes verbais, Discurso da esfera da publicidade: diferentes formas de representação, Complementos da oração (objeto direto e indireto, agente da passiva, complemento nominal), Concordância verbal e nominal + Regência verbal e nominal, Funções acessórias: adjunto adnominal, aposto, adjunto adverbial, vocativo, Traços característicos de textos argumentativos, Crase, Preposição, Conectivos, Interferência, Conjunção, Período composto, Interpretação de textos",
  biologia:
    "Meio ambiente, Qualidade de vida, Poluição do ar e do solo: Fontes e efeitos sobre a saúde, Origem e evolução dos seres vivos + Características básicas dos seres vivos, Diversidade da vida animal, Produtos obtidos de seres vivos, Ciência, tecnologia e subsistência, Parasitas humanos e os agravos à saúde, Os nutrientes e suas funções no organismo, Estrutura, funcionamento inter relações dos sistemas, Tipos de reprodução + Sexualidade, reprodução humana e saúde reprodutiva, Coordenação das funções orgânicas, As drogas e a preservação do organismo, Os órgãos dos sentidos",
  historia:
  "Civilizações do Oriente Próximo, África, o \"berço da humanidade\", A vida na Grécia antiga e A vida na Roma antiga, O fim do Império Romano, As civilizações do Islã (sociedade e cultura), Império Bizantino e o Oriente no imaginário medieval, O Feudalismo, As Cruzadas, Renascimento Comercial e Urbano + Renascimento Cultural e Científico, Os fundamentos teóricos do absolutismo e as Monarquias Absolutistas, Reforma e Contrarreforma, Expansão marítima no século XV e XVI, As sociedades Maia, Asteca e Inca, A conquista espanhola na América, Sociedades indígenas no Brasil",
  geografia:
    "O tempo na natureza, Paisagens da Terra + A leitura de paisagens, Linguagem dos mapas, A história da Terra e os recursos naturais, A água e os assentamentos humanos, Natureza e sociedade na modelagem do relevo, O clima, o tempo e a vida humana + Alterações climáticas, As atividades econômicas e o espaço geográfico, A formação territorial do Brasil + A regionalização do território Brasileiro, A federação Brasileira, Biomas e os domínios morfoclimáticos, Políticas ambientais no Brasil, Sistema Nacional de Unidades de Conservação (SNUC), A população e os fluxos migratórios, Espaço agrário e a questão da terra, Globalização, A matriz energética mundial + A matriz energética brasileira, Os blocos econômicos supranacionais, As cidades e a irradiação do consumo",
  fisica:
    "Dimensão e estrutura do planeta Terra, Rotação da Terra, Elementos astronômicos visíveis, Ciência, tecnologia e subsistência, As estações do ano, Fontes, obtenção, usos e propriedades da energia, Materiais como fontes de energia, Usos tecnológicos das radiações",
  quimica:
    "Fórmulas químicas, Substâncias e misturas, Elementos químicos + Tabela periódica, Básico de reações químicas, Estados da matéria, Estrutura atômica, Materiais no cotidiano e no sistema produtivo, Materiais obtidos de vegetais",
};

const tabs = document.querySelectorAll(".faq-tab");
const title = document.getElementById("materia-title");
const content = document.getElementById("materia-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const materia = tab.dataset.materia;
    title.textContent = tab.textContent;

    const topicos = materias[materia]
      .split(",")
      .map((item) => `<li>• ${item.trim()}</li>`)
      .join("");

    content.innerHTML = `<ul>${topicos}</ul>`;
  });
});
