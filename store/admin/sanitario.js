import axios from "axios";

export const state = () => ({
  incidentes: [],
  incidentesValidaciones: [],
  incidenteSeleccionado: {},
});

async function getValidarAlimentacionIncidente({idIncidencia}) {
  try{
    const response = await axios.get(`http://localhost:8085/api/familia_incidencia_alimentacion_horario/validar/${idIncidencia}`);
    //console.log('Response validation alimentacion', response.data.status);
    if (response.data.status === 'OK') {
      return true;
    }
  } catch (error){
  }
  return false;
}
async function getValidarCuidadoSanitarioIncidente({idIncidencia}) {
  try{
    const response = await axios.get(`http://localhost:8085/api/familia_incidencia_cuidado_sanitario/validar/${idIncidencia}`);
    if (response.data.status === 'OK') {
      return true;
    }
  } catch (error){
  }
  return false;
}

export const actions = {
  async getIncidentesValidaciones({ commit }, {periodo, tipo}) {
    //const periodo = '2021-1';
    if (tipo === "Alpacas"){
      tipo = 'Alpaca'
    } else {
      tipo = 'Ovino'
    }
    const response = await axios.get(`http://localhost:8085/api/familia_incidencia/listar/${periodo}/${tipo}?per_page=10&page=1`);
    const incidentes = response.data.payload;
    for (const item of incidentes) {
      const a = await getValidarAlimentacionIncidente({idIncidencia: item.idIncidencia});
      const b = await getValidarCuidadoSanitarioIncidente({idIncidencia: item.idIncidencia});
      item.validacion = a && b;
    }
    commit('setIncidentesValidaciones', incidentes);
  },
  async getIncidentes({ commit }, {periodo, tipo}) {
    //const periodo = '2021-1';
    if (tipo === "Alpacas"){
      tipo = 'Alpaca'
    } else {
      tipo = 'Ovino'
    }
    const response = await axios.get(`http://localhost:8085/api/familia_incidencia/listar/${periodo}/${tipo}?per_page=10&page=1`);
    console.log('consumiendo la API', response.data.payload);
    const incidentes = response.data.payload;
    commit('setIncidentes', incidentes);
  },
  async registrarIncidencia({commit}, {payload}) {
    try{
      const response = await axios.post(`http://localhost:8085/api/familia_incidencia/crear`, payload)
    } catch (error){
      console.error(error);
    }
  },
  setRowIncidente({ commit }, {incidenteSeleccionado}) {
    const incidente = {
      cantidadAnimales: incidenteSeleccionado.cantidadAnimales,
      fechaRegistro: incidenteSeleccionado.fechaRegistro,
      gravedadIncidencia: incidenteSeleccionado.gravedadIncidencia,
      idFamilia: incidenteSeleccionado.idFamilia,
      idIncidencia: incidenteSeleccionado.idIncidencia,
      nombreAnimal: incidenteSeleccionado.nombreAnimal,
      nombreFamilia: incidenteSeleccionado.nombreFamilia,
      observacion: incidenteSeleccionado.observacion,
      resultado: incidenteSeleccionado.resultado,
      validacion: incidenteSeleccionado.validacion,
    };
    commit('setIncidenteSeleccionado',incidente)
  },
};

export const mutations = {
  setIncidentes(_state, incidentes) {
    _state.incidentes = incidentes;
  },
  setIncidentesValidaciones(_state, incidentes) {
    _state.incidentesValidaciones = incidentes;
  },
  setIncidenteSeleccionado(_state, incidente) {
    _state.incidenteSeleccionado = incidente
  },
};

