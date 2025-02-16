import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import PHP from '@/assets/PHP_logo.svg';
import VUE from '@/assets/VUE_logo.svg';
import JAVASCRIPT from '@/assets/JAVASCRIPT_logo.svg';
import REACT from '@/assets/REACT_logo.svg';
import MYSQL from '@/assets/MYSQL_logo.svg';
import PYTHON from '@/assets/PYTHON_logo.svg';
import JAVA from '@/assets/JAVA_logo.svg';
import LARAVEL from '@/assets/LARAVEL_logo.svg';


import FLAME from '@/assets/FLAME_ico.svg';
import INFO from '@/assets/INFO_ico.svg';

import 'vue3-carousel/dist/carousel.css';
import Modal from "../SkillsModal/SkillsModal.vue";

export default defineComponent({
  name: 'skills-sector',
  components: {
    Carousel,
    Slide,
    Navigation,
    Modal
  },
  props: ['isMobile'],
  data() {
    return { 
      skills: this.$i18nGlobal.global.messages[this.$i18nGlobal.global.locale].skills,
      PHP: PHP,
      VUE: VUE,
      JAVASCRIPT: JAVASCRIPT,
      REACT: REACT,
      MYSQL: MYSQL,
      PYTHON: PYTHON,
      JAVA: JAVA,
      LARAVEL: LARAVEL,
      FLAME: FLAME,
      INFO: INFO
    };
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    getImageRef(imgRef) {
      // Verificar si la variable existe y devolver su valor, de lo contrario, devolver el nombre original
      return this[imgRef] || imgRef;
    },
    openModalSkill(title,desc,top) {
      this.$refs.ModalSkillSector.openModal(title,desc,top);
    },
  }
})



