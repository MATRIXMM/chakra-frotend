<template>
  <div style="padding: 20px">
    <v-row style="display: flex; margin: 0px 0px 5px;align-items: center">
      <v-col md="10" style="padding: 0">
        <h2>
          Seguimiento de actividades de alimentación de {{this.animal.name}}
        </h2>
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
    <VDivider />
    <v-row style="display: flex; margin: 10px 0px 0px;align-items: center">
      <v-col md="2" style="padding: 0px">
        Seleccione el mes:
      </v-col>
      <v-col md="2" style="padding: 0px">
        <v-select
          v-model="periodoActual"
          :items="periodos"
          solo
          hide-details
        ></v-select>
      </v-col>
      <v-col md="1">
      </v-col>
      <v-col md="2" style="padding: 0px; display: flex; justify-content: initial">
        Seleccione la familia:
      </v-col>
      <v-col md="2" style="padding: 0px">
        <v-select
          v-model="periodoActual"
          :items="periodos"
          solo
          hide-details
        ></v-select>
      </v-col>
    </v-row>
    <v-card style="margin-top: 100px">
      <v-card-title style="">
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
        v-if="incidencias"
        :headers="headers"
        :items="incidencias"
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
  name: "Alimentacion",
  data: () => ({
    currentDay: new Date(),
    periodos: ['2021-2'],
    periodoActual: '2021-2',
    search: '',
    estadoRealizado: false,
    icons: {
      mdiCheckboxMarkedCircle,
      mdiAlert
    },
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: false,
        value: 'nombreAnimal',
      },
      { text: 'Familia', value: 'nombreFamilia' },
      { text: 'Fecha de registro', value: 'fechaRegistro' },
      { text: 'Gravedad', value: 'gravedad' },
      { text: 'Detalle de observación', value: 'detalleObservacion' },
    ],
    incidencias: [
      {
        nombreAnimal: 'Perico',
        nombreFamilia: 'Familia 1',
        fechaRegistro: '2021/05/06',
        gravedad: 'Alta',
        detalleObservacion: 'Contagio de una enfermedad de la piel'
      },
      {
        nombreAnimal: 'Pedro',
        nombreFamilia: 'Familia 2',
        fechaRegistro: '2021/06/06',
        gravedad: 'Baja',
        detalleObservacion: 'Ingesta de un alimento suministrado incorrectamente'
      }
    ]
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
