<template>
  <div style="padding: 20px">
    <h2 v-if="this.animal.name === 'Ovinos' ">
      Familia de Ovinos registrados
    </h2>
    <h2 v-else>
      Familia de Alpacas registradas
    </h2>
    <VDivider />
    <v-row style="display: flex; margin: 10px 0 0;align-items: center">
      <v-col v-if="this.animal.name === 'Ovinos'" md="10" style="padding: 0">
        Listado de Ovinos registrados por familias
      </v-col>
      <v-col v-else md="10" style="padding: 0">
        Listado de Alpacas registradas por familias
      </v-col>
      <v-col md="1" style="padding: 0">
        Periodo:
      </v-col>
      <v-col md="1" style="padding: 0">
        <v-select
          v-model="periodoActual"
          :items="periodos"
          solo
          hide-details
          @change="changePeriod"
        ></v-select>
      </v-col>
    </v-row>
    <v-card style="margin-top: 100px">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Busca por nombre de familia"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        v-if="familias"
        :headers="headers"
        :items="familias"
        :search="search"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {mdiAlert, mdiCheckboxMarkedCircle} from "@mdi/js";
import {mapState, mapActions} from "vuex";

export default {
  layout: 'main',
  name: "index",
  data: () => ({
    periodos: ['2021-1','2021-2'],
    periodoActual: '2021-1',
    search: '',
    icons: {
      mdiCheckboxMarkedCircle,
      mdiAlert
    },
    headers: [
      {
        text: 'Familia',
        align: 'start',
        sortable: false,
        value: 'nombre',
      },
      { text: 'Número de animales', value: 'cantidad' },
      { text: 'Anmimales en seguimiento', value: 'fechaRegistro' },
      { text: 'Característica', value: 'caracteristica' },
    ],
    familia: [
      {
        "idFamilia": 1,
        "nombreFamilia": "Familia 1",
        "cantidadFamilia": 14,
        "caracteristica": "Caracteristica A",
        "cantidadEventosRealizados": 1,
        "cantidadEventosTotal": 2,
        "cantidadSeguimiento": 5,
      },
      {
        "idFamilia": 2,
        "nombreFamilia": "Familia 2",
        "cantidadFamilia": 14,
        "caracteristica": "Caracteristica B",
        "cantidadEventosRealizados": 1,
        "cantidadEventosTotal": 2,
        "cantidadSeguimiento": 2,
      },
      {
        "idFamilia": 3,
        "nombreFamilia": "Familia 3",
        "cantidadFamilia": 14,
        "caracteristica": "Caracteristica C",
        "cantidadEventosRealizados": 1,
        "cantidadEventosTotal": 2,
        "cantidadSeguimiento": 0,
      }
    ],
  }),
  methods: {
    changePeriod(){
      this.getFamilias({periodo: this.periodoActual, tipo:this.animal.name});
    },
    ...mapActions({
      getFamilias: 'admin/monitoreo/getFamilias',
    }),
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
      familias: state => state.admin.monitoreo.familias,
    }),
  },
  async mounted() {
    await this.getFamilias({periodo: this.periodoActual, tipo:this.animal.name});
    console.log('imprimer resultado familias', this.familias);
  },
}
</script>

<style scoped>

</style>
