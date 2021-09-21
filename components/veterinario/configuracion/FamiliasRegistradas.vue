<template>
  <div style="padding: 20px">
    <h2>
      Configuracion de reglas de crianza para {{this.nombreAnimal}} registradas
    </h2>
    <VDivider />
    <h5>
      Seleccione la familia que desea configurar las reglas de crianza
    </h5>
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
        v-if="familia"
        :headers="headers"
        :items="familia"
        :search="search"
        @click:row="accederDetalleRow"
      >
        <template v-slot:item.configuration="{ item }">
          <v-row v-if="item.estadoAlimentacion && item.estadoPastoreo && item.estadoEventoSanitario" style="display: flex; align-items: center">
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
import axios from 'axios';
import { mdiCheckboxMarkedCircle, mdiAlert  } from '@mdi/js';

export default {
  name: "FamiliasRegistradas",
  props: {
    nombreAnimal: String,
  },
  data: () => ({
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
      { text: 'Número de animales', value: 'cantidadFamilia' },
      { text: 'Característica', value: 'caracteristica' },
      { text: 'Estado de configuración', value: 'configuration' },
    ],
    familias: null,
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
    accederDetalleRow(event){
      console.log('Imprime lo seleecionado', event);
      this.$router.push(`configuracion/registradas/${event.idFamilia}`);
    },
    getFamilias() {
      axios.get(`http://localhost:8085/api/familiaAnimal/listar?perPage=${3}&page=${1}`).then( response => {
        console.log(response.data.payload)
        this.familias = response.data.payload
      }).catch( e => console.log(e))
    },
  },
  mounted() {
    console.log('Obtiene la información de las listas');
    //this.getFamilias();
  }
}
</script>

<style scoped>

</style>
