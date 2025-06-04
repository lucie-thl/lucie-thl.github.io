(function () {
    let scrollPos = window.scrollY;
    let targetScroll = scrollPos;
    let isScrolling = false;
  
    function ease(current, target, factor = 0.1) {
      return current + (target - current) * factor;
    }
  
    function smoothScrollLoop() {
      scrollPos = ease(scrollPos, targetScroll);
      window.scrollTo(0, scrollPos);
  
      if (Math.abs(scrollPos - targetScroll) > 0.5) {
        requestAnimationFrame(smoothScrollLoop);
      } else {
        isScrolling = false;
      }
    }
  
    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      targetScroll += e.deltaY;
  
      // limiter le scroll dans la page
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
  
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScrollLoop);
      }
    }, { passive: false });
  })();

  function shrinkHeaderOnScroll() {
    const header = document.querySelector("header");
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("shrink");
      } else {
        header.classList.remove("shrink");
      }
    });
  }
  
  function shrinkHeader() {
    const header = document.querySelector("header");
  
    if (window.scrollY > 100) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  }
  
  window.onscroll = adjustHeaderOnScroll();

  function adjustHeaderOnScroll() {
    const header = document.querySelector("header");
    const title = document.querySelector("#logoHeader");
  
    const maxHeight = window.innerHeight; // 100vh
    const minHeight = 60; // px
    const scrollMax = 300; // px
  
    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      const clampedScroll = Math.min(scroll, scrollMax);
  
      // Calcul hauteur du header
      const newHeight = maxHeight - ((maxHeight - minHeight) * (clampedScroll / scrollMax));
      header.style.height = `${newHeight}px`;
  
      // Taille de police
      const maxFont = 2.5;
      const minFont = 1.2;
      const newFont = maxFont - ((maxFont - minFont) * (clampedScroll / scrollMax));
      title.style.fontSize = `${newFont}rem`;
  
      // Transition du titre
      if (scroll >= scrollMax) {
        // header.style.justifyContent = "flex-start";
        header.style.paddingLeft = "20px";
        title.style.transform = "translateY(-5px)";
      } else {
        header.style.justifyContent = "center";
        header.style.paddingLeft = "0";
        title.style.transform = "translateY(0)";       
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", adjustHeaderOnScroll);


  let lastScrollY = window.scrollY;
  let offset = 0;
  
  window.addEventListener("scroll", () => {
    const bandeau = document.getElementById("bande");
    const currentScrollY = window.scrollY;
  
    // Détecter la direction du scroll
    if (currentScrollY > lastScrollY) {
      // Scroll vers le bas
      offset += 3;
    } else {
      // Scroll vers le haut
      offset -= 3;
    }
  
    // Limiter l'offset pour ne pas sortir de l'écran
    offset = Math.max(Math.min(offset, window.innerWidth / 2), -window.innerWidth / 2);
  
    // Appliquer la translation horizontale
    bandeau.style.transform = `translateX(${offset}px)`;
  
    // Mise à jour de la dernière position
    lastScrollY = currentScrollY;
  });

  document.getElementById("redirectBtn").addEventListener("click", function() {
  window.open("https://bulledosmose.everestic.com/", "_blank");
});