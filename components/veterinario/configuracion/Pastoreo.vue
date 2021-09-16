<template>
  <div style="margin: 10px">
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
    <h6 style="margin-top: 20px">
      Por favor, configure el horario de pastoreo para la familia:
    </h6>
    <v-card
      elevation="2"
      width="600px"
    >
      <v-card-title
        style="display: flex; justify-content: right;background: #FFEAB5"
      >
        <v-btn
          v-if="!registrado"
          rounded
          color="primary"
          @click="infoRegistrada"
        >
          Guardar
        </v-btn>
        <v-btn
          v-if="registrado"
          rounded
          color="primary"
        >
          Actualizar
        </v-btn>
      </v-card-title>
      <v-card-text style="display: flex; justify-content: center; background: #FFEAB5">
        <div>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="8"><h3>Tiempo de pastoreo (min):</h3></v-col>
            <v-col md="4" no-gutters>
              <v-text-field
                label="Tiempo"
                v-model="tiempoPastoreo"
                solo
                hide-details
                style="background: white"
              />
            </v-col>
          </v-row>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="8"><h3>Horario de pastoreo:</h3></v-col>
            <v-col md="4" no-gutters>
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
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                    style="background: white"
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
            <v-col md="8"><h3>Día de pastoreo:</h3></v-col>
            <v-col md="4" no-gutters>
              <v-select
                label="Día"
                solo
                hide-details
                style="background: white"
                :items="diasSemana"
                v-model="diaSelecto"
              />
            </v-col>
          </v-row>
          <v-row style="display: flex; justify-content: right; margin: 1px">
            <v-col md="8"></v-col>
            <v-col md="4" style="justify-content: right; display: flex">
              <v-btn
                color="primary"
                rounded
                outlined
                style="background: white"
                @click="agregarHorario"
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
                  <v-icon @click="eliminarHorario(index)">{{icons.mdiCloseCircle}}</v-icon>
                </v-row>
                <v-row style="margin: 1px;">
                  Tiempo: {{horario.tiempo}} min
                </v-row>
                <v-row style="margin: 1px;">
                  Salida: {{horario.horario}} hrs
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
import { mdiCloseCircle, mdiCheckboxMarkedCircle, mdiAlert } from '@mdi/js';

export default {
  name: "Pastoreo",
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
  }),
  methods: {
    agregarHorario() {
      if (this.time !== null){
        console.log('Nuevo horario', this.time);
        this.horariosPastoreo.push({dia: this.diaSelecto, horario: this.time, tiempo: this.tiempoPastoreo});
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
    infoRegistrada() {
      console.log('Información del día', this.diaSelecto);
      console.log('Información del horario', this.time);
      console.log('Información del tiempo', this.tiempoPastoreo);
    },
  },
}
</script>

<style scoped>

</style>
