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

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="n in 2"
        :key="n"
      >
        <div v-if="">

        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
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
