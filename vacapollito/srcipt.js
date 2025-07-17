    // Función para las temporadas
    function toggleChapters(id) {
        const element = document.getElementById(id);
        element.style.display = element.style.display === 'flex' ? 'none' : 'flex';
    }

   // Función para el nuevo menú
   document.addEventListener("DOMContentLoaded", function() {
    const menuButtons = document.querySelectorAll('.menu-btn');
    
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const submenu = this.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('open');
            }
        });
    });

    // Cierra todos los submenús al hacer clic fuera del menú
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu-container')) {
            document.querySelectorAll('.submenu').forEach(sub => {
                sub.classList.remove('open');
            });
        }
    });
});
const slider = document.querySelector('.episodios-slider');
  const items = document.querySelectorAll('.episodio');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let autoSlideInterval;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      updateSlider();
    }, 4000);
  }

  startAutoSlide();

  slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  slider.addEventListener('mouseleave', startAutoSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
      clearInterval(autoSlideInterval);
      startAutoSlide();
    });
  });
  const charSlider = document.querySelector('.characters-container');
  const charItems = document.querySelectorAll('.character');
  const charDots = document.querySelectorAll('.char-dot');
  let charCurrentIndex = 0;
  let charAutoSlideInterval;

  function updateCharSlider() {
    charSlider.style.transform = `translateX(-${charCurrentIndex * 100}%)`;
    charDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === charCurrentIndex);
    });
  }

  function startCharAutoSlide() {
    charAutoSlideInterval = setInterval(() => {
      charCurrentIndex = (charCurrentIndex + 1) % charItems.length;
      updateCharSlider();
    }, 3500); // Cambia cada 3.5 segundos
  }

  startCharAutoSlide();

  charSlider.addEventListener('mouseenter', () => {
    clearInterval(charAutoSlideInterval);
  });

  charSlider.addEventListener('mouseleave', startCharAutoSlide);

  charDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      charCurrentIndex = index;
      updateCharSlider();
      clearInterval(charAutoSlideInterval);
      startCharAutoSlide();
    });
  });
  const crewSlider = document.querySelector('.crew-container');
  const crewItems = document.querySelectorAll('.crew-member');
  const crewDots = document.querySelectorAll('.crew-dot');
  let crewCurrentIndex = 0;
  let crewAutoSlideInterval;

  function updateCrewSlider() {
    crewSlider.style.transform = `translateX(-${crewCurrentIndex * 100}%)`;
    crewDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === crewCurrentIndex);
    });
  }

  function startCrewAutoSlide() {
    crewAutoSlideInterval = setInterval(() => {
      crewCurrentIndex = (crewCurrentIndex + 1) % crewItems.length;
      updateCrewSlider();
    }, 4000);
  }

  startCrewAutoSlide();

  crewSlider.addEventListener('mouseenter', () => {
    clearInterval(crewAutoSlideInterval);
  });

  crewSlider.addEventListener('mouseleave', startCrewAutoSlide);

  crewDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      crewCurrentIndex = index;
      updateCrewSlider();
      clearInterval(crewAutoSlideInterval);
      startCrewAutoSlide();
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
    // Obtener el nombre del archivo actual (ej: "1x1.html")
    const currentPage = window.location.pathname.split('/').pop();
    
    // Buscar en localStorage primero (para mejor performance)
    const storedTitle = localStorage.getItem(`episode-${currentPage}-title`);
    
    if (storedTitle) {
        document.getElementById('episode-title').textContent = storedTitle;
    } else {
        // Hacer fetch al index.html para extraer el título
        fetch('../series.html')
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const linkElement = doc.querySelector(`a[href*="${currentPage}"]`);
                
                if (linkElement) {
                    const title = linkElement.getAttribute('data-title') || 
                                 linkElement.querySelector('p').textContent;
                    
                    // Mostrar el título y guardar en localStorage
                    document.getElementById('episode-title').textContent = title;
                    localStorage.setItem(`episode-${currentPage}-title`, title);
                }
            })
            .catch(error => {
                console.error('Error al cargar el título:', error);
                document.getElementById('episode-title').textContent = "Episodio sin título";
            });
    }
});