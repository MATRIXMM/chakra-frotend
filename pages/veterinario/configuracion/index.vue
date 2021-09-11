<template>
  <div style="padding: 15px; margin: 15px">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
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
        v-for="n in 2"
        :key="n"
      >
        <div v-if="n === 1" style="padding: 15px">
          <AlpacasRegistradas />
        </div>
        <div v-if="n === 2" style="padding: 15px">
          <h1>esto es del segundo</h1>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>

import AlpacasRegistradas from "@/components/veterinario/configuracion/AlpacasRegistradas";

export default {
  components: {
    AlpacasRegistradas: AlpacasRegistradas,
  },
  name: "index",
  data: () => ({
    nameTabs: ['FAMILIAS DE ALPACAS REGISTRADAS', 'INCIDENTES DE ALPACAS REGISTRADAS'],
    tab: null,
  }),
  methods: {
  },
}
</script>

<style scoped>

</style>
