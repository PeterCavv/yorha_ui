import { createApp } from 'vue/dist/vue.runtime.esm-bundler'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from "./lang"

import "@/assets/main.css"

function animateText(element, text, totalDuration = 900, steps = 5) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = text.length;
  
  if (length === 0) return; // Si no hay texto, no hacer nada

  const speed = totalDuration / length; // Ajusta la velocidad proporcionalmente

  function updateLetter(span, targetChar, step) {
      let iteration = 0;
      const interval = setInterval(() => {
          if (iteration < step) {
              span.textContent = letters[Math.floor(Math.random() * letters.length)];
              iteration++;
          } else {
              span.textContent = targetChar;
              clearInterval(interval);
          }
      }, speed / step);
  }

  text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.classList.add("letter");
      element.appendChild(span);

      setTimeout(() => {
          updateLetter(span, char, steps);
      }, i * speed);
  });
}

// Directiva de Vue con animación adaptativa
const animatedTextDirective = {
  mounted(el) {
      const text = el.textContent.trim(); // Obtener el texto
      el.textContent = ''; // Limpiar antes de animar
      animateText(el, text); // Aplicar la animación
  },
};

createApp(App).
directive('animated-text', animatedTextDirective).
use(createPinia()).
use(router).
use(i18n).
mount('#app')