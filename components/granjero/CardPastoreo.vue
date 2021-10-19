<template>
  <v-card height="236px" width="370px" rounded>
    <Alerta :key="dialogAlertKey" v-model="dialogAlert" message="Alpacas: En 5 minutos se tiene programado el pastoreo de la familia 1" />
    <v-card-title style="background: #FFEAB5; display: flex; justify-content: space-between">
      {{ this.familia.nombreFamilia }}
      <v-icon large @click="playSound">
        mdi-bell
      </v-icon>
    </v-card-title>
    <v-card-text style="padding: 10px; height: 120px; justify-content: center">
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Horario de Salida:
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{this.familia.horarioSalida}}
        </v-col>
      </v-row>
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Numero de animales:
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{ this.familia.cantidadAnimales }}
        </v-col>
      </v-row>
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Tiempo de pastoreo (min):
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{ this.familia.tiempoPastoreo }}
        </v-col>
      </v-row>
    </v-card-text>
    <VDivider />
    <v-card-actions class="d-flex justify-end">
      <v-btn
        depressed
        color="primary"
        style="padding:15px; background: white"
        rounded
        outlined
        v-if="estadoRealizado"
      >
        REALIZADO
      </v-btn>
      <v-btn
        depressed
        color="primary"
        style="padding:15px"
        rounded
        v-else
        @click="registrarRealizacion"
      >
        REALIZADO
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Alerta from "@/components/confirmacion/Alerta";

export default {
  name: "CardPastoreo",
  props: {
    familia: {}
  },
  components: {
    Alerta: Alerta,
  },
  data: () => ({
    estadoRealizado: false,
    audio: new Audio('http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3'),
    dialogAlertKey: 1,
    dialogAlert: false,
  }),
  methods: {
    registrarRealizacion(){
      console.log('Entro');
    },
    playSound () {
      this.audio.play();
      this.dialogAlert = true;
    },
  }
}
</script>

<style scoped>

</style>
