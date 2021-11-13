<template>
  <div>
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
            <MonitoreoFamilias />
          </div>
          <div v-if="n === 2" style="padding: 15px">
            <MonitoreoSanitario />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
import MonitoreoFamilias from "@/components/admin/MonitoreoFamilias";
import MonitoreoSanitario from "@/components/admin/MonitoreoSanitario";

export default {
  layout: "main",
  components: {
    MonitoreoFamilias: MonitoreoFamilias,
    MonitoreoSanitario: MonitoreoSanitario,
  },
  data: () => ({
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
      this.nameTabs.push(`Monitoreo de ${nombreAnimal}`);
      this.nameTabs.push(`Monitoreo sanitario de ${nombreAnimal}`);
    },
  },
  mounted() {
    console.log("El animal seleccionado es", this.animal.name);
    this.getNameTabs(this.animal.name);
  }
};
</script>
