<template>
  <div style="padding: 20px">
    <h2>
      Configuracion de reglas de crianza para {{this.nombreAnimal}} con incidentes
    </h2>
    <VDivider />
    <v-row style="display: flex; margin: 0px; margin-top: 10px; align-items: center">
      <v-col md="10" style="padding: 0px">
        Seleccione la familia que desea configurar las reglas de crianza
      </v-col>
      <v-col md="1" style="padding: 0px">
        Periodo:
      </v-col>
      <v-col md="1" style="padding: 0px">
        <v-select
          v-model="periodoActual"
          :items="periodos"
          solo
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
        :headers="headers"
        :items="incidentes"
        :search="search"
        @click:row="accederDetalleRow"
      >
        <template v-slot:item.configuration="{ item }">
          <v-row v-if="item.configuration" style="display: flex; align-items: center">
            Configurada
            <v-icon color="primary">
              {{icons.mdiCheckboxMarkedCircle}}
            </v-icon>
          </v-row>
          <v-row v-else style="display: flex; align-items: center">
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
import { mdiCheckboxMarkedCircle, mdiAlert  } from '@mdi/js';

export default {
  name: "IncidentesRegistrados",
  props: {
    nombreAnimal: String,
  },
  data: () => ({
    periodos: ['2021-2'],
    periodoActual: '2021-2',
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
      { text: 'Detalle de observación', value: 'detalleObservacion' },
      { text: 'Estado de configuración', value: 'configuration' },
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
    accederDetalleRow(event) {
      this.$router.push(`configuracion/incidentes/${event.idAnimal}`);
    },
  },
}
</script>

<style scoped>

</style>
