import { users } from "@/assets/json/users";

export const state = () => ({
  animal: null,
  user: null,
  loading: false,
});

export const actions = {
  changeAnimal({ commit }, { animal }) {
    commit('setAnimal', animal)
  },
  login({ commit }, { payload }) {
    const uservalid = users.find(el => el.email === payload.email)
    if (uservalid) commit('setUser', uservalid)
  },
  logout({ commit }) {
    commit('setUser', null)
    this.$router.replace('/')
  }
};

export const getters = {
  getAnimalName: _state => _state.animal.name,
  getUserOptions: _state => _state.user.options
};

export const mutations = {
  setAnimal(_state, animal) {
    _state.animal = animal;
  },
  setUser(_state, user) {
    _state.user = user;
  },
};


