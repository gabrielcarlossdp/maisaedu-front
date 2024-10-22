<template>
  <v-form @submit.prevent="onSubmit" v-model="form">
    <v-text-field
      :error-messages="errors.name"
      class="mt-2"
      variant="solo"
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
      variant="solo"
      v-model="email"
      placeholder="Informe apenas um e-mail"
      :rules="rulesEmail"
      label="E-mail"
      required
      @input="clearErrors('email')"
    ></v-text-field>

    <v-text-field
      :error-messages="errors.ra"
      class="mt-2"
      variant="solo"
      v-model="ra"
      placeholder="Informe o registro acadêmico"
      :rules="rulesRequired"
      label="RA"
      maxlength="10"
      required
      @input="clearErrors('ra')"
    ></v-text-field>

    <v-text-field
      :error-messages="errors.cpf"
      class="mt-2"
      variant="solo"
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
          >Cadastrar</v-btn
        >
        <v-btn color="default" class="mt-2 w-100 w-md-25 ml-md-2" to="/student"
          >Cancelar</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
  <v-snackbar v-model="snackbar" variant="tonal" color="success">
    {{ text }}

    <template v-slot:actions>
      <v-btn variant="text" @click="snackbar = false"> Fechar </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
import { mask } from 'vue-the-mask'
export default {
  name: 'CreateStudentView',
  directives: { mask },
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
      this.$axios
        .post('/student', {
          name: this.name,
          email: this.email,
          ra: this.ra,
          cpf: this.cpf,
        })
        .then(() => {
          this.loading = false
          this.text = 'Aluno cadastrado com sucesso!'
          this.snackbar = true
          setTimeout(() => {
            this.$router.push('/student')
          }, 300)
        })
        .catch(error => {
          this.loading = false
          this.errors = error.response.data.errors
        })
    },
  },
}
</script>
<style></style>
