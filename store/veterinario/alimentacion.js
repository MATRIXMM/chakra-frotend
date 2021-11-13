import axios from "axios";

export const state = () => ({
  alimentacionFamilia: {},
  alimentacionIncidente: {},
  alimentacionFamilias: [],
  alimentacionIncidentes: [],
});

export const actions = {
  async getAlimentacionFamilias({ commit }, {periodo, tipo}) {
    try{
      if (tipo === "Alpacas"){
        tipo = 'Alpaca'
      } else {
        tipo = 'Ovino'
      }
      const response = await axios.get(`http://localhost:8085/api/familia_alimentacion_horario/listar/${periodo}/${tipo}?per_page=10&page=1`);
      const alimentacionFamilias = response.data.payload;
      commit('setAlimentacionFamilias', alimentacionFamilias);
    } catch (error){
      console.error(error);
    }
  },
  async getAlimentacionIncidencias({ commit }, {periodo, tipo}) {
    try{
      if (tipo === "Alpacas"){
        tipo = 'Alpaca'
      } else {
        tipo = 'Ovino'
      }
      const response = await axios.get(`http://localhost:8085/api/familia_incidencia_alimentacion_horario/listar/${periodo}/${tipo}?per_page=10&page=1`);
      const alimentacionIncidentes = response.data.payload;
      commit('setAlimentacionIncidentes', alimentacionIncidentes);
    } catch (error){
      console.error(error);
    }
  },
  async getAlimentacionFamilia({ commit }, {idFamilia}) {
    try{
      const response = await axios.get(`http://localhost:8085/api/familia_alimentacion_horario/validar/${idFamilia}`);
      //console.log('Response validation alimentacion', response.data.status);
      const alimentacionFamilia = response.data.payload;
      commit('setAlimentacionFamilia', alimentacionFamilia);
    } catch (error){
      console.error(error);
    }
  },
  async registerAlimentacion({ commit }, {payload}) {
    try{
      const response = await axios.post(`http://localhost:8085/api/familia_alimentacion_horario/crear`, payload)
    } catch (error){
      console.error(error);
    }
  },
  async getAlimentacionIncidente({ commit }, {idIncidente}) {
    try{
      const response = await axios.get(`http://localhost:8085/api/familia_incidencia_alimentacion_horario/validar/${idIncidente}`);
      //console.log('Response validation alimentacion', response.data.status);
      const alimentacionIncidente = response.data.payload;
      commit('setAlimentacionIncidente', alimentacionIncidente);
    } catch (error){
      console.error(error);
    }
  },
  async registerAlimentacionIncidente({ commit }, {payload}) {
    try{
      const response = await axios.post(`http://localhost:8085/api/familia_incidencia_alimentacion_horario/crear`, payload)
    } catch (error){
      console.error(error);
    }
  }
};

export const mutations = {
  setAlimentacionFamilia(_state, alimentacionFamilia) {
    _state.alimentacionFamilia = alimentacionFamilia;
  },
  setAlimentacionIncidente(_state, alimentacionIncidente) {
    _state.alimentacionIncidente = alimentacionIncidente;
  },
  setAlimentacionFamilias(_state, alimentacionFamilias) {
    _state.alimentacionFamilias = alimentacionFamilias;
  },
  setAlimentacionIncidentes(_state, alimentacionIncidentes) {
    _state.alimentacionIncidentes = alimentacionIncidentes;
  },
};

