import axios from "axios";

export const state = () => ({
  validarAlimentacion: false,
  validarPastoreo: false,
  validarCuidadoSanitario: false,
  validarAlimentacionIncidente: false,
  validarCuidadoSanitarioIncidente: false,
});

export const actions = {
  async getValidarAlimentacion({ commit }, {idFamilia}) {
    commit('setValidarAlimentacion', false);
    try{
      const response = await axios.get(`http://localhost:8085/api/familia_alimentacion_horario/validar/${idFamilia}`);
      if (response.data.status === 'OK') {
        commit('setValidarAlimentacion', true);
      }
    } catch (error){
    }
  },
  async getValidarAlimentacionIncidente({ commit }, {idIncidencia}) {
    commit('setValidarAlimentacionIncidente', false);
    try{
      const response = await axios.get(`http://localhost:8085/api/familia_incidencia_alimentacion_horario/validar/${idIncidencia}`);
      if (response.data.status === 'OK') {
        commit('setValidarAlimentacionIncidente', true);
      }
    } catch (error){
    }
  },
  async getValidarPastoreo({ commit }, {idFamilia}) {
    commit('setValidarPastoreo', false);
    try{
      const response = await axios.get(`http://localhost:8085/api/familia_pastoreo/validar/${idFamilia}`);
      if (response.data.status === 'OK') {
        commit('setValidarPastoreo', true);
      }
    } catch (error){
      commit('setValidarPastoreo', false);
    }
  },
  async getValidarCuidadoSanitario({ commit }, {idFamilia}) {
    commit('setValidarCuidadoSanitario', false)
    try{
      const response = await axios.get(`http://localhost:8085/api/familia_cuidado_sanitario/validar/${idFamilia}`);
      if (response.data.status === 'OK') {
        commit('setValidarCuidadoSanitario', true);
      }
    } catch (error){
      commit('setValidarCuidadoSanitario', false);
    }
  },
  async getValidarCuidadoSanitarioIncidente({ commit }, {idIncidencia}) {
    commit('setValidarCuidadoSanitarioIncidente', false)
    try{
      const response = await axios.get(`http://localhost:8085/api/familia_incidencia_cuidado_sanitario/validar/${idIncidencia}`);
      if (response.data.status === 'OK') {
        commit('setValidarCuidadoSanitarioIncidente', true);
      }
    } catch (error){
      commit('setValidarCuidadoSanitarioIncidente', false);
    }
  },
};

export const mutations = {
  setValidarAlimentacion(_state, value) {
    _state.validarAlimentacion = value;
  },
  setValidarAlimentacionIncidente(_state, value) {
    _state.validarAlimentacionIncidente = value;
  },
  setValidarPastoreo(_state, value) {
    _state.validarPastoreo = value;
  },
  setValidarCuidadoSanitario(_state, value) {
    _state.validarCuidadoSanitario = value;
  },
  setValidarCuidadoSanitarioIncidente(_state, value) {
    _state.validarCuidadoSanitarioIncidente = value;
  },

};

