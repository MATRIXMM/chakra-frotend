<template>
  <div style="padding: 20px">
    <RegistrarFamilia :key="dialogRegisterKey" v-model="dialogRegister" @register="registerFamily"/>
    <ActualizarFamilia :key="dialogUpdateKey" v-model="dialogUpdate" :familia="familiaSeleccionada" @update="updateFamily" />
    <h2>
      Registro de {{this.animal.name}}
    </h2>
    <VDivider />
    <v-row style="display: flex; margin: 10px 0 0;align-items: center">
      <v-col md="10" style="padding: 0">
        {{ formatDay(currentDay) }}
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
      <v-card-title style="">
        <v-col>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Busca por nombre de familia"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col style="display: flex; justify-content: end">
          <v-btn
            color="primary"
            @click="dialogRegister=true"
          >
            + Registar Familia
          </v-btn>
        </v-col>
      </v-card-title>
      <v-data-table
        v-if="familias"
        :headers="headers"
        :items="familias"
        :search="search"
      >
        <template v-slot:item.actualizacion="{ item }">
          <v-icon @click="update(item)">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import RegistrarFamilia from "@/components/admin/RegistrarFamilia";
import ActualizarFamilia from "@/components/admin/ActualizarFamilia";


export default {
  components: {
    RegistrarFamilia: RegistrarFamilia,
    ActualizarFamilia: ActualizarFamilia,
  },
  data: () => ({
    dialogRegister: false,
    dialogRegisterKey: 1,
    dialogUpdate: false,
    dialogUpdateKey: 100,
    currentDay: new Date(),
    periodos: ['2021-1', '2021-2'],
    periodoActual: '2021-1',
    estadoRealizado: false,
    search: '',
    headers: [
      {
        text: 'Familia',
        align: 'start',
        sortable: false,
        value: 'nombre',
      },
      { text: 'Número de animales', value: 'cantidad' },
      { text: 'Característica', value: 'caracteristica' },
      { text: 'Actualización', value: 'actualizacion', align: 'center' },
    ],
    familias1: [
      {
        id: 1,
        nombreFamilia: 'Familia 1',
        numeroAnimales: 14,
        caracteristica: 'Característica A',
      },
      {
        id: 2,
        nombreFamilia: 'Familia 2',
        numeroAnimales: 10,
        caracteristica: 'Característica B',
      }
    ],
    familiaSeleccionada: null,
  }),
  methods: {
    changePeriod(){
      this.getFamilias({periodo: this.periodoActual, tipo:this.animal.name});
    },
    update(data){
      console.log('Familia actualizar', data);
      this.familiaSeleccionada = data;
      this.familiaSeleccionada = {
        id: data.id,
        nombreFamilia: data.nombreFamilia,
        numeroAnimales: data.numeroAnimales,
        caracteristica: data.caracteristica,
      };
      this.dialogUpdate = true;
    },
    updateFamily ({data}){
      this.dialogUpdate = false;
      this.dialogUpdateKey += 1;
      console.log('Actualizar familia completado');
      this.familias.push(data);
    },
    registerFamily({data}){
      //this.familias.push(data);
      let tipoAnimal;
      if (this.animal.name === "Alpacas"){
        tipoAnimal = 'Alpaca'
      } else {
        tipoAnimal = 'Ovino'
      };
      let payload = {
        nombre: data.nombre,
        periodo: this.periodoActual,
        fechaRegistro: "2021-11-16",
        tipo: tipoAnimal,
        cantidad: data.cantidad,
        caracteristica: data.caracteristica,
      };
      this.registarFamilia({periodo: this.periodoActual, payload: payload }).then(() => {
        this.getFamilias({periodo: this.periodoActual, tipo:this.animal.name});
      });
      this.dialogRegister = false;
      this.dialogRegisterKey += 1;
    },
    registrarRealizacion(){
      console.log('Entro');
    },
    formatDay (date) {
      let diaSemana = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      let mes = ['Enero', 'Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
      return diaSemana[date.getDay()]+', '+ date.getDate()+ ' de '+ mes[date.getMonth()] + ' del '+ date.getFullYear();
    },
    ...mapActions({
      getFamilias: 'admin/monitoreo/getFamilias',
      registarFamilia: 'admin/monitoreo/registarFamilia'
    }),
  },
  mounted() {
    this.getFamilias({periodo: this.periodoActual, tipo:this.animal.name});
    console.log('imprimer resultado familias', this.familias);
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
