<template>
  <div style="padding: 20px">
    <h2>
      Pastoreo de familias de {{this.animal.name}}
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
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Pastoreo",
  data: () => ({
    currentDay: new Date(),
    periodos: ['2021-2'],
    periodoActual: '2021-2',
  }),
  methods: {
    formatDay (date) {
      let diaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
      let mes = ['Enero', 'Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
      return diaSemana[date.getDay() - 1]+', '+ date.getDate()+ ' de '+ mes[date.getMonth()] + ' del '+ date.getFullYear();
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
