<template>
  <v-card height="330px" width="420px" rounded>
    <Alerta :key="dialogAlertKey" v-model="dialogAlert" :message="message" />
    <Confirmacion :key="dialogConfirmacionKey" v-model="dialogConfirmacion" :funcion="infoRegistrada" :message="messageConfirmacion" />
    <v-card-title style="background: #FFEAB5; display: flex; justify-content: space-between">
      {{this.incidente.nombreAnimal}} - {{ this.incidente.horarios[0].alimentacion.familia.nombre }}
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
          {{ (horario.horario).substr(11,5)}} hrs
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
          {{this.incidente.tipo}}
        </v-col>
      </v-row>
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Cantidad de alimento (kg)
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{this.incidente.cantidad}}
        </v-col>
      </v-row>
    </v-card-text>
    <VDivider />
    <v-card-actions class="d-flex justify-center">
      <v-btn depressed @click="confirmarAlimentacion" color="primary" style="padding:15px" rounded>
        CONFIRMACION
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Alerta from "@/components/confirmacion/Alerta";
import Confirmacion from "@/components/confirmacion/Confirmacion";

export default {
  name: "CardAlimentacionEspecial",
  components: {
    Alerta: Alerta,
    Confirmacion: Confirmacion,
  },
  props: {
    incidente: {},
  },
  data: () => ({
    audio: new Audio('http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3'),
    dialogAlertKey: 1,
    dialogAlert: false,
    dialogConfirmacionKey: 60,
    dialogConfirmacion: false,
    horarios: [],
    message: '',
    messageConfirmacion: '',
  }),
  methods: {
    changeStatus(){
      this.dialogConfirmacion = true;
      this.messageConfirmacion = "¿Está seguro que desea registrar el horario?";
    },
    confirmarAlimentacion(){
      this.dialogConfirmacion = true;
      this.messageConfirmacion = "¿Está seguro que desea registrar la alimentación?";
    },
    playSound () {
      this.audio.play();
      this.dialogAlert = true;
    },
    infoRegistrada(){
      this.dialogConfirmacionKey +=1;
      this.dialogConfirmacion = false;
    },
  },
  mounted() {
    for (const horario of this.incidente.horarios){
      this.horarios.push({horario: horario.horario, estado: horario.estado});
    }
    this.message = 'En 5 minutos se debe alimentar a ' + this.incidente.nombreAnimal;
  }
}
</script>

<style scoped>

</style>
