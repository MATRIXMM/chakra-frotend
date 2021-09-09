<template>
  <v-container fill-height fluid>
    <v-main class="text-center">
      <v-row>
        <v-col>
          <h1>¡Bienvenido a Chakra!</h1>
          <p>¿Con cuál tipo de animal se trabajará hoy?</p>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-card
          max-width="200"
          color="#DAE5C5"
          class="ma-5 pa-5"
          v-for="(animal, idx) in animals"
          :key="idx"
          @click="changeAnimal({ animal })"
        >
          <v-img :src="animal.image"></v-img>
          <h3 class="mt-2">{{ animal.name }}</h3>
        </v-card>
      </v-row>
    </v-main>
  </v-container>
</template>
<script>
import { animals } from "@/assets/json/animals";
import { mapActions } from 'vuex';

export default {
  data: () => ({
    animals,
  }),
  methods: {
    ...mapActions({
      changeAnimalState: 'changeAnimal',
    }),
    changeAnimal({ animal }){
      this.changeAnimalState({ animal })
      this.$router.push('/admin/configuracion')
    }
  }
};
</script>
<style scoped>
h1 {
  font-size: 2.5rem;
}
p {
  font-size: 1.2rem;
}
</style>
