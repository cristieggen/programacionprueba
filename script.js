// --- MENU RESPONSIVO ---
const boton = document.getElementById("boton");
const menu = document.getElementById("menu");
const cierre = document.getElementById("cierre");

boton.addEventListener("click", () => {
  menu.classList.add("active");
});

cierre.addEventListener("click", () => {
  menu.classList.remove("active");
});

// --- GALERÍA MANUAL ---
const carruseles = document.querySelectorAll('.carrusel, .carrusel-con-nombre');

carruseles.forEach(carrusel => {
  const track = carrusel.querySelector(".carrusel-track");
  const prev = carrusel.querySelector(".prev");
  const next = carrusel.querySelector(".next");

  if (track && prev && next) {
    let slides = Array.from(track.children);
    let index = 1; // Empezamos en el primer slide real

    const updateCarousel = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      track.style.transition = 'transform 0.5s ease-in-out';

      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    };

    const moveToNextSlide = () => {
      if (index >= slides.length - 1) return;
      index++;
      updateCarousel();
    };

    const moveToPrevSlide = () => {
      if (index <= 0) return;
      index--;
      updateCarousel();
    };

    track.addEventListener('transitionend', () => {
      if (slides[index].classList.contains('clone')) {
        track.style.transition = 'none';
        if (index === 0) {
          index = slides.length - 2;
        } else if (index === slides.length - 1) {
          index = 1;
        }
        track.style.transform = `translateX(-${index * 100}%)`;
      }
    });

    next.addEventListener("click", moveToNextSlide);
    prev.addEventListener("click", moveToPrevSlide);

    updateCarousel();
  }
});

// --- LÓGICA PARA GALERÍA SIMPLE (galeria.html) ---
document.addEventListener("DOMContentLoaded", () => {
  const imageViewer = document.getElementById('image-viewer');
  
  // Solo ejecutar si estamos en la página de la galería
  if (imageViewer) {
    const fullImage = document.getElementById('full-image');
    const galleryLinks = document.querySelectorAll('.lightbox-gallery a');
    const closeViewer = document.querySelector('.close-viewer');

    galleryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // Previene la navegación al hacer clic
        imageViewer.style.display = 'block';
        fullImage.src = link.href; // Usa el href del enlace para la imagen grande
      });
    });

    // Función para cerrar el visor
    const close = () => {
      imageViewer.style.display = 'none';
    }

    closeViewer.addEventListener('click', close);
    imageViewer.addEventListener('click', (e) => { if (e.target === imageViewer) close(); }); // Cierra al hacer clic en el fondo
  }
});
