<template>
  <div>
    <Confirmacion :key="dialogConfirmacionKey" v-model="dialogConfirmacion" :funcion=RegistroInformacion :message="message" />
    <v-btn
      @click="RegistraDatos"
    >
      Clickea para el dialog
    </v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Confirmacion from "@/components/confirmacion/Confirmacion";

export default {
  name: "index",
  components: {
    Confirmacion: Confirmacion,
  },
  data: () => ({
    dialogConfirmacionKey: 1,
    dialogConfirmacion: false,
    message: '¿Está seguro que desea configurar la sección de alimentación de este modo?',
  }),
  methods: {
    RegistroInformacion(value){
      console.log("Registro exitoso");
      this.dialogConfirmacion = false;

    },
    RegistraDatos(){
      this.dialogConfirmacion = true;
    },
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
    }),
  },
  mounted() {
    console.log("El animal seleccionado es", this.animal);
  }

}
</script>

<style scoped>

</style>
