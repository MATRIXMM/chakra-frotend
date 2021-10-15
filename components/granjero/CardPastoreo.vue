<template>
  <v-card height="236px" width="370px" rounded>
    <v-card-title style="background: #FFEAB5">
      Familia 1
    </v-card-title>
    <v-card-text style="padding: 10px; height: 120px; justify-content: center">
      <v-row style="margin: 0px;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Horario de Salida
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          dato
        </v-col>
      </v-row>
      <v-row style="margin: 0px;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Numero de animales
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          dato
        </v-col>
      </v-row>
      <v-row style="margin: 0px;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Tiempo de pastoreo
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          dato
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
        @click="registrarRealizacion"
      >
        REALIZADO
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CardPastoreo",
  data: () => ({
    estadoRealizado: false,
  }),
  methods: {
    registrarRealizacion(){
      console.log('Entro');
    }
  }
}
</script>

<style scoped>

</style>
