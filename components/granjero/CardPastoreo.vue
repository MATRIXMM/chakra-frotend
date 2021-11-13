<template>
  <v-card height="236px" width="370px" rounded>
    <Alerta :key="dialogAlertKey" v-model="dialogAlert" :message="message" />
    <Confirmacion :key="dialogConfirmacionKey" v-model="dialogConfirmacion" :funcion="infoRegistrada" :message="messageConfirmacion" />
    <v-card-title style="background: #FFEAB5; display: flex; justify-content: space-between">
      {{ this.family.nombre }}
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
          {{ (this.familia.horario).substr(11,5)}}
        </v-col>
      </v-row>
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Numero de animales:
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{ this.family.cantidad }}
        </v-col>
      </v-row>
      <v-row style="margin: 0;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Tiempo de pastoreo (min):
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{ this.familia.tiempo }}
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
        @click="confirmarPastoreo"
      >
        REALIZADO
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Alerta from "@/components/confirmacion/Alerta";
import {mapState, mapActions} from "vuex";

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
    message: '',
    dialogConfirmacionKey: 40,
    dialogConfirmacion: false,
    messageConfirmacion: '',

  }),
  computed: {
    ...mapState({
      animal: state => state.animal,
      family: state => state.veterinario.pastoreo.familia,
    }),
  },
  methods: {
    infoRegistrada(){
      this.dialogConfirmacionKey +=1;
      this.dialogConfirmacion = false;
    },
    confirmarPastoreo(){
      this.dialogConfirmacion = true;
      this.messageConfirmacion = "¿Está seguro que desea registrar el pastoreo?";
      this.estadoRealizado = true;
    },
    registrarRealizacion(){
      console.log('Entro');
    },
    playSound () {
      this.audio.play();
      this.dialogAlert = true;
    },
    ...mapActions({
      getFamilia: 'veterinario/pastoreo/getFamilia',
    }),
  },
  mounted() {
    this.getFamilia({idFamilia: this.familia.idFamilia});
    this.message = this.animal.name +": En 5 minutos se tiene programado el pastoreo de la " + this.family.nombre;
  }
}
</script>

<style scoped>

</style>
