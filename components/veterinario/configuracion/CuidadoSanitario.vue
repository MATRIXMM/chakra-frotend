<template>
  <div style="margin: 10px">
    <v-chip
      color= #1976D2
      text-color="black"
      class="font-weight-black"
    >
      Cuidado Sanitario
    </v-chip>
    <v-icon v-if="registrado" color="primary">
      {{icons.mdiCheckboxMarkedCircle}}
    </v-icon>
    <v-icon v-else color="#FFDA2D">
      {{icons.mdiAlert}}
    </v-icon>
    <h5 style="margin-top: 20px">
      Por favor, agregue los cuidados sanitarios para la familia:
    </h5>
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
          :disabled="registrado"
        >
          Guardar
        </v-btn>
        <v-btn
          v-if="registrado"
          rounded
          color="primary"
          @click="actualizarCuidadoSanitario"
        >
          Actualizar
        </v-btn>
      </v-card-title>
      <v-card-text style="display: flex; justify-content: center; background: #FFEAB5">
        <div>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="6"><h3>Nombre de evento</h3></v-col>
            <v-col md="6" no-gutters>
              <v-text-field
                label="Nombre de evento"
                v-model="nombreEvento"
                hide-details
                solo
                style="background: white"
                :disabled="registrado"
              />
            </v-col>
          </v-row>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="6"><h3>Fecha de evento:</h3></v-col>
            <v-col md="6" no-gutters>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Seleccione una fecha"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    style="background: white"
                    hide-details
                    solo
                    locale="es-PE"
                    :disabled="registrado"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                  color="primary"
                  locale="es-PE"
                  :min="nowDate"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row style="display: flex; justify-content: right; margin: 1px">
            <v-col md="6"></v-col>
            <v-col md="6" style="justify-content: right; display: flex">
              <v-btn
                color="primary"
                rounded
                outlined
                style="background: white"
                @click="agregarEvento"
                :disabled="registrado"
              >
                + Agregar
              </v-btn>
            </v-col>
          </v-row>
          <div style="margin: 1px; padding: 10px">
            <v-card rounded v-for="(evento,index) in eventos" :key="index" style="margin: 5px; background: #DEFFA1; padding: 10px">
              <v-card-title style="display: flex; justify-content: right; padding: 2px">
                <v-icon @click="eliminarEvento(index)" :disabled="registrado">{{icons.mdiCloseCircle}}</v-icon>
              </v-card-title>
              <v-card-text style="padding: 5px; display: flex; justify-content: center">
                <h3>
                  {{evento.nombre}}
                </h3>
              </v-card-text>
              <v-card-actions style="padding: 5px; display: flex; justify-content: center">
                Fecha: {{evento.dia}}
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {mdiAlert, mdiCheckboxMarkedCircle, mdiCloseCircle} from '@mdi/js';

export default {
  name: "CuidadoSanitario",
  props: {
    idIncidente: String,
  },
  data: () => ({
    icons: {
      mdiCloseCircle,
      mdiCheckboxMarkedCircle,
      mdiAlert
    },
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    nowDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    modal: false,
    diaSelecto: '',
    registrado: false,
    nombreEvento: '',
    picker: null,
    time: null,
    menu2: false,
    disabled: false,
    eventos: [],
    actualizar: false,
  }),
  methods: {
    agregarEvento() {
      if (this.nombreEvento !== null){
        this.eventos.push({nombre: this.nombreEvento, dia: this.date});
        this.nombreEvento = '';
        this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      }else{
        alert('Agregue un horario disponible');
      }
    },
    eliminarEvento(index){
      console.log('Eliminar el horario', index);
      this.eventos.splice(index,1);
    },
    infoRegistrada() {
      if (this.actualizar) {
        console.log("este es un registro de actualizacion");
        this.actualizar = false;
      } else {
        console.log("Este es un registro nuevo");
        this.registrado = true;
      }
    },
    actualizarCuidadoSanitario(){
      this.registrado = !this.registrado;
      this.actualizar = true;
    }
  },
  mounted() {
    if (this.idIncidente === '1') {
      this.eventos = [{nombre: 'Vacunacion A', dia: '2021-05-12'},{nombre: 'Vacunacion B', dia: '2021-09-12'}];
      this.registrado = true;

    }
  },
}
</script>

<style scoped>

</style>
