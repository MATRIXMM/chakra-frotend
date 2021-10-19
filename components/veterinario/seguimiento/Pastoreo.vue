<template>
  <div style="padding: 20px">
    <v-row style="display: flex; margin: 0 0 5px;align-items: center">
      <v-col md="10" style="padding: 0">
        <h2>
          Seguimiento de actividades de pastoreo de {{this.animal.name}}
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
          @change="changePeriod()"
        ></v-select>
      </v-col>
    </v-row>
    <VDivider />
    <v-row style="display: flex; margin: 10px 0 0;align-items: center">
      <v-col md="2" style="padding: 0">
        Seleccione el mes:
      </v-col>
      <v-col md="2" style="padding: 0">
        <v-select
          v-if ="periodoActual.substr(5,1) === '1'"
          v-model="mesActual"
          :items="primerPeriodo"
          solo
          hide-details
          @change="changeMonth()"
        ></v-select>
        <v-select
          v-else
          v-model="mesActual"
          :items="segundoPeriodo"
          solo
          hide-details
          @change="changeMonth()"
        ></v-select>
      </v-col>
      <v-col md="1">
      </v-col>
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
        v-if="registroPastoreo"
        :headers="headers"
        :items="registroPastoreo"
        :search="search"
      >
        <template v-slot:item.estado="{ item }">
          <v-icon
            v-if="item.estadoPastoreo"
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
            v-if="item.estadoPastoreo"
          >
            El pastoreo fue realizado con satisfacción
          </span>
          <span
            v-else
          >
            El pastoreo no fue realizado
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
  name: "Pastoreo",
  data: () => ({
    primerPeriodo: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    segundoPeriodo: ['Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    currentDay: new Date(),
    keyMeses: 1,
    keyDataTable: 100,
    mesActual: '',
    periodos: ['2021-1', '2021-2'],
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
      { text: 'Día de evaluación', value: 'diaEvaluacion', align: 'center' },
      { text: 'Estado de alimentación', value: 'estado', align: 'center' },
      { text: 'Detalle de observación', value: 'observacion', align: 'start' },
    ],
    registroPastoreo: [
      {
        nombreFamilia: 'Familia 1',
        diaEvaluacion: '2021/07/06',
        estadoPastoreo: true,
      },
      {
        nombreFamilia: 'Familia 1',
        diaEvaluacion: '2021/07/07',
        estadoPastoreo: false,
      },
      {
        nombreFamilia: 'Familia 1',
        diaEvaluacion: '2021/07/08',
        estadoPastoreo: false,
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
    changeMonth(){
      console.log("Familia seleccionada", this.familiaSeleccionada.nombreFamilia);
      console.log("Mes seleccionado", this.mesActual);
      if (this.mesActual === 'Agosto' && this.familiaSeleccionada.nombreFamilia === 'Familia 1'){
        this.registroPastoreo = [
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/08/01',
            estadoPastoreo: true,
          },
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/08/02',
            estadoPastoreo: true,
          },
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/08/03',
            estadoPastoreo: true,
          },
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/08/04',
            estadoPastoreo: true,
          }
        ];
      }
      if (this.mesActual === 'Agosto' && this.familiaSeleccionada.nombreFamilia === 'Familia 2'){
        this.registroPastoreo = [
          {
            nombreFamilia: 'Familia 2',
            diaEvaluacion: '2021/08/01',
            estadoPastoreo: true,
          },
          {
            nombreFamilia: 'Familia 2',
            diaEvaluacion: '2021/08/02',
            estadoPastoreo: true,
          },
          {
            nombreFamilia: 'Familia 2',
            diaEvaluacion: '2021/08/03',
            estadoPastoreo: true,
          },
        ];
      }
      if (this.mesActual === 'Febrero' && this.familiaSeleccionada.nombreFamilia === 'Familia 1'){
        this.registroPastoreo = [
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/02/01',
            estadoPastoreo: true,
          },
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/02/02',
            estadoPastoreo: true,
          },
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/02/03',
            estadoPastoreo: true,
          },
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/02/04',
            estadoPastoreo: true,
          }
        ];
      }
    },
    changeFamily() {
      console.log("Familia seleccionada", this.familiaSeleccionada.nombreFamilia);
      console.log("Mes seleccionado", this.mesActual);
      if (this.mesActual === 'Agosto' && this.familiaSeleccionada.nombreFamilia === 'Familia 2'){
        this.registroPastoreo = [
          {
            nombreFamilia: 'Familia 2',
            diaEvaluacion: '2021/08/01',
            estadoPastoreo: true,
          },
          {
            nombreFamilia: 'Familia 2',
            diaEvaluacion: '2021/08/02',
            estadoPastoreo: true,
          },
          {
            nombreFamilia: 'Familia 2',
            diaEvaluacion: '2021/08/03',
            estadoPastoreo: true,
          },
        ];
      }
      if (this.mesActual === 'Agosto' && this.familiaSeleccionada.nombreFamilia === 'Familia 1'){
        this.registroPastoreo = [
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/08/01',
            estadoPastoreo: true,
          },
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/08/02',
            estadoPastoreo: true,
          },
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/08/03',
            estadoPastoreo: false,
          },
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/08/04',
            estadoPastoreo: false,
          }
        ];
      }
      if (this.mesActual === 'Febrero' && this.familiaSeleccionada.nombreFamilia === 'Familia 1'){
        this.registroPastoreo = [
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/02/01',
            estadoPastoreo: false,
          },
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/02/02',
            estadoPastoreo: true,
          },
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/02/03',
            estadoPastoreo: false,
          },
          {
            nombreFamilia: 'Familia 1',
            diaEvaluacion: '2021/02/04',
            estadoPastoreo: true,
          }
        ];
      }
    },
    changePeriod() {
      this.keyMeses += 1;
      if(this.periodoActual.substr(5,1) === '1'){
        this.mesActual = 'Enero'
      } else {
        console.log("Entra julio");
        this.mesActual = 'Julio'
      }
    },
  },
  mounted() {
    if(this.periodoActual.substr(5,1) === '1'){
      this.mesActual = 'Enero'
    } else {
      this.mesActual = 'Julio'
    }
  }
}
</script>

<style scoped>

</style>
