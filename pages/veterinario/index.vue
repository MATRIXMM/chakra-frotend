<template>
  <div>
    <Alimentacion />
    <Pastoreo />
  </div>
</template>

<script>

import Pastoreo from "@/components/veterinario/configuracion/Pastoreo";
import Alimentacion from "@/components/veterinario/configuracion/Alimentacion";

export default {
  name: "index",
  components: {
    Pastoreo: Pastoreo,
    Alimentacion: Alimentacion,
  },
  data: () => ({
  }),
  methods: {
  },
}
</script>

<style scoped>

</style>
