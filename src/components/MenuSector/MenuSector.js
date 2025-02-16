
export default {
  name: 'menu-sector',
  components: {},
  props: ['isMobile'],
  data () {
    return {
      selectedSection: null,
    }
  },
  computed: {

  },
  mounted () {
    this.goToSection(this.$i18n.t('menu.home'));
  },
  methods: {
    goToSection(sectionId) {
      this.selectedSection = sectionId;
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Adjusted offset to account for the fixed menu
          behavior: 'smooth',
        });
      }
    }
  }
}


