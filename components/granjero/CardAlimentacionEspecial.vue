<template>
  <v-card height="296px" width="370px" rounded>
    <v-card-title style="background: #FFEAB5">
      {{this.incidente.nombreAnimal}} - {{ this.incidente.nombreFamilia }}
    </v-card-title>
    <v-card-text style="padding: 10px; height: 180px; justify-content: center">
      <v-row v-for="(horario,index) in this.incidente.horarios" :key="index" style="margin: 0px; display: flex; align-content: center">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Horario de alimentación {{index + 1}}
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{horario.horario}}
        </v-col>
        <v-col style="padding: 0px">
          <v-checkbox
            v-model="horario.estado"
            color="primary"
            hide-details
            style="margin: 0px;"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row style="margin: 0px;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Tipo de alimento
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{this.incidente.tipoAlimento}}
        </v-col>
      </v-row>
      <v-row style="margin: 0px;">
        <v-col style="padding: 5px; font-weight: bold;" md="7">
          Cantidad de alimento (kg)
        </v-col>
        <v-col style="padding: 5px; font-weight: bold;">
          {{this.incidente.cantidadAlimento}}
        </v-col>
      </v-row>
    </v-card-text>
    <VDivider />
    <v-card-actions class="d-flex justify-center">
      <v-btn
        depressed
        color="primary"
        style="padding:15px"
        rounded
        outlined
      >
        GUARDAR
      </v-btn>
      <v-btn depressed color="primary" style="padding:15px" rounded>
        CONFIRMACION
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CardAlimentacionEspecial",
  props: {
    incidente: {},
  },
  data: () => ({
    horarios: [{id:1, horario:'09:00', estado: true}, {id:2, horario:'12:00', estado: true}, {id:3, horario:'16:00', estado: false}]
  }),
}
</script>

<style scoped>

</style>
