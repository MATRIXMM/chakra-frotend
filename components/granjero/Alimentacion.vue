<template>
  <div style="padding: 20px">
    <h2>
      Alimentación de familias de {{this.animal.name}}
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
    <v-chip color="blue" class="font-weight-bold" style="margin-top: 30px; margin-bottom: 20px">
      ALIMENTACION
    </v-chip>
    <v-container style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center">
      <CardAlimentacion v-for="(familia,index) in this.alimentacionFamilias" :key="index" style="margin: 20px; position: relative" :familia="familia"/>
    </v-container>
    <v-chip color="blue" class="font-weight-bold" style="margin-top: 30px">
      ALIMENTACION ESPECIAL
    </v-chip>
    <v-container style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center">
      <CardAlimentacionEspecial v-for="(incidente, index) in this.alimentacionIncidentes" :key="index" style="margin: 20px; position: relative" :incidente="incidente" />
    </v-container>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import CardAlimentacion from "@/components/granjero/CardAlimentacion";
import CardAlimentacionEspecial from "@/components/granjero/CardAlimentacionEspecial";

export default {
  name: "Alimentacion",
  components: {
    CardAlimentacion: CardAlimentacion,
    CardAlimentacionEspecial: CardAlimentacionEspecial,
  },
  data: () => ({
    currentDay: new Date(),
    periodos: ['2021-1','2021-2'],
    periodoActual: '2021-1',
    incidentes: [
      {
        id: 1,
        nombreFamilia: 'Familia 1',
        nombreAnimal: 'Perico',
        tipoAlimento: 'Alimento A',
        cantidadAlimento: 3,
        horarios: [
          {id:1, horario:'09:00', estado: true},
          {id:2, horario:'12:00', estado: true},
          {id:3, horario:'16:00', estado: false}
        ]
      },
      {
        id: 2,
        nombreFamilia: 'Familia 2',
        nombreAnimal: 'Pedro',
        tipoAlimento: 'Alimento B',
        cantidadAlimento: 2,
        horarios: [
          {id:1, horario:'09:00', estado: true},
          {id:2, horario:'12:00', estado: true},
          {id:3, horario:'16:00', estado: false}
        ]
      }
    ],
    familias: [
      {
        id: 1,
        nombreFamilia: 'Familia 1',
        cantidadAnimales: 15,
        tipoAlimento: 'Alimento A',
        cantidadAlimento: 25,
        horarios: [
          {id:1, horario:'09:00', estado: true},
          {id:2, horario:'12:00', estado: false},
          {id:3, horario:'16:00', estado: false}
        ]
      },
      {
        id: 2,
        nombreFamilia: 'Familia 2',
        cantidadAnimales: 14,
        tipoAlimento: 'Alimento B',
        cantidadAlimento: 20,
        horarios: [
          {id:1, horario:'10:00', estado: true},
          {id:2, horario:'14:00', estado: true},
          {id:3, horario:'16:00', estado: false}
        ]
      }
    ],
  }),
  methods: {
    changePeriod(){
      this.getAlimentacionFamilias({periodo: this.periodoActual, tipo: this.animal.name});
      this.getAlimentacionIncidencias({periodo: this.periodoActual, tipo: this.animal.name});
      this.setPeriod({periodo:this.periodoActual});
    },
    formatDay (date) {
      let diaSemana = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      let mes = ['Enero', 'Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
      console.log("GetDay", date.getDay());
      return diaSemana[date.getDay()]+', '+ date.getDate()+ ' de '+ mes[date.getMonth()] + ' del '+ date.getFullYear();
    },
    ...mapActions({
      getAlimentacionFamilias: 'veterinario/alimentacion/getAlimentacionFamilias',
      getAlimentacionIncidencias: 'veterinario/alimentacion/getAlimentacionIncidencias',
      setPeriod: 'veterinario/pastoreo/setPeriod'
    }),
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
      alimentacionFamilias: state => state.veterinario.alimentacion.alimentacionFamilias,
      alimentacionIncidentes: state => state.veterinario.alimentacion.alimentacionIncidentes,
    }),
  },
  mounted() {
    this.getAlimentacionFamilias({periodo: this.periodoActual, tipo: this.animal.name});
    this.getAlimentacionIncidencias({periodo: this.periodoActual, tipo: this.animal.name});
    this.setPeriod({periodo:this.periodoActual});
  }
}
</script>

<style scoped>

</style>
