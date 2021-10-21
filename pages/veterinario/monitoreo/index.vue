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
          <Alimentacion />
        </div>
        <div v-if="n === 2" style="padding: 15px">
          <CuidadoSanitario />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Alimentacion from "@/components/veterinario/monitoreo/Alimentacion";
import CuidadoSanitario from "@/components/veterinario/monitoreo/CuidadoSanitario";

export default {
  name: "index",
  layout: 'main',
  components: {
    Alimentacion: Alimentacion,
    CuidadoSanitario: CuidadoSanitario,
  },
  data: () => ({
    tab: null,
    nameTabs: ['ALIMENTACION', 'CUIDADO SANITARIO'],
  }),
  computed: {
    ...mapState({
      animal: state => state.animal,
    }),
  },
  methods: {
  },
  mounted() {
    console.log("El animal seleccionado es", this.animal.name);
  }
}
</script>

<style scoped>

</style>
