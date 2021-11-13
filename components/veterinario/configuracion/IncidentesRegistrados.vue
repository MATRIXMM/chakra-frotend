<template>
  <div style="padding: 20px">
    <h2>
      Configuracion de reglas de crianza para {{this.nombreAnimal}} con incidentes
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
          @change="changePeriod"
          hide-details
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
        v-if="incidentesValidaciones"
        :headers="headers"
        :items="incidentesValidaciones"
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
import {mapState, mapActions} from "vuex";
import { mdiCheckboxMarkedCircle, mdiAlert  } from '@mdi/js';

export default {
  name: "IncidentesRegistrados",
  props: {
    nombreAnimal: String,
  },
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
        value: 'nombreFamilia',
      },
      { text: 'Nombre', value: 'nombreAnimal' },
      { text: 'Fecha de registro', value: 'fechaRegistro' },
      { text: 'Detalle de observación', value: 'observacion' },
      { text: 'Estado de configuración', value: 'validacion' },
    ],
    incidentes: [
      {
        idAnimal: 1,
        nombreFamilia: 'Familia1',
        nombreAnimal: 'Pedro',
        fechaRegistro: '2021/06/14',
        detalleObservacion: 'Este incidente presenta esta observacion',
        configuration: false,
      },
      {
        idAnimal: 2,
        nombreFamilia: 'Familia2',
        nombreAnimal: 'Perico',
        fechaRegistro: '2021/06/12',
        detalleObservacion: 'Este incidente presenta esta observacion 2',
        configuration: true,
      }
    ],
  }),
  methods: {
    changePeriod(){
      this.getIncidentesValidaciones({periodo: this.periodoActual, tipo:this.animal.name});
    },
    async accederDetalleRow(event) {
      //console.log('row', event);
      await this.setRowIncidente({incidenteSeleccionado: event}).then(() => {
        this.$router.push(`configuracion/incidentes/${event.idIncidencia}`);
      });
    },
    ...mapActions({
      getIncidentesValidaciones: 'admin/sanitario/getIncidentesValidaciones',
      setRowIncidente: 'admin/sanitario/setRowIncidente'
    }),
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
      incidentesValidaciones: state => state.admin.sanitario.incidentesValidaciones,
    }),
  },
  async mounted() {
    await this.getIncidentesValidaciones({periodo: this.periodoActual, tipo:this.animal.name});
  }
}
</script>

<style scoped>

</style>
