import LINKEDIN from '@/assets/LINKEDIN.svg';
import WEB from '@/assets/WEB.svg';
export default {
  name: 'timelapse-sector',
  components: {},
  props: ['isMobile'],
  data() {
    return {
      LINKEDIN: LINKEDIN,
      WEB: WEB,
      cv: this.$i18nGlobal.global.messages[this.$i18nGlobal.global.locale].cv

    }
  },
  computed: {

  },
  mounted() {
    document.getElementById('text-0').style.display = 'block';
  },
  methods: {
    getImageRef(imgRef) {
      // Verificar si la variable existe y devolver su valor, de lo contrario, devolver el nombre original
      return this[imgRef] || imgRef;
    },
    showDesc(index) {
      var elements = document.getElementsByClassName('desc');

      // Ocultar todos los elementos con la clase 'desc'
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
      }
      document.getElementById('text-' + index).style.display = 'block';
    }
  }
}


