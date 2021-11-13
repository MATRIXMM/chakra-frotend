<template>
  <div>
    <h1>
      Configuración > Familia de {{ this.animal.name }} registrados > {{this.incidenteSeleccionado.nombreAnimal}}
    </h1>
    <div :key="keyLinear" v-if="this.diasSeguimiento > 0" style="margin: 10px 10px 30px;">
      <p>Periodo de seguimiento disponible por {{this.diasSeguimiento}} días</p>
      <v-progress-linear
        v-model="porcentaje"
        height="25"
        style="margin-bottom: 30px"
      >
        <strong>{{ Math.ceil(porcentaje) }}%</strong>
      </v-progress-linear>
      <v-row>
        <v-col md="10">
          <strong>
            Día inicial
          </strong>
        </v-col>
        <v-col md="2" style="justify-content: right; display: flex">
          <strong>
            Día final
          </strong>
        </v-col>
      </v-row>
    </div>
    <v-divider style="margin-top: 30px; margin-bottom: 30px"/>
    <div style="margin: 10px">
      <v-card
        elevation="2"
        width="700px"
      >
        <v-card-title style="background: #FFEAB5">
          <div
            solo
            hide-details
            disabled
          >
            {{this.incidenteSeleccionado.nombreAnimal}}: {{this.incidenteSeleccionado.observacion}}
          </div>
        </v-card-title>
      </v-card>
    </div>
    <v-divider style="margin-top: 30px; margin-bottom: 30px"/>
    <Alimentacion @getDays="getDays" :id-incidente="this.$route.params.id" />
    <v-divider style="margin-top: 30px; margin-bottom: 30px"/>
    <CuidadoSanitario :id-incidente="this.$route.params.id" />
    <v-divider style="margin-top: 30px; margin-bottom: 30px"/>
    <Resultado :id-incidente="this.$route.params.id" />
  </div>
</template>

<script>
import {mapState} from "vuex";
import Alimentacion from "@/components/veterinario/configuracion/incidencias/Alimentacion";
import CuidadoSanitario from "@/components/veterinario/configuracion/incidencias/CuidadoSanitario";
import Resultado from "@/components/veterinario/configuracion/incidencias/Resultado";

export default {
  name: "DetalleIncidentes",
  layout: "main",
  components: {
    Alimentacion: Alimentacion,
    CuidadoSanitario: CuidadoSanitario,
    Resultado: Resultado,
  },
  data: () => ({
    nombreAnimal: 'Pedro',
    observacion: 'Contagio de una enfermedad de la piel',
    porcentaje: 2,
    diasSeguimiento: 0,
    keyLinear: 10,
  }),
  methods: {
    getDays({ diasSeguimiento }){
      this.diasSeguimiento = diasSeguimiento;
      this.keyLinear += 1;
    },
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
      periodo: state => state.veterinario.pastoreo.periodo,
      incidenteSeleccionado: state => state.admin.sanitario.incidenteSeleccionado,
    }),
  },
}
</script>

<style scoped>

</style>
