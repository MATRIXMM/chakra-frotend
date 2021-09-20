<template>
  <div>
    <Alimentacion :idAlimentacion="this.$route.params.id"/>
    <v-divider style="margin-top: 30px; margin-bottom: 30px"/>
    <Pastoreo />
    <v-divider style="margin-top: 30px; margin-bottom: 30px"/>
    <CuidadoSanitario />
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
  }),
  methods: {
  },
  mounted() {
    console.log('imprime el id de la pagina', this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
