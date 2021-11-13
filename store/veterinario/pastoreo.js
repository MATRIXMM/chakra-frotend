import axios from "axios";

export const state = () => ({
  pastoreoFamilia: [],
  pastoreoFamilias: [],
  periodo: '',
  familia: {},
});

export const actions = {
  setPeriod({ commit }, {periodo}) {
    commit('setPeriodo', periodo);
  },
  async getFamilia({commit}, {idFamilia}) {
    try {
      const response = await axios.get(`http://localhost:8085/api/familia_animal/validar/${idFamilia}`);
      const familia = response.data.payload;
      commit('setFamilia', familia);
    }catch (error){
      console.error(error);
    }
},
  async getPastoreoFamilias({commit}, {periodo, tipo}){
    try{
      if (tipo === "Alpacas"){
        tipo = 'Alpaca'
      } else {
        tipo = 'Ovino'
      }
      const response = await axios.get(`http://localhost:8085/api/familia_pastoreo/listar/${periodo}/${tipo}?per_page=10&page=1`);
      const pastoreoFamilias = response.data.payload;
      commit('setPastoreoFamilias', pastoreoFamilias);
    }catch (error){
      console.error(error);
    }
  },
  async getPastoreoFamilia({ commit }, {idFamilia, periodo, tipo}) {
    try{
      if (tipo === "Alpacas"){
        tipo = 'Alpaca'
      } else {
        tipo = 'Ovino'
      }
      const response = await axios.get(`http://localhost:8085/api/familia_pastoreo/listar/${periodo}/${tipo}?per_page=10&page=1`);
      const pastoreoFamilia = response.data.payload;
      const familias = [];
      for(const item of pastoreoFamilia) {
        if (item.idFamilia == idFamilia) {
          familias.push(item);
        }
      }
      commit('setPastoreoFamilia', familias);
    } catch (error){
      console.error(error);
    }
  },
  async registerPastoreo({ commit }, {payload}) {
    try{
      const response = await axios.post(`http://localhost:8085/api/familia_pastoreo/crear`, payload)
    } catch (error){
      console.error(error);
    }
  }
};

export const mutations = {
  setPastoreoFamilia(_state, pastoreoFamilia) {
    _state.pastoreoFamilia = pastoreoFamilia;
  },
  setPeriodo(_state, periodo) {
    _state.periodo = periodo;
  },
  setPastoreoFamilias(_state, pastoreoFamilias) {
    _state.pastoreoFamilias = pastoreoFamilias;
  },
  setFamilia(_state, familia) {
    _state.familia = familia;
  }
};
