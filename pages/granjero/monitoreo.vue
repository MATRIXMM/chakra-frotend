<template>
  <div>
    <h2 class="headline">
      Monitoreo de las familias que realizan actividad de pastoreo
    </h2>
    <p>A continuación, visualizará la ubicación de las familias de ganado</p>
    <v-divider class="mt-2 mb-4"></v-divider>
    <v-row>
      <v-col md="8">
        <MapComponent :center="center" :location="location" :key="mapKey" />
      </v-col>
      <v-col md="4">
        <v-card>
          <v-card-title style="display: flex; justify-content: center; background: #FFEAB5">
            <h1>
              Cronograma
            </h1>
          </v-card-title>
          <v-divider />
          <v-card-text v-if="showData" style="background: #FFEAB5">
            <v-row style="display: flex; align-items: center">
              <v-col md="1"></v-col>
              <v-col md="1">
                <v-icon x-large style="color:red">
                  mdi-alpha-a-circle
                </v-icon>
              </v-col>
              <v-col md="7">
                <h2>
                  Familia A
                </h2>
              </v-col>
            </v-row>
            <v-row style="display: flex; align-items: center">
              <v-col md="1"></v-col>
              <v-col md="1">
                <v-icon x-large>
                  mdi-clock-outline
                </v-icon>
              </v-col>
              <v-col md="7">
                <h2>
                  Tiempo restante: 40 min
                </h2>
              </v-col>
            </v-row>
            <v-row>
            </v-row>
            <v-row style="display: flex; align-items: center">
              <v-col md="1"></v-col>
              <v-col md="1">
                <v-icon x-large style="color:red">
                  mdi-alpha-b-circle
                </v-icon>
              </v-col>
              <v-col md="7">
                <h2>
                  Familia B
                </h2>
              </v-col>
            </v-row>
            <v-row style="display: flex; align-items: center">
              <v-col md="1"></v-col>
              <v-col md="1">
                <v-icon x-large>
                  mdi-clock-outline
                </v-icon>
              </v-col>
              <v-col md="7">
                <h2>
                  Tiempo restante: 25 min
                </h2>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4">
        <v-file-input
          truncate-length="15"
          label="Archivo de prueba"
          show-size
          v-model="file"
          @change="readFile"
        />
        <v-card v-if="familyLocations.length > 0">
          <v-card-title>Cronograma</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-card
              class="mb-4"
              v-for="(item, index) in familyLocations"
              :key="index"
              @click="getDirections(item)"
            >
              <v-card-title class="subtitle-1"> Familia {{ index + 1 }} </v-card-title>
              <v-card-subtitle>
                <v-icon>mdi-clock-time-five-outline</v-icon>
                Tiempo restante: 40 mins
                </v-card-subtitle>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import MapComponent from "../../components/MapComponent.vue";

export default {
  layout: "main",
  components: {
    MapComponent,
  },
  data() {
    return {
      showData: false,
      file: null,
      mapKey: 0,
      center: {
        lat: -10.5775,
        lng: -75.40167,
      },
      location: {
        lat: -10.5775,
        lng: -75.40167,
      },
      familyLocations: [],
    };
  },
  mounted() {
    // this.locateGeoLocation();
  },
  methods: {
    readFile(file) {
      if (file) {
        this.showData = true;
        const reader = new FileReader();
        reader.onload = (e) => {
          let text = e.target.result;
          let arr = text.split(/\r?\n/); //split new lines
          let coordenates = arr.map((e) => {
            let ns = e.split(",");
            return {
              lat: Number(ns[0]),
              lng: Number(ns[1]),
            };
          });
          this.center = coordenates[0];
          coordenates.shift();
          this.familyLocations = coordenates;
          this.location = coordenates[0];
          // if (this.familyLocations) this.reloadMap()
        };
        reader.readAsText(file);
      }
    },
    getDirections(item) {
      this.location = item;
    },
    reloadMap() {
      this.mapKey += 1;
    },
    // locateGeoLocation() {
    //   navigator.geolocation.getCurrentPosition((res) => {
    //     this.center = {
    //       lat: res.coords.latitude,
    //       lng: res.coords.longitude,
    //     };
    //   });
    // },
  },
};
</script>
