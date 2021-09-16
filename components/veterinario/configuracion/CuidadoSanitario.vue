<template>
  <div style="margin: 10px">
    <v-chip
      color= #1976D2
      text-color="black"
      class="font-weight-black"
    >
      Cuidado Sanitario
    </v-chip>
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
        </div>
      </v-card-title>
      <v-card-text style="display: flex; justify-content: center; background: #FFEAB5">
        <div>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="6"><h3>Nombre de evento</h3></v-col>
            <v-col md="6" no-gutters>
              <v-text-field
                label="Nombre de evento"
                v-model="nombreEvento"
                solo
                hide-details
                style="background: white"
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
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    style="background: white"
                    hide-details
                    locale="es-PE"
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
            <v-btn
              color="primary"
              rounded
              @click="agregarEvento"
            >
              + Agregar
            </v-btn>
          </v-row>
          <v-col md="12">
            <v-card style=";margin: 7px">
              <div style="margin: 1px; padding: 10px">
                <v-card v-for="(evento,index) in eventos" :key="index" style="margin: 5px; background: #DEFFA1; padding: 10px; display: inline-block">
                  <template>
                    <v-row style="margin: 1px; display: flex; justify-content: space-between">
                      <v-col md="8">
                        <h3>
                          {{evento.nombre}}
                        </h3>
                      </v-col>
                      <v-col md="4">
                        <v-icon @click="eliminarEvento(index)">{{icons.mdiCloseCircle}}</v-icon>
                      </v-col>
                    </v-row>
                    <v-row style="margin: 1px;">
                      Fecha: {{evento.dia}}
                    </v-row>
                  </template>
                </v-card>
              </div>
            </v-card>
          </v-col>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mdiCloseCircle } from '@mdi/js';

export default {
  name: "CuidadoSanitario",
  data: () => ({
    icons: {
      mdiCloseCircle
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
      this.horariosPastoreo.splice(index,1);
    },
    infoRegistrada() {
      console.log('Información del día', this.date);

    },
  },
}
</script>

<style scoped>

</style>
