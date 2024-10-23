<template>
  <v-app :theme="theme">
    <v-navigation-drawer v-model="drawer" class="bg-greybg">
      <v-list-item title="Módulo Acadêmico" :to="'/'"></v-list-item>
      <v-divider></v-divider>
      <v-list-item title="Alunos" :to="'/student'"></v-list-item>
    </v-navigation-drawer>

    <v-app-bar
      title="Consulta de Alunos"
      :elevation="0"
      class="border-b bg-greybg"
    >
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <template v-slot:append>
        <v-btn icon="mdi-theme-light-dark" @click="toggleTheme()"></v-btn>
      </template>
    </v-app-bar>

    <v-main class="bg-greybg">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <snackbar-custom></snackbar-custom>
  </v-app>
</template>

<script>
import { useAppStore } from '@/stores/app'
import SnackbarCustom from '@/components/SnackbarCustom.vue'

export default {
  components: {
    SnackbarCustom: SnackbarCustom,
  },
  data: () => ({
    drawer: true,
  }),
  computed: {
    theme() {
      return useAppStore().theme
    },
  },
  methods: {
    toggleTheme() {
      useAppStore().theme = useAppStore().theme === 'light' ? 'dark' : 'light'
    },
  },
}
</script>
