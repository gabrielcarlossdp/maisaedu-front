<template>
  <div>
    <v-row justify="space-between" class="align-center">
      <v-col cols="6">
        <v-text-field
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Digite sua busca"
          variant="solo"
          hide-details
          single-line
          @click:append-inner="onClick"
          flat
          class="border rounded"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" to="/student/create">Cadastrar Aluno</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TableCustom
          :headers="headers"
          :itens="students"
          actions
          :loading="loadingStudents"
        >
          <template #actions="{ row }">
            <v-row class="justify-end mr-2">
              <v-btn
                size="small"
                color="warning"
                class="mr-2"
                :to="`/student/${row.id}`"
                >Editar</v-btn
              >
              <v-btn size="small" color="error" @click="deleteItem(row)"
                >Excluir</v-btn
              >
            </v-row>
          </template>
        </TableCustom>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDelete" max-width="520px">
      <v-card>
        <v-card-title class="text-h5"
          >Tem certeza de que deseja excluir este item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
            >Cancelar</v-btn
          >
          <v-btn
            :loading="loadingStudentDelete"
            color="blue-darken-1"
            variant="text"
            @click="deleteItemConfirm"
            >Sim</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" variant="tonal" color="success">
      {{ text }}

      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false"> Fechar </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import TableCustom from '@/components/TableCustom.vue'
export default {
  name: 'StudentView',
  components: { TableCustom },
  data: () => ({
    snackbar: false,
    text: '',
    loadingStudents: false,
    loadingStudentDelete: false,
    loaded: false,
    loading: false,
    editedIndex: -1,
    dialogDelete: false,
    editedItem: {
      ra: '',
      name: '',
      cpf: '',
    },
    defaultItem: {
      ra: '',
      name: '',
      cpf: '',
    },
    students: [],
    headers: [
      {
        key: 'ra',
        text: 'Matrícula',
      },
      {
        key: 'name',
        text: 'Nome',
      },
      {
        key: 'cpf',
        text: 'CPF',
      },
    ],
  }),

  methods: {
    loadStudents() {
      this.loadingStudents = true
      this.$axios
        .get('/student')
        .then(response => {
          this.students = response.data
          this.loadingStudents = false
        })
        .catch(errors => {
          console.log(errors)
          this.loadingStudents = false
        })
    },
    deleteItemConfirm() {
      this.loadingStudentDelete = true
      this.$axios
        .delete(`/student/${this.editedItem.id}`)
        .then(() => {
          this.text = 'Aluno excluído com sucesso!'
          this.snackbar = true
          this.loadingStudentDelete = false
          this.loadStudents()
        })
        .catch(errors => {
          console.log(errors)
          this.loadingStudentDelete = false
        })

      this.closeDelete()
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    editItem(item) {
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
  },
  mounted() {
    this.loadStudents()
  },
}
</script>
