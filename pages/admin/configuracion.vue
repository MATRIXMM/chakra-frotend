<template>
  <div>
    <h2 class="headline">Configuración de la sección de crianza</h2>
    <v-divider class="mt-2 mb-4"></v-divider>
    <v-row justify="space-between">
      <v-col md="auto">
        <p>
          Seleccione las actividades de crianza que desea ser visualizada por el
          granjero
        </p>
      </v-col>
      <v-col md="auto">
        <v-btn rounded outlined color="primary">Cancelar</v-btn>
        <v-btn rounded color="primary" depressed>Guardar</v-btn>
      </v-col>
    </v-row>
    <v-sheet class="pa-5">
      <v-switch
        v-for="(switc, idx) in switches"
        :key="idx"
        v-model="switc.value"
        inset
        :label="switc.name"
      ></v-switch>
    </v-sheet>
  </div>
</template>
<script>
export default {
  layout: "main",
  data() {
    return {
      switches: [
        {
          name: 'Alimentación',
          value: true,
        },
        {
          name: 'Pastoreo',
          value: true,
        },
        {
          name: 'Cuidado Sanitario',
          value: true,
        }
      ]
    };
  },
};
</script>
