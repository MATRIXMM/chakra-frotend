<template>
  <div style="padding: 20px">
    <v-row style="display: flex; margin: 0 0 5px;align-items: center">
      <v-col md="10" style="padding: 0">
        <h2>
          Monitoreo de actividades de alimentación de {{this.animal.name}} con incidentes
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
        Seleccione el animal:
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
        v-if="registroAlimentacion"
        :headers="headers"
        :items="registroAlimentacion"
        :search="search"
      >
        <template v-slot:item.estado="{ item }">
          <v-icon
            v-if="item.horariosRegistrados === item.horariosTotales"
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
            v-if="item.horariosRegistrados === item.horariosTotales"
          >
            La alimentación fue completada con satisfacción
          </span>
          <span
            v-else
          >
            {{ item.nombreAnimal }} fue alimentado en {{item.horariosRegistrados}} de {{item.horariosTotales}} horarios establecidos
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
  name: "Alimentacion",
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
      { text: 'Nombre de Animal', value: 'nombreAnimal', align: 'center' },
      { text: 'Día de evaluación', value: 'diaEvaluacion', align: 'center' },
      { text: 'Estado de alimentación', value: 'estado', align: 'center' },
      { text: 'Detalle de observación', value: 'observacion', align: 'start' },
    ],
    registroAlimentacion: [
      {
        nombreFamilia: 'Familia 1',
        nombreAnimal: 'Pedro',
        diaEvaluacion: '2021/07/06',
        horariosRegistrados: 2,
        horariosTotales: 3,
        detalleObservacion: 'Contagio de una enfermedad de la piel'
      },
      {
        nombreFamilia: 'Familia 1',
        nombreAnimal: 'Pedro',
        diaEvaluacion: '2021/07/07',
        horariosRegistrados: 3,
        horariosTotales: 3,
        detalleObservacion: 'Contagio de una enfermedad de la piel'
      },
      {
        nombreFamilia: 'Familia 1',
        nombreAnimal: 'Pedro',
        diaEvaluacion: '2021/07/08',
        horariosRegistrados: 3,
        horariosTotales: 3,
        detalleObservacion: 'Contagio de una enfermedad de la piel'
      }
    ],
    familias: [
      {
        id: 1,
        nombreFamilia: 'Pedro'
      },
      {
        id: 2,
        nombreFamilia: 'Perico'
      },
    ],
    familiaSeleccionada: {id: 1, nombreFamilia: 'Pedro'}
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
      if (this.mesActual === 'Agosto' && this.familiaSeleccionada.nombreFamilia === 'Pedro'){
        this.registroAlimentacion = [
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/08/01',
            horariosRegistrados: 2,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/08/02',
            horariosRegistrados: 3,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/08/03',
            horariosRegistrados: 3,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/08/04',
            horariosRegistrados: 2,
            horariosTotales: 3,
          }
        ];
      }
      if (this.mesActual === 'Agosto' && this.familiaSeleccionada.nombreFamilia === 'Perico'){
        this.registroAlimentacion = [
          {
            nombreFamilia: 'Familia 2',
            nombreAnimal: 'Perico',
            diaEvaluacion: '2021/08/01',
            horariosRegistrados: 2,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 2',
            nombreAnimal: 'Perico',
            diaEvaluacion: '2021/08/02',
            horariosRegistrados: 3,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 2',
            nombreAnimal: 'Perico',
            diaEvaluacion: '2021/08/03',
            horariosRegistrados: 3,
            horariosTotales: 3,
          },
        ];
      }
      if (this.mesActual === 'Febrero' && this.familiaSeleccionada.nombreFamilia === 'Pedro'){
        this.registroAlimentacion = [
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/02/01',
            horariosRegistrados: 2,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/02/02',
            horariosRegistrados: 2,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/02/03',
            horariosRegistrados: 2,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/02/04',
            horariosRegistrados: 2,
            horariosTotales: 3,
          }
        ];
      }
    },
    changeFamily() {
      console.log("Familia seleccionada", this.familiaSeleccionada.nombreFamilia);
      console.log("Mes seleccionado", this.mesActual);
      if (this.mesActual === 'Agosto' && this.familiaSeleccionada.nombreFamilia === 'Perico'){
        this.registroAlimentacion = [
          {
            nombreFamilia: 'Familia 2',
            nombreAnimal: 'Perico',
            diaEvaluacion: '2021/08/01',
            horariosRegistrados: 2,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 2',
            nombreAnimal: 'Perico',
            diaEvaluacion: '2021/08/02',
            horariosRegistrados: 3,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 2',
            nombreAnimal: 'Perico',
            diaEvaluacion: '2021/08/03',
            horariosRegistrados: 3,
            horariosTotales: 3,
          },
        ];
      }
      if (this.mesActual === 'Agosto' && this.familiaSeleccionada.nombreFamilia === 'Pedro'){
        this.registroAlimentacion = [
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/08/01',
            horariosRegistrados: 1,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/08/02',
            horariosRegistrados: 3,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/08/03',
            horariosRegistrados: 3,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/08/04',
            horariosRegistrados: 2,
            horariosTotales: 3,
          }
        ];
      }
      if (this.mesActual === 'Febrero' && this.familiaSeleccionada.nombreFamilia === 'Pedro'){
        this.registroAlimentacion = [
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/02/01',
            horariosRegistrados: 1,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/02/02',
            horariosRegistrados: 2,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/02/03',
            horariosRegistrados: 3,
            horariosTotales: 3,
          },
          {
            nombreFamilia: 'Familia 1',
            nombreAnimal: 'Pedro',
            diaEvaluacion: '2021/02/04',
            horariosRegistrados: 3,
            horariosTotales: 3,
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
