<template>
  <div>
    <Alimentacion :idAlimentacion="this.$route.params.id"/>
    <Pastoreo />
  </div>
</template>

<script>

import Pastoreo from "@/components/veterinario/configuracion/Pastoreo";
import Alimentacion from "@/components/veterinario/configuracion/Alimentacion";

export default {
  name: "DetalleRegistradas",
  components: {
    Pastoreo: Pastoreo,
    Alimentacion: Alimentacion,
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
