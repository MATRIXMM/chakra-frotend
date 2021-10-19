<template>
  <div style="padding: 20px">
    <h2>
      Pastoreo de familias de {{this.animal.name}}
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
        ></v-select>
      </v-col>
    </v-row>
    <v-chip color="blue" class="font-weight-bold" style="margin-top: 30px; margin-bottom: 20px">
      EN CAMPO
    </v-chip>
    <v-container style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center">
      <CardPastoreo v-for="(i,index) in familias.length" :key="index" style="margin: 20px; position: relative" :familia="familias[index]"/>
    </v-container>
  </div>
</template>

<script>
import {mapState} from "vuex";
import CardPastoreo from "@/components/granjero/CardPastoreo";

export default {
  name: "Pastoreo",
  components: {
    CardPastoreo: CardPastoreo
  },
  data: () => ({
    currentDay: new Date(),
    periodos: ['2021-2'],
    periodoActual: '2021-2',
    familias: [
      {
        id: 1,
        nombreFamilia: 'Familia 1',
        horarioSalida: '12:30',
        cantidadAnimales: 14,
        tiempoPastoreo: 120,
      },
      {
        id: 2,
        nombreFamilia: 'Familia 2',
        horarioSalida: '15:30',
        cantidadAnimales: 10,
        tiempoPastoreo: 100,
      },
      {
        id: 3,
        nombreFamilia: 'Familia 3',
        horarioSalida: '15:30',
        cantidadAnimales: 15,
        tiempoPastoreo: 90,
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
}
</script>

<style scoped>

</style>
