<template>
  <div style="padding: 20px">
    <h2>
      Alimentación de familias de {{this.animal.name}}
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
    <v-chip color="blue" class="font-weight-bold" style="margin-top: 30px; margin-bottom: 20px">
      ALIMENTACION
    </v-chip>
    <v-container style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center">
      <CardAlimentacion v-for="i in 2" :key="i" style="margin: 20px; position: relative" />
    </v-container>
    <v-chip color="blue" class="font-weight-bold" style="margin-top: 30px">
      ALIMENTACION ESPECIAL
    </v-chip>
    <v-container>
      Contenido alimentacion especial
    </v-container>
  </div>
</template>

<script>
import {mapState} from "vuex";
import CardAlimentacion from "@/components/granjero/CardAlimentacion";

export default {
  name: "Alimentacion",
  components: {
    CardAlimentacion: CardAlimentacion,
  },
  data: () => ({
    currentDay: new Date(),
    periodos: ['2021-2'],
    periodoActual: '2021-2',
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
