<template>
  <div style="padding: 20px">
    <h2>
      Cuidado Sanitario de familias de {{this.animal.name}}
    </h2>
    <VDivider />
    <v-row style="display: flex; margin: 0; margin-top: 10px; align-items: center">
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
    <v-spacer />
    <v-container style="margin-top: 20px; padding-right: 150px; padding-left: 150px">
      <v-timeline
        align-top
        :dense="$vuetify.breakpoint.smAndDown"
      >
        <v-timeline-item
          v-for="(evento,index) in eventos"
          :key = "index"
          fill-dot
        >
          <CardCuidadoSanitario :evento="evento"/>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </div>
</template>

<script>
import {mapState} from "vuex";
import CardCuidadoSanitario from "@/components/granjero/CardCuidadoSanitario";

export default {
  name: "CuidadoSanitario",
  components :{
    CardCuidadoSanitario: CardCuidadoSanitario,
  },
  data: () => ({
    currentDay: new Date(),
    periodos: ['2021-2'],
    periodoActual: '2021-2',
    eventos: [
      {
        id: 1,
        evento: 'Vacunación 1',
        nombreFamilia: 'Familia 1',
        estado:'Realizado',
        fecha:'2021/05/06'
      },
      {
        id: 2,
        evento: 'Curación de la piel',
        nombreFamilia: 'Familia 2',
        nombreAnimal: 'Pedro',
        estado:'No realizado',
        fecha:'2021/10/20'
      },
      {
        id: 3,
        evento: 'Vacunación 2',
        nombreFamilia: 'Familia 2',
        estado:'No realizado',
        fecha:'2021/10/17'
      }
    ],
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
    console.log("GetDay", this.currentDay.getDay());
  }
}
</script>

<style scoped>

</style>
