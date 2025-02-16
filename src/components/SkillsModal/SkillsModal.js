import { defineComponent} from 'vue';
import FLAME from '@/assets/FLAME_ico.svg';
import EXIT from '@/assets/EXIT_ico.svg';

export default defineComponent({
  name: 'skills-modal',

  data() {
    return {
      showModal: false,
      title:'',
      description:'',
      top:0,
      FLAME: FLAME,
      EXIT: EXIT
    };
  },props:{
  },

  methods: {
    getImageRef(imgRef) {
      // Verificar si la variable existe y devolver su valor, de lo contrario, devolver el nombre original
      return this[imgRef] || imgRef;
    },
    openModal(title,desc,top) {
      this.title = title;
      this.description = desc;
      this.top=top;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },
  }
});