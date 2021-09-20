<template>
  <v-dialog :value="value" @input="$emit('input')" width="650">
    <v-card class="mx-auto" height="220">
      <v-card-title class="v-container-tittle">AGREGAR UN DOCUMENTO</v-card-title>
      <v-card-text>
        texto
      </v-card-text>
      <v-card-actions>
        botones
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mdiAlert, mdiCheckboxMarkedCircle, mdiCloseCircle} from "@mdi/js";

export default {
  props: {
    value: Boolean,

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
