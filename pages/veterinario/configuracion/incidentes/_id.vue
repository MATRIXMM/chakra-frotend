<template>
  <div>
    <div v-if="this.diasSeguimiento > 0" style="margin: 10px; margin-bottom: 30px">
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
        width="600px"
      >
        <v-card-title style="background: #FFEAB5">
          <div
            solo
            hide-details
            disabled
          >
            {{nombreAnimal}}: {{observacion}}
          </div>
        </v-card-title>
      </v-card>
    </div>
    <v-divider style="margin-top: 30px; margin-bottom: 30px"/>
    <Alimentacion />
    <v-divider style="margin-top: 30px; margin-bottom: 30px"/>
    <CuidadoSanitario />
    <v-divider style="margin-top: 30px; margin-bottom: 30px"/>
    <Resultado />
  </div>
</template>

<script>
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
    diasSeguimiento: 2,
  }),
}
</script>

<style scoped>

</style>
