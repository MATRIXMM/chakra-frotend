<template>
  <div style="padding: 20px">
    <h2 v-if="this.animal.name === 'ovinos' ">
      Familia de Ovinos registrados
    </h2>
    <h2 v-else>
      Familia de Alpacas registradas
    </h2>
    <VDivider />
    <v-row style="display: flex; margin: 0px; margin-top: 10px; align-items: center">
      <v-col v-if="this.animal.name === 'ovinos'" md="10" style="padding: 0px">
        Listado de Ovinos registrados por familias
      </v-col>
      <v-col v-else md="10" style="padding: 0px">
        Listado de Alpacas registradas por familias
      </v-col>
      <v-col md="1" style="padding: 0px">
        Periodo:
      </v-col>
      <v-col md="1" style="padding: 0px">
        <v-select
          v-model="periodoActual"
          :items="periodos"
          solo
          hide-details
        ></v-select>
      </v-col>
    </v-row>
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
        v-if="familia"
        :headers="headers"
        :items="familia"
        :search="search"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {mdiAlert, mdiCheckboxMarkedCircle} from "@mdi/js";
import {mapState} from "vuex";

export default {
  layout: 'main',
  name: "index",
  data: () => ({
    periodos: ['2021-2'],
    periodoActual: '2021-2',
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
      { text: 'Número de animales', value: 'cantidadFamilia' },
      { text: 'Anmimales en seguimiento', value: 'cantidadSeguimiento' },
      { text: 'Característica', value: 'caracteristica' },
    ],
    familia: [
      {
        "idFamilia": 1,
        "nombreFamilia": "Familia 1",
        "cantidadFamilia": 14,
        "caracteristica": "Caracteristica A",
        "cantidadEventosRealizados": 1,
        "cantidadEventosTotal": 2,
        "cantidadSeguimiento": 5,
      },
      {
        "idFamilia": 2,
        "nombreFamilia": "Familia 2",
        "cantidadFamilia": 14,
        "caracteristica": "Caracteristica B",
        "cantidadEventosRealizados": 1,
        "cantidadEventosTotal": 2,
        "cantidadSeguimiento": 2,
      },
      {
        "idFamilia": 3,
        "nombreFamilia": "Familia 3",
        "cantidadFamilia": 14,
        "caracteristica": "Caracteristica C",
        "cantidadEventosRealizados": 1,
        "cantidadEventosTotal": 2,
        "cantidadSeguimiento": 0,
      }
    ],
  }),
  computed: {
    ...mapState({
      animal: state => state.animal,
    }),
  },
}
</script>

<style scoped>

</style>
