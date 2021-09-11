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
        :headers="headers"
        :items="familia"
        :search="search"
        @click:row="imprimeResultado"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AlpacasRegistradas",
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Familia',
        align: 'start',
        sortable: false,
        value: 'familia',
      },
      { text: 'Número de alpacas', value: 'cantAlpacas' },
      { text: 'Característica', value: 'caracteristica' },
      { text: 'Estado de configuración', value: 'carbs' },
    ],
    familia: [
      {
        familia: 'Familia 1',
        cantAlpacas: 14,
        caracteristica: 'Característica A',
      },
      {
        familia: 'Familia 2',
        cantAlpacas: 10,
        caracteristica: 'Característica B',
      },
    ],
  }),
  methods: {
    imprimeResultado(event){
      console.log('Imprime lo seleecionado', event)
    }
  },
}
</script>

<style scoped>

</style>
