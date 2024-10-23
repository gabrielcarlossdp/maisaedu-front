<template>
  <v-card
    class="pa-4 rounded-lg"
    :loading="loading"
    :title="this.$route.params.id ? 'Editar Aluno' : 'Cadastrar Aluno'"
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
        :error-messages="errors.email"
        class="mt-2"
        type="email"
        variant="solo-filled"
        v-model="email"
        placeholder="Informe apenas um e-mail"
        :rules="rulesEmail"
        label="E-mail"
        required
        @input="clearErrors('email')"
      ></v-text-field>

      <v-text-field
        :disabled="this.$route.params.id ? true : false"
        :error-messages="errors.ra"
        class="mt-2"
        variant="solo-filled"
        v-model="ra"
        placeholder="Informe o registro acadêmico"
        :rules="rulesRequired"
        label="RA"
        maxlength="10"
        required
        @input="clearErrors('ra')"
      ></v-text-field>

      <v-text-field
        :disabled="this.$route.params.id ? true : false"
        :error-messages="errors.cpf"
        class="mt-2"
        variant="solo-filled"
        v-model="cpf"
        placeholder="Informe o número do documento"
        :rules="rulesRequired"
        label="CPF"
        v-mask="'###.###.###-##'"
        required
        @input="clearErrors('cpf')"
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
          <v-btn
            color="default"
            class="mt-2 w-100 w-md-25 ml-md-2"
            to="/student"
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
  name: 'CreateStudentView',
  directives: { mask },
  props: ['id'],
  data() {
    return {
      snackbar: false,
      text: '',
      form: false,
      loading: false,
      name: '',
      email: '',
      ra: '',
      cpf: '',
      rulesRequired: [v => !!v || 'O campo é obrigatório'],
      rulesEmail: [v => /.+@.+\..+/.test(v) || 'E-mail inválido'],
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
        this.updateStudent()
      } else {
        this.createStudent()
      }
    },
    updateStudent() {
      this.$axios
        .put(`/student/${this.$route.params.id}`, {
          name: this.name,
          email: this.email,
        })
        .then(() => {
          this.loading = false
          useSnackbarStore().showSnackbar({
            text: 'Aluno editado com sucesso!',
            color: 'success',
          })

          setTimeout(() => {
            this.$router.push('/student')
          }, 300)
        })
        .catch(error => {
          this.loading = false
          this.errors = error.response.data.errors
        })
    },
    createStudent() {
      this.$axios
        .post('/student', {
          name: this.name,
          email: this.email,
          ra: this.ra,
          cpf: this.cpf,
        })
        .then(() => {
          this.loading = false
          useSnackbarStore().showSnackbar({
            text: 'Aluno cadastrado com sucesso!',
            color: 'success',
          })

          setTimeout(() => {
            this.$router.push('/student')
          }, 300)
        })
        .catch(error => {
          this.loading = false
          this.errors = error.response.data.errors
        })
    },
    loadingStudent() {
      this.loading = true
      this.$axios
        .get(`/student/${this.$route.params.id}`)
        .then(response => {
          this.loading = false
          this.name = response.data.name
          this.email = response.data.email
          this.ra = response.data.ra
          this.cpf = response.data.cpf
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.loadingStudent()
    }
  },
}
</script>
<style></style>
