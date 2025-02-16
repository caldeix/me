import { createStore } from 'vuex';

export default createStore({
  state: {
    literals: null,
  },
  mutations: {
    setLiterals(state, literals) {
      state.literals = literals;
    },
  },
});
