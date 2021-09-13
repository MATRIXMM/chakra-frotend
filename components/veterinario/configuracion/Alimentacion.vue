<template>
  <div style="margin: 10px">
    <v-chip
      color= #1976D2
      text-color="black"
      class="font-weight-black"
    >
      Alimentación
    </v-chip>
    <h6 style="margin-top: 20px">
      Por favor, agregue los horarios de alimentación para la familia:
    </h6>
    <v-card
      elevation="2"
      width="600px"
    >
      <v-card-title
        style="display: flex; justify-content: right;background: #FFEAB5"
      >
        <div>
          <v-btn
            v-if="!registrado"
            rounded
            outlined
            color="primary"
            style="background: white"
            :disabled="disabled"
          >
            Cancelar
          </v-btn>
          <v-btn
            v-if="!registrado"
            rounded
            color="primary"
            @click="presionarInfo"
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
        </div>
      </v-card-title>
      <v-card-text style="display: flex; justify-content: center; background: #FFEAB5">
        <div>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="8"><h3>Alimento:</h3></v-col>
            <v-col md="4" no-gutters>
              <v-text-field
                label="Alimento"
                v-model="info"
                solo
                hide-details
                style="background: white"
              />
            </v-col>
          </v-row>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="8"><h3>Cantidad de alimento (kg):</h3></v-col>
            <v-col md="4" no-gutters>
              <v-text-field
                label="Cantidad de alimento"
                v-model="info1"
                solo
                hide-details
                style="background: white"
              />
            </v-col>
          </v-row>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="8"><h3>Horario de alimentación:</h3></v-col>
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
          <v-row style="display: flex; justify-content: right; margin: 1px">
            <v-btn
              color="primary"
              rounded
              @click="agregarHorario"
            >
              + Agregar
            </v-btn>
          </v-row>
          <v-card height="70" style=";margin: 7px">
            <v-chip v-for="(horario,index) in horariosAlimentacion" :key="index" style="margin: 5px; background: #DEFFA1">
              <h3>{{horario}}</h3>
              <template>
                <v-icon @click="eliminarHorario(index)">{{icons.mdiCloseCircle}}</v-icon>
              </template>
            </v-chip>
          </v-card>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mdiCloseCircle } from '@mdi/js';

export default {
  name: "Alimentacion",
  data: () => ({
    icons: {
      mdiCloseCircle
    },
    registrado: false,
    info: 'aa',
    info1: '',
    valor: 'valor registrado',
    picker: null,
    time: null,
    menu2: false,
    disabled: false,
    horariosAlimentacion: [],
  }),
  methods: {
    presionarInfo(){
      console.log('Este es un mensaje', this.info);
      console.log('Este es otro mensaje', this.info1);
    },
    agregarHorario() {
      if (this.time !== null){
        console.log('Nuevo horario', this.time);
        this.horariosAlimentacion.push(this.time);
        this.time = null;
      }else{
        alert('Agregue un horario disponible');
      }
    },
    eliminarHorario(index){
      console.log('Eliminar el horario', index);
      this.horariosAlimentacion.splice(index,1);
    },
  },
}
</script>

<style scoped>

</style>
