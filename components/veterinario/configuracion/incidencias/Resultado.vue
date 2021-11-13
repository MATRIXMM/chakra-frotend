<template>
  <div style="margin: 10px">
    <Confirmacion :key="dialogConfirmacionKey" v-model="dialogConfirmacion" :funcion="infoRegistrada" message="¿Está seguro que desea registrar el resultado de este animal?" />
    <v-chip
      color= #1976D2
      text-color="black"
      class="font-weight-black"
    >
      Resultado
    </v-chip>
    <h5 style="margin-top: 20px">
      Por favor, indique el resultado obtenido del seguimiento:
    </h5>
    <v-card
      elevation="2"
      width="700px"
    >
      <v-card-title
        style="display: flex; justify-content: right;background: #FFEAB5"
      >
        <v-btn
          v-if="!registrado"
          rounded
          color="primary"
          @click="dialogConfirmacion = true"
        >
          Guardar
        </v-btn>
        <v-btn
          v-if="registrado"
          rounded
          color="primary"
        >
          Actualizar
        </v-btn>
      </v-card-title>
      <v-card-text style="background: #FFEAB5">
        <v-textarea
          v-model="resultado"
          hide-details
          solo
          full-width
          single-line
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Resultado",
  data: () => ({
    resultado: null,
    registrado: false,
    dialogConfirmacionKey: 150,
    dialogConfirmacion: false,
  }),
  methods: {
    registrarResultado(){
      console.log("Este es el resultado registrado", this.resultado);
    },
    infoRegistrada() {
      this.dialogConfirmacion = false;
    }
  }
}
</script>

<style scoped>

</style>
