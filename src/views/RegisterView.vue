<template>
  <div>
    <v-img
      class="mx-auto my-6 mt-12"
      max-width="100"
      src="../logo-mais-a-educacao.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-card-title class="text-h5 font-weight-bold text-center"
        >Crie sua conta</v-card-title
      >
      <v-form @submit.prevent="onSubmit">
        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>

        <v-text-field
          :error-messages="errors.name"
          type="text"
          v-model="name"
          density="compact"
          placeholder="Entre com seu nome completo"
          variant="outlined"
          prepend-inner-icon="mdi-account-outline"
          @input="clearErrors('name')"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field
          :error-messages="errors.email"
          type="email"
          v-model="email"
          density="compact"
          placeholder="Endereço de e-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          @input="clearErrors('email')"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Senha
        </div>

        <v-text-field
          :error-messages="errors.password"
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Entre com sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          @input="clearErrors('password')"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Repita a Senha
        </div>

        <v-text-field
          :error-messages="errors.password"
          v-model="password_confirmation"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Repita sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          @input="clearErrors('password')"
        ></v-text-field>

        <v-btn
          :loading="loading"
          class="mb-8 mt-3"
          color="primary"
          size="large"
          variant="flat"
          type="submit"
          block
        >
          Cadastrar
        </v-btn>

        <v-btn
          class="mb-8 mt-3"
          color="secondary"
          size="small"
          variant="text"
          to="/login"
          block
        >
          <v-icon icon="mdi-chevron-left"></v-icon> Voltar a tela de login
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
export default {
  name: 'RegisterView',
  data() {
    return {
      loading: false,
      errors: [],
      name: '',
      password_confirmation: '',
      email: '',
      password: '',
      visible: false,
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
        .post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.data))
          useUserStore().setUser(response.data.user)
          useUserStore().setToken(response.data.token)
          this.$router.push({ name: 'student' })
        })
        .catch(errors => {
          this.loading = false
          if (errors.response.data.errors) {
            this.errors = errors.response.data.errors
          }
        })
    },
  },
}
</script>
<style></style>
