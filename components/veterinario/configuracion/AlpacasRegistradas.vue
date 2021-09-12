<template>
  <div style="padding: 20px">
    <h2>
      Configuracion de reglas de crianza para alpacas registradas
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
        v-if="familias"
        :headers="headers"
        :items="familia"
        :search="search"
        @click:row="imprimeResultado"
      >
        <template v-slot:item.configuration="{ item }">
          <v-row style="display: flex; justify-content: center">
            Configurada
            <v-simple-checkbox
              v-model="item.configuration"
              disabled
            ></v-simple-checkbox>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AlpacasRegistradas",
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Familia',
        align: 'start',
        sortable: false,
        value: 'nombreFamilia',
      },
      { text: 'Número de alpacas', value: 'cantidadFamilia' },
      { text: 'Característica', value: 'caracteristica' },
      { text: 'Estado de configuración', value: 'configuration' },
    ],
    familias: null,
    familia: [
      {
        nombreFamilia: 'Familia 1',
        cantidadFamilia: 14,
        caracteristica: 'Característica A',
        configuration: false,
      },
      {
        nombreFamilia: 'Familia 2',
        cantidadFamilia: 10,
        caracteristica: 'Característica B',
        configuration: true,
      },
    ],
  }),
  methods: {
    imprimeResultado(event){
      console.log('Imprime lo seleecionado', event)
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
    this.getFamilias();
  }
}
</script>

<style scoped>

</style>
