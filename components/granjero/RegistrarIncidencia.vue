<template>
  <v-dialog :value="value" @input="$emit('input')" width="500" class="rounded-xl">
    <Confirmacion :key="dialogConfirmacionKey" v-model="dialogConfirmacion" :funcion="registrarIncidencia" :message="messageConfirmacion" />
    <v-card height="660" class="rounded-xl">
      <v-card-title style="background: #1ECD96; padding: 0; justify-content: center; height: 60px">
        <h2>Registro de incidencia</h2>
      </v-card-title>
      <v-card-text style="margin: 0; padding: 30px">
        <v-row class="font-weight-bold" style="display: flex; align-items: center">
          <v-col md="6">
            <h3>
              Nombre de Familia:
            </h3>
          </v-col>
          <v-col>
            <v-select
              v-model="familiaSeleccionada"
              :items="family"
              item-text="nombre"
              item-value="idFamilia"
              solo
              hide-details
              return-object
              @change="obtenerFamilia"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row style="display: flex; align-items: center">
          <v-col md="6">
            <h3>
              Número de animales:
            </h3>
          </v-col>
          <v-col md="2">
            <v-text-field
              v-model="cantidadAnimales"
              solo
              hide-details
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row style="display: flex; align-items: center">
          <v-col md="6">
            <h3>
              Nombre del animal:
            </h3>
          </v-col>
          <v-col>
            <v-text-field
              v-model="nombreAnimal"
              solo
              hide-details
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row style="display: flex; align-items: center">
          <v-col md="6">
            <h3>
              Gravedad del incidente:
            </h3>
          </v-col>
          <v-col>
            <v-select
              v-model="gravedadSeleccionada"
              :items="tiposGravedad"
              item-text="gravedad"
              item-value="id"
              solo
              hide-details
              return-object
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row style="display: flex; align-items: center">
          <v-col md="6">
            <h3>
              Observación del incidente:
            </h3>
          </v-col>
        </v-row>
        <v-row class="font-weight-bold">
          <v-col>
            <v-textarea
              v-model="observacion"
              solo
              hide-details
            >
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          depressed
          color="primary"
          style="padding:15px"
          rounded
          outlined
          @click="$emit('input')"
        >
          CANCELAR
        </v-btn>
        <v-btn
          depressed
          color="primary"
          style="padding:15px"
          rounded
          @click="dialogConfirmacion=true"
        >
          REGISTRAR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {mdiAlert, mdiCheckboxMarkedCircle, mdiCloseCircle} from "@mdi/js";

export default {
  name: "RegistrarIncidencia",
  props: {
    value: Boolean,
  },
  data: () => ({
    dialogConfirmacionKey: 38,
    dialogConfirmacion: false,
    messageConfirmacion: '¿Está seguro que desea registrar la incidencia?',
    nombreFamilia: '',
    nombreAnimal: '',
    observacion: '',
    cantidadAnimales: 1,
    familias: [
      {
        id: 1,
        nombreFamilia: 'Familia 1'
      },
      {
        id: 2,
        nombreFamilia: 'Familia 2'
      },
      {
        id: 3,
        nombreFamilia: 'Familia 3'
      }
    ],
    tiposGravedad: [
      {
        id: 1,
        gravedad: 'Baja'
      },
      {
        id: 2,
        gravedad: 'Media'
      },
      {
        id: 3,
        gravedad: 'Alta'
      }
    ],
    familiaSeleccionada: {},
    gravedadSeleccionada: {id: 1, gravedad: 'Baja' },
  }),
  methods: {
    obtenerFamilia(){
      console.log('imprime la familia obtenida', this.familiaSeleccionada);
    },
    registrarIncidencia(){
      const data = {
        idFamilia: this.familiaSeleccionada.idFamilia,
        nombreAnimal: this.nombreAnimal,
        fechaRegistro: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        cantidadAnimales: this.cantidadAnimales,
        gravedadIncidencia: this.gravedadSeleccionada.gravedad,
        observacion: this.observacion,
      };
      this.$emit('register', {data: data})
    },
    ...mapActions({
      getFamily: 'admin/monitoreo/getFamily',
    }),
  },
  computed: {
    ...mapState({
      animal: state => state.animal,
      family: state => state.admin.monitoreo.family,
      periodo: state => state.veterinario.pastoreo.periodo,
    }),
  },
  mounted() {
    this.getFamily({periodo: this.periodo, tipo:this.animal.name}).then(()=> {
      this.familiaSeleccionada = this.family[0];
    });
    const date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
    console.log('fecha actual de ahora', date);

  }

}
</script>

<style scoped>

</style>
