<template>
  <div>
    <h1>
      Configuración > Familia de animales registrados > {{this.$route.params.id}}
    </h1>
    <div v-if="registrado" style="margin: 10px 10px 30px;">
      <p>Periodo de configuración disponible por 6 meses</p>
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
            Enero
          </strong>
        </v-col>
        <v-col md="2" style="justify-content: right; display: flex">
          <strong>
            Junio
          </strong>
        </v-col>
      </v-row>
    </div>
    <v-divider style="margin-top: 30px; margin-bottom: 30px"/>
    <Alimentacion :id-incidente="this.$route.params.id" @config="config" />
    <v-divider style="margin-top: 30px; margin-bottom: 30px"/>
    <Pastoreo :id-incidente="this.$route.params.id" />
    <v-divider style="margin-top: 30px; margin-bottom: 30px"/>
    <CuidadoSanitario :id-incidente="this.$route.params.id" />
  </div>
</template>

<script>

import Pastoreo from "@/components/veterinario/configuracion/Pastoreo";
import Alimentacion from "@/components/veterinario/configuracion/Alimentacion";
import CuidadoSanitario from "@/components/veterinario/configuracion/CuidadoSanitario";

export default {
  name: "DetalleRegistradas",
  layout: "main",
  components: {
    Pastoreo: Pastoreo,
    Alimentacion: Alimentacion,
    CuidadoSanitario: CuidadoSanitario,
  },
  data: () => ({
    porcentaje: 1,
    registrado: false,
  }),
  methods: {
    config({ value }){
      this.registrado = value;
    }
  },
  mounted() {
    //console.log('imprime el id de la pagina', this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
