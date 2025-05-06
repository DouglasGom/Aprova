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
  

  // Ativar link atual baseado no scroll
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll(".nav__links a, .mobile__nav__links a");

  function setActiveLink() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
  
    let currentSectionId = null;
  
    // Verifica se chegou no final da página (ou perto)
    const reachedBottom = scrollY + windowHeight >= documentHeight - 10;
    if (reachedBottom) {
      currentSectionId = "footer";
    } else {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 110;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
  
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = sectionId;
        }
      });
    }
  
    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      const href = link.getAttribute("href");
  
      if (currentSectionId && href === `#${currentSectionId}`) {
        link.classList.add("active-link");
      }
  
      // Se estiver no topo, marca "home"
      if (scrollY < 200 && href === "#home") {
        link.classList.add("active-link");
      }
    });
  }

  new window.VLibras.Widget("https://vlibras.gov.br/app");

    
  
  

  window.addEventListener("scroll", setActiveLink);

  

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
      footerContainer.classList.add("dark-mode");
      contentContainer.classList.add("dark-mode");
      cardsList.classList.add("dark-mode");
      pricesSection.classList.add("dark-mode");
      aboutUsSection.classList.add("dark-mode");
      aboutContainer.classList.add("dark-mode"); // Adicione esta linha
      localStorage.setItem("theme", "dark");
    };

    const disableDarkMode = () => {
      body.classList.remove("dark-mode");
      nav.classList.remove("dark-mode");
      footerContainer.classList.remove("dark-mode");
      contentContainer.classList.remove("dark-mode");
      cardsList.classList.remove("dark-mode");
      aboutContainer.classList.remove("dark-mode"); // Adicione esta linha
      pricesSection.classList.remove("dark-mode");
      aboutUsSection.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    };

    const updateTheme = () => {
      if (darkModeToggle.checked) {
        enableDarkMode();
        mainLogo.src = "./assets/logob.png";
      } else {
        disableDarkMode();
        mainLogo.src = "./assets/logo.png";
      }
    };

    // Inicialização do tema ao carregar a página
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
      if (window.scrollY > 100) {
        nav.classList.add("sticky");
      } else {
        nav.classList.remove("sticky");
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const approvedCardsContainer = document.querySelector(
      ".approved-cards-container"
    );
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    const approvedCards = document.querySelectorAll(".approved-card");
    const cardWidth = approvedCards[0].offsetWidth + 20; // Largura do card + margem
    let currentIndex = 0;

    function scrollToCard(index) {
      approvedCardsContainer.scrollLeft = index * cardWidth;
    }

    function updateButtons() {
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex >= approvedCards.length - 3;
    }

    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        scrollToCard(currentIndex);
        updateButtons();
      }
    });

    nextButton.addEventListener("click", () => {
      if (currentIndex < approvedCards.length - 3) {
        currentIndex++;
        scrollToCard(currentIndex);
        updateButtons();
      }
    });

    // Inicialização
    updateButtons();
  });

  $(document).ready(function(){
    $("#testimonial-slider").owlCarousel({
        items:2,
        itemsDesktop:[1000,2],
        itemsDesktopSmall:[990,2],
        itemsTablet:[768,1],
        pagination:true,
        navigation:false,
        navigationText:["",""],
        slideSpeed:1000,
        autoPlay:true
    });
  });

  