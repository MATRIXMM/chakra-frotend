<template>
  <GmapMap
    :center="center"
    :zoom="18"
    :options="{
      streetViewControl: false,
      draggable: true,
      zoomControl: true,
      gestureHandling: 'greedy',
    }"
    style="width: 100%; height: 400px"
  >
    <DirectionsRenderer
      travelMode="DRIVING"
      :origin="center"
      :destination="location"
    />
    <!-- <GmapMarker
      :key="index"
      v-for="(position, index) in thislocations"
      :position="position"
      :clickable="true"
      :draggable="true"
      @click="center = position"
    /> -->
  </GmapMap>
</template>
<script>
import DirectionsRenderer from "./DirectionsRenderer.js";

export default {
  components: {
    DirectionsRenderer,
  },
  props: {
    location: {
      type: Object,
    },
    center: {
      type: Object,
    },
  },
  data() {
    return {
      //pruebas con coordenadas de VMT
      default: [
        {
          lat: -12.210496,
          lng: -76.896494,
        },
        {
          lat: -12.212508,
          lng: -76.89743,
        },
        {
          lat: -12.209348,
          lng: -76.898012,
        },
      ],
    };
  },
};
</script>
