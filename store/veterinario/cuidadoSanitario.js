import axios from "axios";

export const state = () => ({
  cuidadoSanitarioFamilia: [],
  cuidadoSanitarioIncidente: [],
  cuidadoSanitarioFamilias: [],
  cuidadoSanitarioIncidentes: [],
});

export const actions = {
  async getCuidadoSanitarioFamilias({commit}, {periodo, tipo}) {
    try{
      if (tipo === "Alpacas"){
        tipo = 'Alpaca'
      } else {
        tipo = 'Ovino'
      }
      let cuidadoSanitarioFamilias;
      await axios.get(`http://localhost:8085/api/familia_cuidado_sanitario/listar/${periodo}/${tipo}?per_page=10&page=1`).then(async (response) => {
        cuidadoSanitarioFamilias = response.data.payload;
        for (const item of cuidadoSanitarioFamilias){
          const response2 = await axios.get(`http://localhost:8085/api/familia_animal/validar/${item.idFamilia}`);
          item.nombreFamilia = response2.data.payload.nombre;
        }
      });
      commit('setCuidadoSanitarioFamilias', cuidadoSanitarioFamilias);
    } catch (error){
      console.error(error);
    }
  },
  async getCuidadoSanitarioIncidentes({commit}, {periodo, tipo}) {
    try{
      if (tipo === "Alpacas"){
        tipo = 'Alpaca'
      } else {
        tipo = 'Ovino'
      }
      let cuidadoSanitarioIncidentes;
      await axios.get(`http://localhost:8085/api/familia_incidencia_cuidado_sanitario/listar/${periodo}/${tipo}?per_page=10&page=1`).then(async (response) => {
        cuidadoSanitarioIncidentes = response.data.payload;
        for (const item of cuidadoSanitarioIncidentes){
          const response2 = await axios.get(`http://localhost:8085/api/familia_animal/validar/${item.idFamilia}`);
          item.nombreFamilia = response2.data.payload.nombre;
        }
      });
      commit('setCuidadoSanitarioIncidentes', cuidadoSanitarioIncidentes);
    } catch (error){
      console.error(error);
    }
  },
  async getCuidadoSanitario({ commit }, {idFamilia, periodo, tipo}) {
    try{
      if (tipo === "Alpacas"){
        tipo = 'Alpaca'
      } else {
        tipo = 'Ovino'
      }
      const response = await axios.get(`http://localhost:8085/api/familia_cuidado_sanitario/listar/${periodo}/${tipo}?per_page=10&page=1`);
      const cuidadoSanitarioFamilia = response.data.payload;
      const familias = [];
      for(const item of cuidadoSanitarioFamilia) {
        if (item.idFamilia == idFamilia) {
          familias.push(item);
        }
      }
      commit('setCuidadoSanitarioFamilia', familias);
    } catch (error){
      console.error(error);
    }
  },
  async getCuidadoSanitarioIncidencia({ commit }, {idIncidencia, periodo, tipo}) {
    try{
      if (tipo === "Alpacas"){
        tipo = 'Alpaca'
      } else {
        tipo = 'Ovino'
      }
      const response = await axios.get(`http://localhost:8085/api/familia_incidencia_cuidado_sanitario/listar/${periodo}/${tipo}?per_page=10&page=1`);
      const cuidadoSanitarioIncidente = response.data.payload;
      const incidentes = [];
      for(const item of cuidadoSanitarioIncidente) {
        if (item.idIncidencia == idIncidencia) {
          incidentes.push(item);
        }
      }
      console.log('imprime las incidencias', incidentes);
      commit('setCuidadoSanitarioIncidente', incidentes);
    } catch (error){
      console.error(error);
    }
  },
  async registerCuidadoSanitario({ commit }, {payload}) {
    try{
      const response = await axios.post(`http://localhost:8085/api/familia_cuidado_sanitario/crear`, payload)
    } catch (error){
      console.error(error);
    }
  },
  async registerCuidadoSanitarioIncidencia({ commit }, {payload}) {
    try{
      console.log('Lo que entra al register es', payload);
      const response = await axios.post(`http://localhost:8085/api/familia_incidencia_cuidado_sanitario/crear`, payload)
    } catch (error){
      console.error(error);
    }
  },
};

export const mutations = {
  setCuidadoSanitarioFamilia(_state, cuidadoSanitarioFamilia) {
    _state.cuidadoSanitarioFamilia = cuidadoSanitarioFamilia;
  },
  setCuidadoSanitarioFamilias(_state, cuidadoSanitarioFamilias) {
    _state.cuidadoSanitarioFamilias = cuidadoSanitarioFamilias;
  },
  setCuidadoSanitarioIncidente(_state, cuidadoSanitarioIncidente) {
    _state.cuidadoSanitarioIncidente = cuidadoSanitarioIncidente;
  },
  setCuidadoSanitarioIncidentes(_state, cuidadoSanitarioIncidentes) {
    _state.cuidadoSanitarioIncidentes = cuidadoSanitarioIncidentes;
  },
};
