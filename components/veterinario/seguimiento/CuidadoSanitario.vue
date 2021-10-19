<template>
  <div style="padding: 20px">
    <v-row style="display: flex; margin: 0 0 5px;align-items: center">
      <v-col md="10" style="padding: 0">
        <h2>
          Seguimiento de actividades de cuidado sanitario de {{this.animal.name}}
        </h2>
      </v-col>
      <v-col md="1" style="padding: 0">
        Periodo:
      </v-col>
      <v-col md="1" style="padding: 0">
        <v-select
          v-model="periodoActual"
          :items="periodos"
          solo
          hide-details
        ></v-select>
      </v-col>
    </v-row>
    <VDivider />
    <v-row style="display: flex; margin: 10px 0 0;align-items: center">
      <v-col md="2" style="padding: 0; display: flex; justify-content: initial">
        Seleccione la familia:
      </v-col>
      <v-col md="2" style="padding: 0">
        <v-select
          v-model="familiaSeleccionada"
          :items="familias"
          item-text="nombreFamilia"
          item-value="id"
          hide-details
          solo
          @change="changeFamily()"
          return-object
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
        v-if="registroCuidadoSanitario"
        :headers="headers"
        :items="registroCuidadoSanitario"
        :search="search"
      >
        <template v-slot:item.estado="{ item }">
          <v-icon
            v-if="item.estadoCuidadoSanitario"
            color="primary"
          >
            mdi-check-circle
          </v-icon>
          <v-icon
            v-else
            color="red"
          >
            mdi-close-circle
          </v-icon>
        </template>
        <template v-slot:item.observacion="{ item }">
          <span
            v-if="item.estadoCuidadoSanitario"
          >
            El cuidado sanitario fue realizado con satisfacción
          </span>
          <span
            v-else
          >
            El cuidado sanitario no ha sido realizado
          </span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {mdiAlert, mdiCheckboxMarkedCircle} from "@mdi/js";
import {mapState} from "vuex";

export default {
  name: "CuidadoSanitario",
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
        text: 'Familia',
        align: 'center',
        sortable: false,
        value: 'nombreFamilia',
      },
      { text: 'Evento', value: 'nombreEvento', align: 'center' },
      { text: 'Día de evaluación', value: 'diaEvaluacion', align: 'center' },
      { text: 'Estado de alimentación', value: 'estado', align: 'center' },
      { text: 'Detalle de observación', value: 'observacion', align: 'start' },
    ],
    registroCuidadoSanitario: [
      {
        nombreFamilia: 'Familia 1',
        nombreEvento: 'Vacunacion 1',
        diaEvaluacion: '2021/07/06',
        estadoCuidadoSanitario: true,
      },
      {
        nombreFamilia: 'Familia 1',
        nombreEvento: 'Esquila programada',
        diaEvaluacion: '2021/09/16',
        estadoCuidadoSanitario: false,
      },
      {
        nombreFamilia: 'Familia 1',
        nombreEvento: 'Vacunacion 3',
        diaEvaluacion: '2021/12/21',
        estadoCuidadoSanitario: false,
      }
    ],
    familias: [
      {
        id: 1,
        nombreFamilia: 'Familia 1'
      },
      {
        id: 2,
        nombreFamilia: 'Familia 2'
      },
      {
        id: 3,
        nombreFamilia: 'Familia 3'
      }
    ],
    familiaSeleccionada: {id: 1, nombreFamilia: 'Familia 1'}
  }),
  computed: {
    ...mapState({
      animal: state => state.animal,
    }),
  },
  methods: {
    changeFamily() {
      console.log("Familia seleccionada", this.familiaSeleccionada.nombreFamilia);
      if (this.familiaSeleccionada.nombreFamilia === 'Familia 2'){
        this.registroCuidadoSanitario = [
          {
            nombreFamilia: 'Familia 2',
            nombreEvento: 'Vacunacion 1',
            diaEvaluacion: '2021/08/01',
            estadoCuidadoSanitario: true,
          },
          {
            nombreFamilia: 'Familia 2',
            nombreEvento: 'Vacunacion 2',
            diaEvaluacion: '2021/08/02',
            estadoCuidadoSanitario: true,
          },
          {
            nombreFamilia: 'Familia 2',
            nombreEvento: 'Vacunacion 3',
            diaEvaluacion: '2021/08/03',
            estadoCuidadoSanitario: true,
          },
        ];
      }
      if (this.familiaSeleccionada.nombreFamilia === 'Familia 1'){
        this.registroCuidadoSanitario = [
          {
            nombreFamilia: 'Familia 1',
            nombreEvento: 'Vacunacion 1',
            diaEvaluacion: '2021/08/01',
            estadoCuidadoSanitario: true,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreEvento: 'Vacunacion 2',
            diaEvaluacion: '2021/08/02',
            estadoCuidadoSanitario: true,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreEvento: 'Vacunacion 3',
            diaEvaluacion: '2021/08/03',
            estadoCuidadoSanitario: false,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreEvento: 'Esquila programada',
            diaEvaluacion: '2021/08/04',
            estadoCuidadoSanitario: false,
          }
        ];
      }
    }
  },
}
</script>

<style scoped>

</style>
