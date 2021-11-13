<template>
  <div style="margin: 10px">
    <Confirmacion :key="dialogConfirmacionKey" v-model="dialogConfirmacion" :funcion="infoRegistrada" message="¿Está seguro que desea configurar el pastoreo de este modo?" />
    <v-chip
      color= #1976D2
      text-color="black"
      class="font-weight-black"
    >
      Pastoreo
    </v-chip>
    <v-icon v-if="registrado" color="primary">
      {{icons.mdiCheckboxMarkedCircle}}
    </v-icon>
    <v-icon v-else color="#FFDA2D">
      {{icons.mdiAlert}}
    </v-icon>
    <h5 style="margin-top: 20px">
      Por favor, configure el horario de pastoreo para la familia:
    </h5>
    <v-card
      elevation="2"
      width="700px"
    >
      <v-card-title
        style="display: flex; justify-content: right;background: #FFEAB5"
      >
        <v-btn
          v-if="!registrado"
          rounded
          color="primary"
          @click="dialogConfirmacion = true"
          :disabled="registrado"
        >
          Guardar
        </v-btn>
        <v-btn
          v-if="registrado"
          rounded
          color="primary"
          @click="actualizarPastoreo"
        >
          Actualizar
        </v-btn>
      </v-card-title>
      <v-card-text style="display: flex; justify-content: center; background: #FFEAB5">
        <div>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="5"><h3>Tiempo de pastoreo (min):</h3></v-col>
            <v-col md="7" no-gutters>
              <v-text-field
                label="Tiempo"
                v-model="tiempoPastoreo"
                solo
                hide-details
                style="background: white"
                :disabled="registrado"
              />
            </v-col>
          </v-row>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="5"><h3>Horario de pastoreo:</h3></v-col>
            <v-col md="7" no-gutters>
              <v-menu
                ref="menu"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="time"
                    label="Horario"
                    prepend-inner-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                    solo
                    style="background: white"
                    :disabled="registrado"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="time"
                  full-width
                  @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="5"><h3>Día de pastoreo:</h3></v-col>
            <v-col md="7" no-gutters>
              <v-select
                label="Día"
                solo
                hide-details
                style="background: white"
                :items="diasSemana"
                v-model="diaSelecto"
                :disabled="registrado"
              />
            </v-col>
          </v-row>
          <v-row style="display: flex; justify-content: right; margin: 1px">
            <v-col md="5"></v-col>
            <v-col md="7" style="justify-content: right; display: flex">
              <v-btn
                color="primary"
                rounded
                outlined
                style="background: white"
                @click="agregarHorario"
                :disabled="registrado"
              >
                + Agregar
              </v-btn>
            </v-col>
          </v-row>
          <div style="margin: 1px; padding: 10px; display: table-cell">
            <v-card v-for="(horario,index) in horariosPastoreo" :key="index" style="margin: 5px; background: #DEFFA1; padding: 10px; display: inline-block">
              <template>
                <v-row style="margin: 1px; display: flex; justify-content: space-between">
                  <h3>
                    {{horario.dia}}
                  </h3>
                  <v-icon @click="" :disabled="registrado">{{icons.mdiCloseCircle}}</v-icon>
                </v-row>
                <v-row style="margin: 1px;">
                  Tiempo: {{horario.tiempo}} min
                </v-row>
                <v-row style="margin: 1px;">
                  Salida: {{ (horario.horario).substr(11,10)}} hrs
                </v-row>
              </template>
            </v-card>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import { mdiCloseCircle, mdiCheckboxMarkedCircle, mdiAlert } from '@mdi/js';
import Confirmacion from "@/components/confirmacion/Confirmacion";

export default {
  name: "Pastoreo",
  components: {
    Confirmacion: Confirmacion,
  },
  props: {
    idIncidente: String,
  },
  data: () => ({
    icons: {
      mdiCloseCircle,
      mdiCheckboxMarkedCircle,
      mdiAlert
    },
    diaSelecto: '',
    registrado: false,
    tiempoPastoreo: null,
    picker: null,
    time: null,
    menu2: false,
    disabled: false,
    horariosPastoreo: [],
    diasSemana: [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ],
    actualizar: false,
    dialogConfirmacionKey: 1,
    dialogConfirmacion: false,
  }),
  methods: {
    agregarHorario() {
      if (this.time !== null){
        const current = new Date();
        const diaDiferencia = this.obtenerDias(this.diaSelecto);
        const dia = current.getFullYear()+'-'+current.getMonth()+'-'+((current.getDate() + diaDiferencia )<10 ? '0' + (current.getDate() + diaDiferencia ) : '' + (current.getDate() + diaDiferencia ))+'T'+this.time+':00';
        this.horariosPastoreo.push({dia: this.diaSelecto, horario: dia, tiempo: this.tiempoPastoreo});
        this.time = null;
        this.diaSelecto = '';
        this.tiempoPastoreo = null;
      }else{
        alert('Agregue un horario disponible');
      }
    },
    eliminarHorario(index){
      console.log('Eliminar el horario', index);
      this.horariosPastoreo.splice(index,1);
    },
    obtenerDias(dia){
      const diaHoy = (new Date()).getDay() - 1;
      let i=0;
      for (const item of this.diasSemana) {
        if (dia === item){
          break;
        }
        i = i +1;
      }
      return i - diaHoy;
    },
    infoRegistrada() {
      if (this.actualizar) {
        console.log("este es un registro de actualizacion");
        this.actualizar = false;
      } else {
        const payload = [];
        for (const horario of this.horariosPastoreo) {
          payload.push({idFamilia: this.$route.params.id, tiempo: horario.tiempo, horario: horario.horario, dia:horario.dia, estado: false});
        }
        //console.log('Imprime los resultados de los dias', payload);
        for (const pastoreo of payload) {
          this.registerPastoreo({payload: pastoreo});
        }
        this.registrado = true;
      }
      this.dialogConfirmacion = false;
    },
    actualizarPastoreo(){
      this.registrado = !this.registrado;
      this.actualizar = true;
    },
    ...mapActions({
      getValidarPastoreo: 'veterinario/validacion/getValidarPastoreo',
      getPastoreoFamilia: 'veterinario/pastoreo/getPastoreoFamilia',
      registerPastoreo: 'veterinario/pastoreo/registerPastoreo'
    }),
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
      periodo: state => state.veterinario.pastoreo.periodo,
      validarPastoreo: state => state.veterinario.validacion.validarPastoreo,
      pastoreoFamilia: state => state.veterinario.pastoreo.pastoreoFamilia,
    }),
  },
  mounted() {
    this.getValidarPastoreo({idFamilia: this.$route.params.id }).then( async () => {
      if (this.validarPastoreo) {
        this.registrado = true;
        await this.getPastoreoFamilia({idFamilia: this.$route.params.id, periodo: this.periodo, tipo: this.animal.name});
        this.horariosPastoreo = this.pastoreoFamilia;
      } else {
        console.log('WTF');
        console.log('Pastoreo no validado');
      }
    });
  }
}
</script>

<style scoped>

</style>
