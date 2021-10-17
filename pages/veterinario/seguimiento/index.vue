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
        v-for="n in 3"
        :key="n"
      >
        <div v-if="n === 1" style="padding: 15px">
          primero
        </div>
        <div v-if="n === 2" style="padding: 15px">
          segundo
        </div>
        <div v-if="n === 3" style="padding: 15px">
          tercero
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "index",
  layout: 'main',
  data: () => ({
    tab: null,
    nameTabs: ['ALIMENTACION', 'PASTOREO', 'CUIDADO SANITARIO'],
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
