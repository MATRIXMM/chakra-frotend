<template>
  <div style="padding: 20px">
    <h2>
      Configuracion de reglas de crianza para {{this.nombreAnimal}} registradas
    </h2>
    <VDivider />
    <v-row style="display: flex; margin: 10px 0 0;align-items: center">
      <v-col md="10" style="padding: 0">
        Seleccione la familia que desea configurar las reglas de crianza
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
        @click:row="accederDetalleRow"
      >
        <template v-slot:item.validacion="{ item }">
          <v-row v-show="item.validacion" style="display: flex; align-items: center">
            Configurada
            <v-icon color="primary">
              {{icons.mdiCheckboxMarkedCircle}}
            </v-icon>
          </v-row>
          <v-row v-show="!item.validacion" style="display: flex; align-items: center; margin: 0">
            Pendiente
            <v-icon color="#FFDA2D">
              {{icons.mdiAlert}}
            </v-icon>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import {mapState, mapActions} from "vuex";
import { mdiCheckboxMarkedCircle, mdiAlert  } from '@mdi/js';

export default {
  name: "FamiliasRegistradas",
  props: {
    nombreAnimal: String,
  },
  data: () => ({
    keyDataTable: 1,
    validation: {},
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
      { text: 'Característica', value: 'caracteristica' },
      { text: 'Estado de configuración', value: 'validacion' },
    ],
    familia: [
      {
        "idFamilia": 1,
        "nombreFamilia": "Familia 1",
        "cantidadFamilia": 14,
        "caracteristica": "Caracteristica A",
        "estadoAlimentacion": true,
        "estadoPastoreo": true,
        "estadoEventoSanitario": true
      },
      {
        "idFamilia": 2,
        "nombreFamilia": "Familia 2",
        "cantidadFamilia": 10,
        "caracteristica": "Caracteristica B",
        "estadoAlimentacion": false,
        "estadoPastoreo": false,
        "estadoEventoSanitario": false
      },
      {
        "idFamilia": 3,
        "nombreFamilia": "Familia 3",
        "cantidadFamilia": 13,
        "caracteristica": "Caracteristica C",
        "estadoAlimentacion": false,
        "estadoPastoreo": false,
        "estadoEventoSanitario": false
      }
    ],
  }),
  methods: {
    changePeriod(){
      this.getFamilias({periodo: this.periodoActual, tipo:this.animal.name});
      this.setPeriodo({periodo: this.periodoActual});
    },
    accederDetalleRow(event){
      this.$router.push(`configuracion/registradas/${event.idFamilia}`);
    },
    ...mapActions({
      getFamilias: 'admin/monitoreo/getFamilias',
      setPeriodo: 'veterinario/pastoreo/setPeriod'
    }),
  },
  async mounted() {
    await this.getFamilias({periodo: this.periodoActual, tipo:this.animal.name});
    this.setPeriodo({periodo: this.periodoActual});
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
      familias: state => state.admin.monitoreo.familias,
    }),
  },
}
</script>

<style scoped>

</style>
