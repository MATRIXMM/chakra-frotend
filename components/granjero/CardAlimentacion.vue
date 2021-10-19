<template>
  <v-card height="330px" width="370px" rounded>
    <Alerta :key="dialogAlertKey" v-model="dialogAlert" message="Alpacas: En 5 minutos se tiene programada la alimentación de la familia 1" />
    <v-card-title style="background: #FFEAB5; display: flex; justify-content: space-between">
      {{ this.familia.nombreFamilia }}
      <v-icon large @click="playSound">
        mdi-bell
      </v-icon>
    </v-card-title>
    <v-card-text style="padding: 10px; height: 210px; justify-content: center">
      <v-row v-for="(horario,index) in this.familia.horarios" :key="index" style="margin: 0; display: flex; align-content: center">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Horario de alimentación {{index + 1}}
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{horario.horario}}
        </v-col>
        <v-col style="padding: 0">
          <v-checkbox
            v-model="horario.estado"
            color="primary"
            hide-details
            style="margin: 0;"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Numero de animales
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{ this.familia.cantidadAnimales }}
        </v-col>
      </v-row>
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Tipo de alimento
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{ this.familia.tipoAlimento }}
        </v-col>
      </v-row>
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Cantidad de alimento (kg)
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{ this.familia.cantidadAlimento }}
        </v-col>
      </v-row>
    </v-card-text>
    <VDivider />
    <v-card-actions class="d-flex justify-center">
      <v-btn
        depressed
        color="primary"
        style="padding:15px"
        rounded
        outlined
      >
        GUARDAR
      </v-btn>
      <v-btn depressed color="primary" style="padding:15px" rounded>
        CONFIRMACION
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Alerta from "@/components/confirmacion/Alerta";

export default {
  name: "CardAlimentacion",
  components: {
    Alerta: Alerta,
  },
  props: {
    familia: {},
  },
  data: () => ({
    //soundurl : 'http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3',
    audio: new Audio('http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3'),
    horarios: [{id:1, horario:'09:00', estado: true}, {id:2, horario:'12:00', estado: true}, {id:3, horario:'16:00', estado: false}],
    dialogAlertKey: 1,
    dialogAlert: false,
  }),
  methods: {
    playSound () {
      this.audio.play();
      this.dialogAlert = true;
    },
  }
}
</script>

<style scoped>

</style>
