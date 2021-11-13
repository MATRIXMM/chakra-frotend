<template>
  <div style="padding: 20px">
    <RegistrarIncidencia :key="dialogRegisterKey" v-model="dialogRegister" @register="registerIncident"/>
    <h2>
      Historial de incidencias registradas de {{this.animal.name}}
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
           + Registar incidencia
          </v-btn>
        </v-col>
      </v-card-title>
      <v-data-table
        v-if="incidentes"
        :headers="headers"
        :items="incidentes"
        :search="search"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import RegistrarIncidencia from "@/components/granjero/RegistrarIncidencia";

export default {
  name: "HistorialSanitario",
  components: {
    RegistrarIncidencia: RegistrarIncidencia,
  },
  data: () => ({
    dialogConfirmacionKey: 38,
    dialogConfirmacion: false,
    dialogRegister: false,
    dialogRegisterKey: 1,
    currentDay: new Date(),
    periodos: ['2021-1','2021-2'],
    periodoActual: '2021-1',
    estadoRealizado: false,
    horarios: [{id:1, horario:'09:00', estado: true}, {id:2, horario:'12:00', estado: true}, {id:3, horario:'16:00', estado: false}],
    search: '',
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: false,
        value: 'nombreAnimal',
      },
      { text: 'Familia', value: 'nombreFamilia' },
      { text: 'Fecha de registro', value: 'fechaRegistro' },
      { text: 'Gravedad', value: 'gravedadIncidencia' },
      { text: 'Detalle de observación', value: 'observacion' },
    ],
    incidencias2: [
      {
        nombreAnimal: 'Perico',
        nombreFamilia: 'Familia 1',
        fechaRegistro: '2021/06/06',
        gravedad: 'Alta',
        detalleObservacion: 'Contagio de una enfermedad de la piel'
      },
      {
        nombreAnimal: 'Pedro',
        nombreFamilia: 'Familia 2',
        fechaRegistro: '2021/06/06',
        gravedad: 'Baja',
        detalleObservacion: 'Ingesta de un alimento suministrado incorrectamente'
      }
    ]
  }),
  methods: {
    changePeriod(){
      this.getIncidentes({periodo: this.periodoActual, tipo: this.animal.name});
      this.setPeriod({periodo:this.periodoActual});
    },
    async registerIncident({data}){
      await this.registrarIncidencia({payload: data}).then(()=> {
        this.getIncidentes({periodo: this.periodoActual, tipo: this.animal.name});
      });
      //console.log('La informacion para registro es :', data);
      this.dialogRegister = false;
      this.dialogRegisterKey += 1;
    },
    formatDay (date) {
      let diaSemana = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      let mes = ['Enero', 'Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
      console.log("GetDay", date.getDay());
      return diaSemana[date.getDay()]+', '+ date.getDate()+ ' de '+ mes[date.getMonth()] + ' del '+ date.getFullYear();
    },
    ...mapActions({
      getIncidentes: 'admin/sanitario/getIncidentes',
      setPeriod: 'veterinario/pastoreo/setPeriod',
      registrarIncidencia: 'admin/sanitario/registrarIncidencia',
    }),
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
      incidentes: state => state.admin.sanitario.incidentes,
    }),
  },
  mounted() {
    this.getIncidentes({periodo: this.periodoActual, tipo: this.animal.name});
  }
}
</script>

<style scoped>

</style>
