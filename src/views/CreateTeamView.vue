<template>
  <v-card
    class="pa-4 rounded-lg"
    :loading="loading"
    :title="this.$route.params.id ? 'Editar Turma' : 'Cadastrar Turma'"
  >
    <v-form @submit.prevent="onSubmit" v-model="form" :loading="loading">
      <v-text-field
        :error-messages="errors.name"
        class="mt-2"
        variant="solo-filled"
        v-model="name"
        placeholder="Informe o nome completo"
        :rules="rulesRequired"
        label="Nome"
        required
        @input="clearErrors('name')"
      ></v-text-field>

      <v-text-field
        :error-messages="errors.description"
        class="mt-2"
        type="text"
        variant="solo-filled"
        v-model="description"
        placeholder="Informe a descrição da turma"
        :rules="rulesRequired"
        label="Descricão"
        required
        @input="clearErrors('description')"
      ></v-text-field>

      <v-row>
        <v-col cols="12" class="d-block d-md-flex justify-end">
          <v-btn
            :disabled="!form"
            :loading="loading"
            color="primary"
            class="mt-2 w-100 w-md-25"
            type="submit"
            >{{ this.$route.params.id ? 'Editar' : 'Cadastrar' }}</v-btn
          >
          <v-btn color="default" class="mt-2 w-100 w-md-25 ml-md-2" to="/team"
            >Cancelar</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>
<script>
import { mask } from 'vue-the-mask'
import { useSnackbarStore } from '@/stores/snackbar'
export default {
  name: 'CreateTeamView',
  directives: { mask },
  props: ['id'],
  data() {
    return {
      snackbar: false,
      text: '',
      form: false,
      loading: false,
      name: '',
      description: '',
      rulesRequired: [v => !!v || 'O campo é obrigatório'],
      errors: [],
    }
  },
  methods: {
    clearErrors(field) {
      if (this.errors[field]) {
        this.errors[field] = null
      }
    },
    onSubmit() {
      this.loading = true

      if (this.$route.params.id) {
        this.updateTeam()
      } else {
        this.createTeam()
      }
    },
    updateTeam() {
      this.$axios
        .put(`/team/${this.$route.params.id}`, {
          name: this.name,
          description: this.description,
        })
        .then(() => {
          this.loading = false
          useSnackbarStore().showSnackbar({
            text: 'Turma editada com sucesso!',
            color: 'success',
          })

          setTimeout(() => {
            this.$router.push('/team')
          }, 300)
        })
        .catch(error => {
          this.loading = false
          this.errors = error.response.data.errors
        })
    },
    createTeam() {
      this.$axios
        .post('/team', {
          name: this.name,
          description: this.description,
        })
        .then(() => {
          this.loading = false
          useSnackbarStore().showSnackbar({
            text: 'Turma cadastrada com sucesso!',
            color: 'success',
          })

          setTimeout(() => {
            this.$router.push('/team')
          }, 300)
        })
        .catch(error => {
          this.loading = false
          this.errors = error.response.data.errors
        })
    },
    loadingTeam() {
      this.loading = true
      this.$axios
        .get(`/team/${this.$route.params.id}`)
        .then(response => {
          this.loading = false
          this.name = response.data.name
          this.description = response.data.description
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.loadingTeam()
    }
  },
}
</script>
<style></style>
