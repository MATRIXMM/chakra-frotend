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
          @change="changePeriod"
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
import {mapState, mapActions} from "vuex";
import CardCuidadoSanitario from "@/components/granjero/CardCuidadoSanitario";

export default {
  name: "CuidadoSanitario",
  components :{
    CardCuidadoSanitario: CardCuidadoSanitario,
  },
  data: () => ({
    currentDay: new Date(),
    periodos: ['2021-1','2021-2'],
    periodoActual: '2021-1',
    eventos: [],
  }),
  methods: {
    async changePeriod(){
      console.log('cambia de periodod');
      this.eventos = [];
      await this.getCuidadoSanitarioFamilias({periodo: this.periodoActual, tipo: this.animal.name});
      await this.getCuidadoSanitarioIncidentes({periodo: this.periodoActual, tipo: this.animal.name});
      for(const item of this.cuidadoSanitarioFamilias){
        this.eventos.push(item);
      }
      for(const item of this.cuidadoSanitarioIncidentes){
        this.eventos.push(item);
      }
      this.eventos.sort(function (a, b) {
        if (a.fecha > b.fecha) {
          return 1;
        }
        if (a.fecha < b.fecha) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    },
    formatDay (date) {
      let diaSemana = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      let mes = ['Enero', 'Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
      console.log("GetDay", date.getDay());
      return diaSemana[date.getDay()]+', '+ date.getDate()+ ' de '+ mes[date.getMonth()] + ' del '+ date.getFullYear();
    },
    ...mapActions({
      getCuidadoSanitarioFamilias: 'veterinario/cuidadoSanitario/getCuidadoSanitarioFamilias',
      getCuidadoSanitarioIncidentes: 'veterinario/cuidadoSanitario/getCuidadoSanitarioIncidentes',
    }),
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
      cuidadoSanitarioFamilias: state => state.veterinario.cuidadoSanitario.cuidadoSanitarioFamilias,
      cuidadoSanitarioIncidentes: state => state.veterinario.cuidadoSanitario.cuidadoSanitarioIncidentes,
    }),
  },
  async mounted() {
    await this.getCuidadoSanitarioFamilias({periodo: this.periodoActual, tipo: this.animal.name});
    await this.getCuidadoSanitarioIncidentes({periodo: this.periodoActual, tipo: this.animal.name});
    for(const item of this.cuidadoSanitarioFamilias){
      this.eventos.push(item);
    }
    for(const item of this.cuidadoSanitarioIncidentes){
      this.eventos.push(item);
    }
    this.eventos.sort(function (a, b) {
      if (a.fecha > b.fecha) {
        return 1;
      }
      if (a.fecha < b.fecha) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
}
</script>

<style scoped>

</style>
