<template>
  <MenuSector :isMobile="isMobile"></MenuSector>
  <Home :isMobile="isMobile"></Home>
  <div id="copyright">{{ currentYear }}<img :src=COPYRIGHT alt="copyright"><span v-if="!isMobile">- {{ $t('name')}}</span><span>|</span><a href="#" @click.prevent="toggleCookiePolicy">Política de cookies</a><span>|</span><a href="#" @click.prevent="toggleCookiePrivacity">Política de privacidad</a></div>
  <CookiePolicy :show="showCookiePolicy"  @update:show="showCookiePolicy = $event" @update:showPrivacity="showCookiePrivacity = $event"  :showPrivacity="showCookiePrivacity"  />
</template>

<script>
import Home from "./components/HomeSector/HomeSector.vue";
import MenuSector from "./components/MenuSector/MenuSector.vue";
import CookiePolicy from './components/privacySector/privacySector.vue'; // Importa el componente


import COPYRIGHT from '@/assets/COPYRIGHT.svg';

export default {
  data() {
    return {
      currentYear: null,
      COPYRIGHT: COPYRIGHT,
      showCookiePolicy: false,
      showCookiePrivacity: false
    };
  },
  created() {
    // Verifica si el usuario ya aceptó las cookies
    if (!localStorage.getItem('cookiesAccepted')) {
      this.showCookiePolicy = true; // Muestra la política de cookies si no se ha aceptado aún
    }
  },
  components: {
    Home,
    MenuSector,
    CookiePolicy
  },
  mounted() {
    this.getCurrentYear();
    // Verificar el ancho de la ventana para determinar si es móvil
    this.isMobile = window.innerWidth <= 768; // Puedes ajustar este valor según tus necesidades
    // Escuchar cambios en el tamaño de la ventana para actualizar la variable isMobile
    window.addEventListener('resize', this.checkIfMobile);
  },
  methods: {
    getCurrentYear() {
      // Obtiene la fecha actual y extrae el año
      const year = new Date().getFullYear();
      // Asigna el año a la propiedad currentYear
      this.currentYear = year;
    },
    checkIfMobile() {
      this.isMobile = window.innerWidth <= 768; // Puedes ajustar este valor según tus necesidades
    },
    toggleCookiePolicy() {
      this.showCookiePolicy = true; // Muestra el componente al hacer clic en el enlace
    },
    toggleCookiePrivacity() {
      this.showCookiePrivacity = true; // Muestra el componente al hacer clic en el enlace
    },
  }

};
</script>

<style>
body {
  margin: 0;
  font-family: Gotham-bold, sans-serif;
  background-image: url("./assets/BACKGROUND.png");
  background-size: 100% 100%;
  height: 100vh;
  background-repeat: space;
  background-attachment: fixed;
}

#app {
  position: relative;
  margin-top: 5vh;
}

#copyright {
  color: white;
  background: black;
  width: 100%;
  position: fixed;
  height: 2.5vh;
  bottom: 0px;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  
}

#copyright img {
  width: 1vh;
  height: 1vh;
  margin: 0 1vh;
}

#copyright span {
  margin: 0 1vh;
  text-transform: capitalize;
}

.active {
  color: #FE9900;
}

.selectable {
  -moz-user-select: text;
  -webkit-user-select: text;
  -ms-user-select: text;
  user-select: text;
}

:root {
  --toastify-color-light: #fff;
  --toastify-color-dark: #121212;
  --toastify-color-info: #3498db;
  --toastify-color-success: #FE9900;
  --toastify-color-warning: #ffcc00;
  --toastify-color-error: #e74c3c;
  --toastify-color-transparent: rgba(0, 0, 0, .5);

  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);

  --toastify-text-color-info: rgba(0, 0, 0, .7);
  --toastify-text-color-success: rgba(0, 0, 0, .7);
  --toastify-text-color-warning: rgba(0, 0, 0, .7);
  --toastify-text-color-error: rgba(0, 0, 0, .7);

}

* {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.button-64 {
  background-color: rgba(52, 58, 64, 1);
  color: rgba(255, 255, 255, .95);
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  transition: .3s;
  cursor: pointer;
  margin-top: 20px;
}

.button-64:hover {
  background-color: rgba(52, 58, 64, .70);
  transition: .3s;
}

span {
  text-transform: uppercase;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

body {
  font-family: "Times New Roman", Times, serif !important;
}

a,
a:visited,
a:hover,
a:active {
  color: inherit;
  text-decoration: none;
}

h1,
h2,
h3 {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-weight: 400;
}

p {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.bg-section {
  background-color: rgba(0, 0, 0, .6);
  border-radius: 3vh;
  margin-bottom: 2vh;
}

@media only screen and (max-width: 768px) {
  * {
    text-decoration: none;
  }

  body {
    margin: 0;
    font-family: Gotham-bold, sans-serif;
    background-image: url("./assets/BACKGROUND.png");
    background-size: 100% 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment:local;
  }


}
</style>
