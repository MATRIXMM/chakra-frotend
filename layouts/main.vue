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
          v-for="(item, i) in items"
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
import { mapGetters } from 'vuex'

export default {
  middleware: 'animal',
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
        {
          title: 'Incidencia',
          icon: 'mdi-calendar',
          to: '/veterinario/incidencia'
        },
        {
          title: 'Seguimiento',
          icon: 'mdi-calendar',
          to: '/veterinario/seguimiento'
        },
        {
          title: 'Monitoreo de Incidentes',
          icon: 'mdi-calendar',
          to: '/veterinario/monitoreo'
        }
      ],
      right: true,
      rightDrawer: false,
      title: 'Chakra'
    }
  },
  computed: {
        ...mapGetters([
      'getAnimalName',
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
