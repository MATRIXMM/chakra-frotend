<template>
  <div style="margin: 10px">
    <Confirmacion :key="dialogConfirmacionKey" v-model="dialogConfirmacion" :funcion="infoRegistrada" message="¿Está seguro que desea configurar el cuidado sanitario de este modo?" />
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
          @click="actualizarCuidadoSanitario"
        >
          Actualizar
        </v-btn>
      </v-card-title>
      <v-card-text style="display: flex; justify-content: center; background: #FFEAB5">
        <div>
          <v-row style="align-items: center;margin: 1px">
            <v-col md="5"><h3>Nombre de evento</h3></v-col>
            <v-col md="7" no-gutters>
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
            <v-col md="5"><h3>Fecha de evento:</h3></v-col>
            <v-col md="7" no-gutters>
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
            <v-col md="5"></v-col>
            <v-col md="7" style="justify-content: right; display: flex">
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
                <v-icon @click="" :disabled="registrado">{{icons.mdiCloseCircle}}</v-icon>
              </v-card-title>
              <v-card-text style="padding: 5px; display: flex; justify-content: center">
                <h3>
                  {{evento.nombre}}
                </h3>
              </v-card-text>
              <v-card-actions style="padding: 5px; display: flex; justify-content: center">
                Fecha: {{evento.fecha}}
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {mdiAlert, mdiCheckboxMarkedCircle, mdiCloseCircle} from '@mdi/js';
import Confirmacion from "@/components/confirmacion/Confirmacion";

export default {
  name: "CuidadoSanitario",
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
    dialogConfirmacionKey: 1,
    dialogConfirmacion: false,
  }),
  methods: {
    agregarEvento() {
      if (this.nombreEvento !== null){
        this.eventos.push({idFamilia:this.$route.params.id , nombre: this.nombreEvento, fecha: this.date, estado: false});
        console.log('Evento registrado', this.eventos);
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
        for (const evento of this.eventos) {
          this.registerCuidadoSanitario({payload: evento});
        }
        console.log("Este es un registro nuevo");
        this.getCuidadoSanitario({idFamilia: this.$route.params.id, periodo: this.periodo, tipo: this.animal.name});
        this.registrado = true;
      }
      this.dialogConfirmacion = false;
    },
    actualizarCuidadoSanitario(){
      this.registrado = !this.registrado;
      this.actualizar = true;
    },
    ...mapActions({
      getValidarCuidadoSanitario: 'veterinario/validacion/getValidarCuidadoSanitario',
      getCuidadoSanitario: 'veterinario/cuidadoSanitario/getCuidadoSanitario',
      registerCuidadoSanitario: 'veterinario/cuidadoSanitario/registerCuidadoSanitario',
    }),
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
      periodo: state => state.veterinario.pastoreo.periodo,
      validarCuidadoSanitario: state => state.veterinario.validacion.validarCuidadoSanitario,
      cuidadoSanitarioFamilia: state => state.veterinario.cuidadoSanitario.cuidadoSanitarioFamilia,
    }),
  },
  mounted() {
    this.getValidarCuidadoSanitario({idFamilia: this.$route.params.id }).then( async () => {
      if (this.validarCuidadoSanitario) {
        this.registrado = true;
        await this.getCuidadoSanitario({idFamilia: this.$route.params.id, periodo: this.periodo, tipo: this.animal.name});
        this.eventos = this.cuidadoSanitarioFamilia;
      } else {
        console.log('Cuidado Sanitario no validado');
      }
    });
  },
}
</script>

<style scoped>

</style>
