<template>
  <div style="padding: 15px; margin: 15px">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="#1976D2"
      grow
    >
      <v-tab
        v-for="name in nameTabs"
        :key="name"
      >
        {{ name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="margin-top: 20px">
      <v-tab-item
        v-for="n in 4"
        :key="n"
      >
        <div v-if="n === 1" style="padding: 15px">
          <Alimentacion />
        </div>
        <div v-if="n === 2" style="padding: 15px">
          <Pastoreo />
        </div>
        <div v-if="n === 3" style="padding: 15px">
          <CuidadoSanitario />
        </div>
        <div v-if="n === 4" style="padding: 15px">
          hola4
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>

import Alimentacion from "@/components/granjero/Alimentacion";
import Pastoreo from "@/components/granjero/Pastoreo";
import CuidadoSanitario from "@/components/granjero/CuidadoSanitario";

export default {
  layout: 'main',
  name: "index",
  components: {
    Alimentacion: Alimentacion,
    Pastoreo: Pastoreo,
    CuidadoSanitario: CuidadoSanitario,
  },
  data: () => ({
    tab: null,
    nameTabs: ['Alimentacion', 'Pastoreo', 'Cuidado Sanitario', 'Historial sanitario'],
  }),
}
</script>

<style scoped>

</style>
