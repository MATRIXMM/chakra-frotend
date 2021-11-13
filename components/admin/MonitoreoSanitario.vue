<template>
  <div style="padding: 20px">
    <h2>
      Registro sanitario de {{this.animal.name}}
    </h2>
    <VDivider />
    <v-row style="display: flex; margin: 10px 0 0;align-items: center">
      <v-col md="10" style="padding: 0">
        {{ formatDay(currentDay) }}
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
          @change="changePeriod"
        ></v-select>
      </v-col>
    </v-row>
    <v-card style="margin-top: 100px">
      <v-card-title style="">
        <v-col>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Busca por nombre de familia"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        v-if="incidentes"
        :headers="headers"
        :items="incidentes"
        :search="search"
      >
        <template v-slot:item.eliminar="{ item }">
          <v-icon @click="deleteRow(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  data: () => ({
    currentDay: new Date(),
    periodos: ['2021-1','2021-2'],
    periodoActual: '2021-1',
    estadoRealizado: false,
    search: '',
    headers: [
      {
        text: 'Nombre de animal',
        align: 'start',
        sortable: false,
        value: 'nombreAnimal',
      },
      { text: 'Familia', value: 'nombreFamilia' },
      { text: 'Fecha de registro', value: 'fechaRegistro' },
      { text: 'Eliminar', value: 'eliminar', align: 'center' },
    ],
    incidentes1: [
      {
        id: 0,
        nombreAnimal: 'Pedro',
        nombreFamilia: 'Familia 1',
        fechaRegistro: '2021/05/04',
        numeroAnimales: 14,
        caracteristica: 'Característica A',
      },
      {
        id: 0,
        nombreAnimal: 'Perico',
        nombreFamilia: 'Familia 2',
        fechaRegistro: '2021/06/05',
        numeroAnimales: 10,
        caracteristica: 'Característica B',
      }
    ],
    familiaSeleccionada: null,
  }),
  methods: {
    getNombreFamilia (idFamilia) {
      this.getFamilia({idFamilia: idFamilia});
      return this.familia.nombre;
      // console.log('Famiiliaaa promise', this.familia);
      // return this.familia.nombre;
    },
    changePeriod() {
      this.getIncidentes({periodo: this.periodoActual, tipo:this.animal.name});
    },
    deleteRow(data){
      console.log('Ela fila que eliminará será la siguiente', data);
      this.familias.splice(data.id, 1);
    },
    formatDay (date) {
      let diaSemana = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      let mes = ['Enero', 'Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
      console.log("GetDay", date.getDay());
      return diaSemana[date.getDay()]+', '+ date.getDate()+ ' de '+ mes[date.getMonth()] + ' del '+ date.getFullYear();
    },
    ...mapActions({
      getIncidentes: 'admin/sanitario/getIncidentes',
      getFamilia: 'admin/monitoreo/getFamilia',
    }),
  },
  mounted() {
    this.getIncidentes({periodo: this.periodoActual, tipo:this.animal.name});
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
      incidentes: state => state.admin.sanitario.incidentes,
      familia: state => state.admin.monitoreo.familia,
    }),
  },
}
</script>

<style scoped>

</style>
