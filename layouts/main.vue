<template>
  <v-app>
    <v-navigation-drawer
      fixed
      app
      color="secondary"
      outlined
    >
      <div class="nav-title">
      {{ getAnimalName }}
      </div>
      <v-list>
        <v-list-item
          v-for="(item, i) in getUserOptions"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
         <v-list dense nav>
          <v-list-item link @click="changeAnimal">
            <v-list-item-action>
              <v-icon>mdi-swap-horizontal</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Cambio de animal</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="logout">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </template>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
      color="secondary"
      flat
      outlined
    >
      <v-spacer />
      <v-toolbar-title><span class="toolbar">{{ title }}</span></v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container class="pa-8">
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  middleware: ['auth', 'animal'],
  data () {
    return {
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          title: 'Configuracion',
          icon: 'mdi-cog',
          to: '/veterinario/configuracion'
        },
      ],
      right: true,
      rightDrawer: false,
      title: 'Chakra'
    }
  },
  computed: {
        ...mapGetters([
      'getAnimalName',
      'getUserOptions',
    ])
  },
  methods: {
    changeAnimal() {
      this.$router.push('/welcome')
    },
    ...mapActions([
      'logout'
    ])
  }
}
</script>
<style scoped>
.toolbar{
  color:white;
  /* font-family: 'Montserrat'; */
  font-weight: bold;
  font-size: 2.5rem;
}
.nav-title{
  font-family: "Lobster";
  background: white;
  font-size: 2.5rem;
  padding: 2px;
  text-align: center;
  text-transform: capitalize;
}
</style>
