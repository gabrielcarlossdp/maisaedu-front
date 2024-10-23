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
          @click:append-inner="loadStudents()"
          flat
          v-model="filter.search"
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
          :dataTotalLength="dataTotalLength"
          :lastPage="lastPage"
          @page="filter.page = $event"
          @pageSize="filter.pageSize = $event"
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
  </div>
</template>

<script>
import TableCustom from '@/components/TableCustom.vue'
import { useSnackbarStore } from '@/stores/snackbar'
export default {
  name: 'StudentView',
  components: { TableCustom },
  data: () => ({
    filter: {
      search: '',
      pageSize: 10,
      page: 1,
      filter: {},
    },
    dataTotalLength: 0,
    lastPage: 0,
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

  computed: {
    queryFilter() {
      let fil = Object.keys(this.filter.filter)
        .map(item => {
          return this.filter.filter[item]
            ? `filter[${item}]=${this.filter.filter[item]}&`
            : ''
        })
        .join('')

      let ter = {
        ...(this.filter.search ? { search: this.filter.search } : {}),
        ...(this.filter.pageSize ? { pageSize: this.filter.pageSize } : {}),
        ...(this.filter.page ? { page: this.filter.page } : {}),
        ...(this.filter.sortBy ? { sortBy: this.filter.sortBy } : {}),
        ...(this.filter.sortOrder ? { sortOrder: this.filter.sortOrder } : {}),
      }
      return fil + new URLSearchParams(ter).toString()
    },
  },

  methods: {
    loadStudents() {
      this.loadingStudents = true
      this.$axios
        .get('/student?' + this.queryFilter)
        .then(response => {
          this.students = response.data.data

          if (response.data.meta) {
            this.dataTotalLength = response.data.meta.total
            this.lastPage = response.data.meta.last_page
            this.filter.page = response.data.meta.current_page
            this.filter.pageSize = response.data.meta.per_page
          }
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
          useSnackbarStore().showSnackbar({
            text: 'Aluno excluído com sucesso!',
            color: 'success',
          })

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
  },
  mounted() {
    this.loadStudents()
  },
  watch: {
    filter: {
      handler() {
        this.loadStudents()
      },
      deep: true,
    },
  },
}
</script>
