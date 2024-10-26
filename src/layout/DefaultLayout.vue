<template>
  <v-app :theme="theme">
    <v-navigation-drawer v-model="drawer" class="bg-greybg">
      <v-list>
        <v-list-item :subtitle="email" :title="name">
          <template v-slot:prepend>
            <v-avatar color="grey">
              <v-icon icon="mdi-account"></v-icon>
            </v-avatar>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list-item title="Módulo Acadêmico"></v-list-item>
      <v-divider></v-divider>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Alunos"
        :to="'/student'"
        @click="title = 'Consulta de Alunos'"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-school"
        title="Turmas"
        :to="'/team'"
        @click="title = 'Consulta de Turmas'"
      ></v-list-item>
    </v-navigation-drawer>

    <v-app-bar :title="title" :elevation="0" class="border-b bg-greybg">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <template v-slot:append>
        <v-btn icon="mdi-theme-light-dark" @click="toggleTheme()"></v-btn>
        <v-btn icon="mdi-logout" @click="logout()"></v-btn>
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
import { useUserStore } from '@/stores/user'
import SnackbarCustom from '@/components/SnackbarCustom.vue'

export default {
  components: {
    SnackbarCustom: SnackbarCustom,
  },
  data: () => ({
    drawer: false,
    title: 'Sistema de gestão escolar',
  }),
  computed: {
    name() {
      return useUserStore().name
    },
    email() {
      return useUserStore().email
    },
    theme() {
      return useAppStore().theme
    },
  },
  methods: {
    toggleTheme() {
      useAppStore().theme = useAppStore().theme === 'light' ? 'dark' : 'light'
    },
    logout() {
      this.$axios.post('/logout').then(() => {
        useUserStore().logout()
        localStorage.removeItem('user')
        this.$router.push({ name: 'login' })
      })
    },
  },
}
</script>
