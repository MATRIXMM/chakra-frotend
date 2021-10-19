<template>
  <v-card height="216px" width="auto" class="rounded-xl" style="background: #DEFFA1;" >
    <v-card-title v-if="this.evento.nombreAnimal">
      {{this.evento.evento}} - {{this.evento.nombreAnimal}} ({{this.evento.nombreFamilia}})
    </v-card-title>
    <v-card-title v-else>
      {{this.evento.evento}} - {{this.evento.nombreFamilia}}
    </v-card-title>
    <v-card-text style="padding: 10px; height: 100px; justify-content: center">
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="2">
          Estado:
        </v-col>
        <v-col v-if="this.evento.estado === 'Realizado'" style="padding: 5px; font-weight: bold; color: #1ecd96">
          <h4>
            Realizado
          </h4>
        </v-col>
        <v-col v-else style="padding: 5px; font-weight: bold; color: red">
          <h4>
            No realizado
          </h4>
        </v-col>
      </v-row>
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="2">
          Fecha:
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{formatDate(this.evento.fecha)}}
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn
        depressed
        color="primary"
        style="padding:15px; background: white"
        rounded
        outlined
        v-if="this.evento.estado === 'Realizado'"
      >
        REALIZADA
      </v-btn>
      <v-btn
        depressed
        color="primary"
        style="padding:15px"
        rounded
        v-else
        @click="registrarRealizacion"
      >
        REALIZADA
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CardCuidadoSanitario",
  props: {
    evento: {},
  },
  data: () => ({
    estadoRealizado: false,
    horarios: [{id:1, horario:'09:00', estado: true}, {id:2, horario:'12:00', estado: true}, {id:3, horario:'16:00', estado: false}]
  }),
  methods: {
    registrarRealizacion(){
      console.log('Entro');
    },
    formatDate(dateFormat){
      const date = new Date(dateFormat);
      let diaSemana = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      let mes = ['Enero', 'Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
      return diaSemana[date.getDay()]+', '+ date.getDate()+ ' de '+ mes[date.getMonth()] + ' del '+ date.getFullYear();
    }
  }
}
</script>

<style scoped>

</style>
