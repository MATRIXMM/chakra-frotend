<template>
  <div style="margin: 10px">
    <Confirmacion :key="dialogConfirmacionKey" v-model="dialogConfirmacion" :funcion="registrarAlimentacion" message="¿Está seguro que desea configurar la alimentación de este modo?" />
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
    <h5 style="margin-top: 20px">
      Por favor, agregue los horarios de alimentación para la familia:
    </h5>
    <v-card
      elevation="2"
      width="700px"
    >
      <v-card-title
        style="display: flex; justify-content: right;background: #FFEAB5"
      >
        <div>
          <v-btn
            v-if="!registrado"
            rounded
            color="primary"
            @click="dialogConfirmacion = true"
          >
            Guardar
          </v-btn>
          <v-btn
            v-if="registrado"
            rounded
            color="primary"
            @click="actualizarAlimentacion"
          >
            Actualizar
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text style="display: flex; justify-content: center; background: #FFEAB5">
        <div>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="5"><h3>Alimento:</h3></v-col>
            <v-col md="7" no-gutters>
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
            <v-col md="5"><h3>Cantidad de alimento (kg):</h3></v-col>
            <v-col md="7" no-gutters>
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
            <v-col md="5"><h3>Horario de alimentación:</h3></v-col>
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
          <v-row style="display: flex; justify-content: right; margin: 1px">
            <v-col md="5">
            </v-col>
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
            <v-chip dense v-for="(horario,index) in horasAlimentacion" :key="index" style="margin: 5px; background: #DEFFA1; display: inline-block">
              <h3>{{ (horario.horario).substr(11,10)}}</h3>
              <template>
                <v-icon :disabled="registrado" style="margin-left: 5px" @click="">{{icons.mdiCloseCircle}}</v-icon>
              </template>
            </v-chip>
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
  name: "Alimentacion",
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
    registrado: false,
    alimento: '',
    cantidadAlimento: '',
    valor: 'valor registrado',
    picker: null,
    time: null,
    menu2: false,
    disabled: false,
    horasAlimentacion: [],
    actualizar: false,
    dialogConfirmacionKey: 1,
    dialogConfirmacion: false,
  }),
  methods: {
    registrarAlimentacion(){
      if (this.actualizar) {
        console.log("este es un registro de actualizacion");
        this.actualizar = false;
      } else {
        console.log("Este es un registro nuevo");
        const payload = {
          idFamilia: this.$route.params.id,
          tipo: this.alimento,
          cantidad: this.cantidadAlimento,
          estado: false,
          horarios : this.horasAlimentacion,
        }
        this.registerAlimentacion({payload: payload}).then(async () => {
          await this.getAlimentacionFamilia({idFamilia: this.$route.params.id})
        });
        this.registrado = true;
      }
      //this.$emit('config', {value: this.registrado});
      this.dialogConfirmacion = false;
    },
    agregarHorario() {
      if (this.time !== null){
        // const current = new Date();
        const current = (new Date()).toISOString("yyyy-MM-dd'T'HH:mm:ss").split('T',1);
        const horario = current[0]+'T'+this.time+':00';
        this.horasAlimentacion.push({horario: horario, estado: false});
        this.time = null;
      }else{
        alert('Agregue un horario disponible');
      }
    },
    eliminarHorario(index){
      console.log('Eliminar el horario', index);
      this.horasAlimentacion.splice(index,1);
    },
    actualizarAlimentacion(){
      this.registrado = !this.registrado;
      this.actualizar = true;
    },
    ...mapActions({
      getValidarAlimentacion: 'veterinario/validacion/getValidarAlimentacion',
      getAlimentacionFamilia: 'veterinario/alimentacion/getAlimentacionFamilia',
      registerAlimentacion: 'veterinario/alimentacion/registerAlimentacion'
    }),
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
      validarAlimentacion: state => state.veterinario.validacion.validarAlimentacion,
      alimentacionFamilia: state => state.veterinario.alimentacion.alimentacionFamilia,
    }),
  },
  mounted() {
    this.getValidarAlimentacion({idFamilia: this.$route.params.id }).then( async () => {
      if (this.validarAlimentacion) {
        this.registrado = true;
        await this.getAlimentacionFamilia({idFamilia: this.$route.params.id});
        this.alimento = this.alimentacionFamilia.tipo;
        this.cantidadAlimento = this.alimentacionFamilia.cantidad;
        this.horasAlimentacion = this.alimentacionFamilia.horarios;
      } else {
        console.log('Alimentacion no validada')
      }
    });
  }
}
</script>

<style scoped>

</style>
