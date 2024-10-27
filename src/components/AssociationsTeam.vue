<template>
  <v-card class="pa-4 rounded-lg mt-4">
    <v-card-title>
      <v-row>
        <v-col cols="auto"> Alunos da Turma </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn color="primary" @click="dialogAssociate = true">
            <v-icon icon="mdi-plus"></v-icon> Associar Aluno</v-btn
          >
        </v-col>
      </v-row>
    </v-card-title>

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
          @sortBy="filter.sortBy = $event"
          @sortOrder="filter.sortOrder = $event"
        >
          <template #actions="{ row }">
            <v-row class="mr-2 d-flex" justify="end" style="min-width: 100px">
              <v-btn
                prepend-icon="mdi-delete"
                class="d-flex"
                variant="flat"
                density="compact"
                color="error"
                @click="deleteItem(row)"
              >
                Desassociar
              </v-btn>
            </v-row>
          </template>
        </TableCustom>
      </v-col>
    </v-row>
    <AssociateTeamDialog
      :dialog="dialogAssociate"
      :teamId="teamId"
      @close="closeDialogAssociate"
      @associate="loadStudents"
    />
    <v-dialog v-model="dialogDelete" max-width="520px">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold text-center"
          >Tem certeza de que deseja desassociar o aluno?</v-card-title
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
  </v-card>
</template>
<script>
import TableCustom from '@/components/TableCustom.vue'
import AssociateTeamDialog from './AssociateTeamDialog.vue'
import { useSnackbarStore } from '@/stores/snackbar'
export default {
  name: 'AssociationsTeam',
  components: { TableCustom, AssociateTeamDialog },
  props: {
    teamId: {
      required: true,
    },
  },
  data: () => ({
    filter: {
      search: '',
      pageSize: 10,
      page: 1,
      sortBy: 'name',
      sortOrder: 'asc',
      filter: {},
    },
    dataTotalLength: 0,
    lastPage: 0,
    loadingStudents: false,
    loadingStudentDelete: false,
    loaded: false,
    loading: false,
    editedIndex: -1,
    dialogAssociate: false,
    dialogDelete: false,
    students: [],
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
    headers: [
      {
        key: 'ra',
        text: 'Matrícula',
        sortable: true,
      },
      {
        key: 'name',
        text: 'Nome',
        sortable: true,
      },
      {
        key: 'email',
        text: 'E-mail',
        sortable: true,
      },
      {
        key: 'cpf',
        text: 'CPF',
        sortable: true,
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
    closeDialogAssociate() {
      this.dialogAssociate = false
    },
    loadStudents() {
      this.loadingStudents = true
      this.$axios
        .get('/team/' + this.teamId + '/students?' + this.queryFilter)
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
    deleteItem(item) {
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.loadingStudentDelete = true
      this.$axios
        .delete(`/team/${this.teamId}/students/${this.editedItem.id}`)
        .then(() => {
          useSnackbarStore().showSnackbar({
            text: 'Aluno desassociado da turma com sucesso!',
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
  },
  mounted() {
    if (this.teamId) {
      this.loadStudents()
    }
  },
}
</script>
<style lang=""></style>
