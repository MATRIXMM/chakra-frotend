import { MapElementFactory } from "vue2-google-maps";

export default MapElementFactory({
  name: "directionsRenderer",

  ctr() {
    return google.maps.DirectionsRenderer;
  },

  events: ['directions_changed'],

  mappedProps: {},

  props: {
    origin: { type: Object },
    destination: { type: Object },
    travelMode: { type: String }
  },

  afterCreate(directionsRenderer) {
    let directionsService = new google.maps.DirectionsService();

    this.$watch(
      () => [this.origin, this.destination, this.travelMode],
      () => {
        let { origin, destination, travelMode } = this
        if (!origin || !destination || !travelMode) return

        let neworigin = JSON.parse(JSON.stringify(origin))
        let newdest = JSON.parse(JSON.stringify(destination))

        directionsService.route(
          {
            origin: neworigin,
            destination: newdest,
            travelMode,
          },
          (response, status) => {
            console.log('RESPONSE->', response)
            if (status !== "OK") return;
            directionsRenderer.setDirections(response);
          }
        );
      }
    )
  }
});
