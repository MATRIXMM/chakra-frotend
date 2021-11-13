<template>
  <v-dialog :value="value" @input="$emit('input')" width="500" class="rounded-xl">
    <Confirmacion :key="dialogConfirmacionKey" v-model="dialogConfirmacion" :funcion="registrarFamily" message="¿Está seguro que desea configurar la alimentación de este modo?" />
    <v-card height="512" class="rounded-xl">
      <v-card-title style="background: #1ECD96; padding: 0; justify-content: center; height: 60px">
        <h2>Registro de familias de {{this.animal.name}}</h2>
      </v-card-title>
      <v-card-text style="margin: 0; padding: 30px">
        <v-row class="font-weight-bold" style="display: flex; align-items: center">
          <v-col md="6">
            <h3>
              Nombre de Familia:
            </h3>
          </v-col>
          <v-col>
            <v-text-field
              v-model="familiaSeleccionada"
              solo
              hide-details
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row style="display: flex; align-items: center">
          <v-col md="6">
            <h3>
              Número de animales:
            </h3>
          </v-col>
          <v-col md="2">
            <v-text-field
              v-model="cantidadAnimales"
              solo
              hide-details
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row style="display: flex; align-items: center">
          <v-col md="6">
            <h3>
              Característica de la familia:
            </h3>
          </v-col>
        </v-row>
        <v-row class="font-weight-bold">
          <v-col>
            <v-textarea
              v-model="caracteristica"
              solo
              hide-details
            >
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          depressed
          color="primary"
          style="padding:15px"
          rounded
          outlined
          @click="$emit('input')"
        >
          CANCELAR
        </v-btn>
        <v-btn
          depressed
          color="primary"
          style="padding:15px"
          rounded
          :disabled="caracteristica === ''"
          @click="dialogConfirmacion = true"
        >
          REGISTRAR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "RegistrarFamilia",
  props: {
    value: Boolean,
  },
  data: () => ({
    nombreFamilia: '',
    caracteristica: '',
    cantidadAnimales: 0,
    familiaSeleccionada: '',
    dialogConfirmacionKey: 100,
    dialogConfirmacion: false,
  }),
  computed: {
    ...mapState({
      animal: state => state.animal,
    }),
  },
  methods: {
    registrarFamily() {
      this.dialogConfirmacion = false;
      const data = {
        nombre: this.familiaSeleccionada,
        cantidad: this.cantidadAnimales,
        caracteristica: this.caracteristica,
      }
      this.$emit('register', {data: data});
    },
    registrarFamilia(){
      this.dialogConfirmacion = true;
      //this.$emit('register', {data: data})
    },
  },
  mounted() {
  }

}
</script>

<style scoped>

</style>
