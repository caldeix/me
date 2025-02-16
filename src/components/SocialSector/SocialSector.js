import LINKEDIN from '@/assets/LINKEDIN.svg';
import GITHUB from '@/assets/GITHUB.svg';
import MAIL from '@/assets/MAIL.svg';
import CV from '@/assets/CV.svg';
import COPYPASTE from '@/assets/COPYPASTE.svg';
import COBI from '@/assets/COBI.svg';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'social-sector',
  components: {},
  props: ['isMobile'],
  data() {
    return {
      social_keys: this.$i18nGlobal.global.messages[this.$i18nGlobal.global.locale].social_keys,
      LINKEDIN: LINKEDIN,
      GITHUB: GITHUB,
      MAIL: MAIL,
      CV: CV,
      COPYPASTE: COPYPASTE,
      COBI: COBI
    }
  },
  computed: {

  },
  setup() {
    const notify = () => {
      toast.success("Mail copiado!", {
        autoClose: 500,
        theme: 'dark',
        position: 'bottom-right',
        transition: toast.TRANSITIONS.ZOOM,
        limit: 1,
        multiple: false,
      }); // ToastOptions
    }
    return { notify };
  },
  methods: {
    getImageRef(imgRef) {
      // Verificar si la variable existe y devolver su valor, de lo contrario, devolver el nombre original
      return this[imgRef] || imgRef;
    },
    copy() {
      // Obtener el valor del atributo data-mail
      const mailValue = this.$el.querySelector('#copypaste').getAttribute('data-mail');
      const elementoTemporal = document.createElement("textarea");
      elementoTemporal.value = mailValue;

      // Agrega el elemento temporal al DOM
      document.body.appendChild(elementoTemporal);

      // Selecciona el texto dentro del elemento temporal
      elementoTemporal.select();
      elementoTemporal.setSelectionRange(0, 99999); // Para dispositivos móviles

      // Ejecuta el comando de copiar al portapapeles
      document.execCommand("copy");

      // Remueve el elemento temporal del DOM
      document.body.removeChild(elementoTemporal);

      this.notify();

    }
  }
}


