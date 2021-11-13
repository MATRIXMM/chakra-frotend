<template>
  <v-dialog :value="value" @input="$emit('input')" width="500" class="rounded-xl">
    <v-card height="512" class="rounded-xl">
      <v-card-title style="background: #1ECD96; padding: 0; justify-content: center; height: 60px">
        <h2>Actualizar familia de {{this.animal.name}}</h2>
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
              v-if="familia"
              v-model="familia.nombreFamilia"
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
              v-if="familia"
              v-model="familia.numeroAnimales"
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
              v-if="familia"
              v-model="familia.caracteristica"
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
          v-if="familia"
          depressed
          color="primary"
          style="padding:15px"
          rounded
          :disabled="familia.caracteristica === ''"
          @click="actualizarFamilia"
        >
          Actualizar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "ActualizarFamilia",
  props: {
    value: Boolean,
    familia: {},
  },
  data: () => ({
    caracteristica: '',
    cantidadAnimales: '',
    familiaSeleccionada: '',
  }),
  computed: {
    ...mapState({
      animal: state => state.animal,
    }),
  },
  methods: {
    actualizarFamilia(){
      const data = {
        nombreFamilia: this.familia.nombreFamilia,
        numeroAnimales: this.familia.numeroAnimales,
        caracteristica: this.familia.caracteristica,
      };
      this.$emit('update', {data: data})
    },
  },
  mounted() {
    console.log('entra a verificar', this.familia);
  }

}
</script>

<style scoped>

</style>
