<template>
  <div>
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
    observacion: 'Contagio de una enfermedad de la piel'
  }),
}
</script>

<style scoped>

</style>
