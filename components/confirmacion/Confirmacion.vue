<template>
  <v-dialog :value="value" @input="$emit('input')" width="500">
    <v-card align="center" height="300" rounded>
      <v-card-title style="background: #1ecd96; padding: 0px; justify-content: center">
        <v-icon
          large
          color="black"
          style="font-size: 110px; padding-bottom: 20px; padding-top: 20px"
        >
          mdi-alert-circle
        </v-icon>
      </v-card-title>
      <v-card-title style="justify-content: center; display: flex; padding: 16px">{{this.message}}</v-card-title>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          depressed
          color="primary"
          style="padding:15px"
          rounded
          outlined
          @click="$emit('input')">
          CANCELAR
        </v-btn>
        <v-btn depressed color="primary" style="padding:15px" rounded @click="this.funcion">
          CONFIRMAR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mdiAlert, mdiCheckboxMarkedCircle, mdiCloseCircle} from "@mdi/js";

export default {
  props: {
    value: Boolean,
    message: String,
    funcion: Function,
  },
  name: "Confirmacion",
  data: () => ({
    icons: {
      mdiCloseCircle,
      mdiCheckboxMarkedCircle,
      mdiAlert
    },
  }),
}
</script>

<style scoped>

</style>
