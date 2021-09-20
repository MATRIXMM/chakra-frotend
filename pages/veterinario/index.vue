<template>
  <div>
    <Confirmacion :key="dialogConfirmacionKey" v-model="dialogConfirmacion"@accept="RegistroInformacion" />
    <v-btn
      @click="RegistraDatos"
    >
      Clickea para el dialog
    </v-btn>
  </div>
</template>

<script>

import Confirmacion from "@/components/confirmacion/Confirmacion";

export default {
  name: "index",
  components: {
    Confirmacion: Confirmacion,
  },
  data: () => ({
    dialogConfirmacionKey: 1,
    dialogConfirmacion: false,
  }),
  methods: {
    RegistroInformacion(value){
      console.log("Registro exitoso");
    },
    RegistraDatos(){
      this.dialogConfirmacion = true;
    },
  },
}
</script>

<style scoped>

</style>
