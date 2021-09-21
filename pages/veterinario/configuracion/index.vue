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
        v-for="n in 2"
        :key="n"
      >
        <div v-if="n === 1" style="padding: 15px">
          <FamiliasRegistradas :nombreAnimal="animal.name" />
        </div>
        <div v-if="n === 2" style="padding: 15px">
          <IncidentesRegistrados :nombreAnimal="animal.name" />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>

import FamiliasRegistradas from "@/components/veterinario/configuracion/FamiliasRegistradas";
import IncidentesRegistrados from "@/components/veterinario/configuracion/IncidentesRegistrados";
import {mapState} from "vuex";

export default {
  components: {
    FamiliasRegistradas: FamiliasRegistradas,
    IncidentesRegistrados: IncidentesRegistrados,
  },
  name: "index",
  layout: "main",
  data: () => ({
    //nameTabs: ['familias DE ALPACAS REGISTRADAS', 'INCIDENTES DE ALPACAS REGISTRADAS'],
    tab: null,
    nameTabs: [],
  }),
  computed: {
    ...mapState({
      animal: state => state.animal,
    }),
  },
  methods: {
    getNameTabs(nombreAnimal) {
      this.nameTabs.push(`familias de ${nombreAnimal} registradas`);
      this.nameTabs.push(`incidentes de ${nombreAnimal} registradas`);
    },
  },
  mounted() {
    console.log("El animal seleccionado es", this.animal.name);
    this.getNameTabs(this.animal.name);
  }
}
</script>

<style scoped>

</style>
