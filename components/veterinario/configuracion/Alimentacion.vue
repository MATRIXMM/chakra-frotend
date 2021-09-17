<template>
  <div style="margin: 10px">
    <v-chip
      color= #1976D2
      text-color="black"
      class="font-weight-black"
    >
      Alimentación
    </v-chip>
    <v-icon v-if="registrado" color="primary">
      {{icons.mdiCheckboxMarkedCircle}}
    </v-icon>
    <v-icon v-else color="#FFDA2D">
      {{icons.mdiAlert}}
    </v-icon>
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
            color="primary"
            @click="registrarAlimentacion"
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
                v-model="alimento"
                solo
                hide-details
                style="background: white"
                :disabled="registrado"
              />
            </v-col>
          </v-row>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="8"><h3>Cantidad de alimento (kg):</h3></v-col>
            <v-col md="4" no-gutters>
              <v-text-field
                label="Cantidad de alimento"
                v-model="cantidadAlimento"
                solo
                hide-details
                style="background: white"
                :disabled="registrado"
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
          <v-row style="display: flex; justify-content: right; margin: 1px">
            <v-col md="8">
            </v-col>
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
          <v-card-actions>
            <v-chip dense v-for="(horario,index) in horasAlimentacion" :key="index" style="margin: 5px; background: #DEFFA1">
              <h3>{{horario}}</h3>
              <template>
                <v-icon style="margin-left: 5px" @click="eliminarHorario(index)">{{icons.mdiCloseCircle}}</v-icon>
              </template>
            </v-chip>
          </v-card-actions>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mdiCloseCircle, mdiCheckboxMarkedCircle, mdiAlert } from '@mdi/js';

export default {
  name: "Alimentacion",
  props: {
    idAlimentacion: String,
  },
  data: () => ({
    icons: {
      mdiCloseCircle,
      mdiCheckboxMarkedCircle,
      mdiAlert
    },
    registrado: false,
    alimento: '',
    cantidadAlimento: '',
    valor: 'valor registrado',
    picker: null,
    time: null,
    menu2: false,
    disabled: false,
    horasAlimentacion: [],
  }),
  methods: {
    registrarAlimentacion(){
      console.log(this.$route.params.id)
      console.log('Este es un mensaje', this.alimento);
      console.log('Este es otro mensaje', this.cantidadAlimento);
      console.log('Este es otro mensaje', this.horasAlimentacion);
    },
    agregarHorario() {
      if (this.time !== null){
        console.log('Nuevo horario', this.time);
        this.horasAlimentacion.push(this.time);
        this.time = null;
      }else{
        alert('Agregue un horario disponible');
      }
    },
    eliminarHorario(index){
      console.log('Eliminar el horario', index);
      this.horasAlimentacion.splice(index,1);
    },
  },
  mounted() {
    console.log('El valor del id del props es: ', this.idAlimentacion)
  }
}
</script>

<style scoped>

</style>
