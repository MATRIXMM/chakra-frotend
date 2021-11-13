import axios from "axios";

export const state = () => ({
  familias: [],
  nombreFamilia: '',
  family: [],
});

async function getValidarAlimentacion({idFamilia}) {
  try{
    const response = await axios.get(`http://localhost:8085/api/familia_alimentacion_horario/validar/${idFamilia}`);
    //console.log('Response validation alimentacion', response.data.status);
    if (response.data.status === 'OK') {
      return true;
    }
  } catch (error){
  }
  return false;
}
async function getValidarPastoreo({idFamilia}) {
  try{
    const response = await axios.get(`http://localhost:8085/api/familia_pastoreo/validar/${idFamilia}`);
    if (response.data.status === 'OK') {
      return true;
    }
  } catch (error){
  }
  return false;
}
async function getValidarCuidadoSanitario({idFamilia}) {
  try{
    const response = await axios.get(`http://localhost:8085/api/familia_cuidado_sanitario/validar/${idFamilia}`);
    if (response.data.status === 'OK') {
      return true;
    }
  } catch (error){
  }
  return false;
}

export const actions = {
  async getFamilia({ commit }, {idFamilia}) {
    try{
      await axios.get(`http://localhost:8085/api/familia_animal/validar/${idFamilia}`).then((response) => {
        commit('setNombreFamilia', response.data.payload.nombre);
        //console.log("Imprime resultado de familia", response.data.payload.nombre);
      });
    } catch (error){
      console.error(error);
    }
  },
  async getFamilias({ commit }, {periodo, tipo}) {
    //const periodo = '2021-1';
    if (tipo === "Alpacas"){
      tipo = 'Alpaca'
    } else {
      tipo = 'Ovino'
    }
    const response = await axios.get(`http://localhost:8085/api/familia_animal/listar/${periodo}/${tipo}?per_page=10&page=1`);
    //console.log('consumiendo la API', response.data.payload);
    const familias = response.data.payload;
    for (const item of familias) {
      const a = await getValidarAlimentacion({idFamilia: item.idFamilia});
      const b = await getValidarPastoreo({idFamilia: item.idFamilia});
      const c = await getValidarCuidadoSanitario({idFamilia: item.idFamilia})
      item.validacion = a && b && c;
    }
    commit('setFamilias', familias);
  },
  async registarFamilia({ commit }, {periodo, payload}) {
    try {
      const response = await axios.post(`http://localhost:8085/api/familia_animal/crear/${periodo}`, payload);
    } catch(error){
      console.error(error);
    }
  },
  async getFamily({commit}, {periodo, tipo}){
    try{
      if (tipo === "Alpacas"){
        tipo = 'Alpaca'
      } else {
        tipo = 'Ovino'
      }
      const response = await axios.get(`http://localhost:8085/api/familia_animal/listar/${periodo}/${tipo}?per_page=10&page=1`);
      const family = response.data.payload;
      commit('setFamily', family);
    }catch(error){
      console.error(error);
    }
  }
};

export const mutations = {
  setFamilias(_state, familias) {
    _state.familias = familias;
  },
  setNombreFamilia(_state, nombreFamilia) {
    _state.nombreFamilia = nombreFamilia;
  },
  setFamily(_state, family) {
    _state.family = family;
  },
};

