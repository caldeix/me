import Social from "../SocialSector/SocialSector.vue";
import Skills from "../SkillsSector/SkillsSector.vue";
import Timelapse from "../timelapseSector/timelapseSector.vue";
export default {
  name: 'home-sector',
  components: {
    Social,
    Skills,
    Timelapse
  },
  props: ['isMobile'],
  data() {
    return {
    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {
   
  }
}


