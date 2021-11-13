<template>
  <v-card height="330px" width="420px" rounded>
    <Alerta :key="dialogAlertKey" v-model="dialogAlert" :message="message" />
    <Confirmacion :key="dialogConfirmacionKey" v-model="dialogConfirmacion" :funcion="infoRegistrada" :message="messageConfirmacion" />
    <v-card-title style="background: #FFEAB5; display: flex; justify-content: space-between">
      {{ this.familia.horarios[0].alimentacion.familia.nombre }}
      <v-icon large @click="playSound">
        mdi-bell
      </v-icon>
    </v-card-title>
    <v-card-text style="padding: 10px; height: 210px; justify-content: center">
      <v-row v-for="(horario,index) in horarios" :key="index" style="margin: 0; display: flex; align-content: center">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Horario de alimentación {{index + 1}}
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{ (horario.horario).substr(11,5) }} hrs
        </v-col>
        <v-col style="padding: 0">
          <v-checkbox
            v-model="horario.estado"
            color="primary"
            hide-details
            style="margin: 0;"
            @change="changeStatus"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Información de alimento
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          Info Extra
        </v-col>
      </v-row>
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Tipo de alimento
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{ this.familia.tipo }}
        </v-col>
      </v-row>
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Cantidad de alimento (kg)
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{ this.familia.cantidad }}
        </v-col>
      </v-row>
    </v-card-text>
    <VDivider />
    <v-card-actions class="d-flex justify-center">
      <v-btn v-if="estadoRealizado" depressed color="primary" style="padding:15px; background: white" rounded outlined>
        CONFIRMACION
      </v-btn>
      <v-btn v-else depressed @click="confirmarAlimentacion" color="primary" style="padding:15px" rounded>
        CONFIRMACION
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Alerta from "@/components/confirmacion/Alerta";
import Confirmacion from "@/components/confirmacion/Confirmacion";

export default {
  name: "CardAlimentacion",
  components: {
    Alerta: Alerta,
    Confirmacion: Confirmacion,
  },
  props: {
    familia: {},
  },
  data: () => ({
    estadoRealizado: false,
    //soundurl : 'http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3',
    audio: new Audio('http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3'),
    dialogAlertKey: 1,
    dialogAlert: false,
    horarios: [],
    message: '',
    messageConfirmacion: '',
    dialogConfirmacionKey: 80,
    dialogConfirmacion: false,
  }),
  methods: {
    changeStatus(){
      this.dialogConfirmacion = true;
      this.messageConfirmacion = "¿Está seguro que desea registrar el horario?";
    },
    confirmarAlimentacion(){
      this.dialogConfirmacion = true;
      this.messageConfirmacion = "¿Está seguro que desea registrar la alimentación?";
      this.estadoRealizado = true;
    },
    playSound () {
      this.audio.play();
      this.dialogAlert = true;
    },
    infoRegistrada() {
      this.dialogConfirmacionKey +=1;
      this.dialogConfirmacion = false;
    },
  },
  mounted() {
    for (const horario of this.familia.horarios){
      this.horarios.push({horario: horario.horario, estado: horario.estado});
    }
    this.message = 'En 5 minutos se debe alimentar a la ' + this.familia.horarios[0].alimentacion.familia.nombre;
  }
}
</script>

<style scoped>

</style>
