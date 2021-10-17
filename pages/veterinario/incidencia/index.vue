<template>
  <div style="padding: 20px">
    <h2>
      Historial de incidencias registradas de {{this.animal.name}} mensuales
    </h2>
    <VDivider />
    <v-row style="display: flex; margin: 0px; margin-top: 10px; align-items: center">
      <v-col md="10" style="padding: 0px">
        {{ formatDay(currentDay) }}
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
import {mapState} from "vuex";
import {mdiAlert, mdiCheckboxMarkedCircle} from "@mdi/js";

export default {
  name: "index",
  layout: 'main',
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
  methods: {
    formatDay (date) {
      let diaSemana = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      let mes = ['Enero', 'Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
      console.log("GetDay", date.getDay());
      return diaSemana[date.getDay()]+', '+ date.getDate()+ ' de '+ mes[date.getMonth()] + ' del '+ date.getFullYear();
    }
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
    }),
  },
  mounted() {
    console.log("El animal seleccionado es", this.animal);
  }
}
</script>

<style scoped>

</style>
