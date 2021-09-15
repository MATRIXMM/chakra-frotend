export const state = () => ({
  animal: null,
});

export const actions = {
  changeAnimal({ commit }, { animal }) {
    commit('setAnimal', animal)
  }
};

export const getters = {
  getAnimalName: _state => _state.animal.name
};

export const mutations = {
  setAnimal(_state, animal) {
    _state.animal = animal;
  },
};


