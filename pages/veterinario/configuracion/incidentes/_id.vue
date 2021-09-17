<template>
  <div>
    <Alimentacion />
    <v-divider style="margin-top: 30px; margin-bottom: 30px"/>
    <CuidadoSanitario />
  </div>
</template>

<script>
import Alimentacion from "@/components/veterinario/configuracion/incidencias/Alimentacion";
import CuidadoSanitario from "@/components/veterinario/configuracion/incidencias/CuidadoSanitario";

export default {
  name: "DetalleIncidentes",
  components: {
    Alimentacion: Alimentacion,
    CuidadoSanitario: CuidadoSanitario,
  },
  data: () => ({
  }),
}
</script>

<style scoped>

</style>
