<template>
  <div style="padding: 20px">
    <h2>
      Configuracion de reglas de crianza para alpacas con incidentes
    </h2>
    <VDivider />
    <h5>
      Seleccione la familia que desea configurar las reglas de crianza
    </h5>
    <v-card style="margin-top: 100px">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Busca por nombre de familia"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="incidentes"
        :search="search"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mdiCheckboxMarkedCircle, mdiAlert  } from '@mdi/js';

export default {
  name: "IncidentesRegistrados",
  data: () => ({
    search: '',
    icons: {
      mdiCheckboxMarkedCircle,
      mdiAlert
    },
    headers: [
      {
        text: 'Familia',
        align: 'start',
        sortable: false,
        value: 'nombreFamilia',
      },
      { text: 'Nombre', value: 'nombreAnimal' },
      { text: 'Fecha de registro', value: 'fechaRegistro' },
      { text: 'Detalle de observación', value: 'detalleObservacion' },
      { text: 'Estado de configuración', value: 'configuration' },
    ],
    incidentes: [],
  }),
  methods: {
  },
}
</script>

<style scoped>

</style>
