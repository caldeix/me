
export default {
  name: 'privacy-sector',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    showPrivacity:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {

    };
  },
  computed: {

  },
  mounted() {

  },
  created() {
    // Verifica si el usuario ya aceptó las cookies
    if (localStorage.getItem('cookiesAccepted') === true) {
      this.showCookiePolicy = false;
    }
  },
  methods: {
    acceptCookies() {
      // Oculta la política de cookies
      this.showCookiePolicy = false;
      // Guarda en localStorage que el usuario ha aceptado las cookies
      localStorage.setItem('cookiesAccepted', 'true');
    },
    hidePolicy() {
      this.$emit('update:show', false); // Emitir evento para ocultar el componente
      localStorage.setItem('cookiesAccepted', 'true');
    },
    hidePrivacity() {
      this.$emit('update:showPrivacity', false); // Emitir evento para ocultar el componente
    },
  },
}


