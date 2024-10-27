<template>
  <v-dialog v-model="visibledialog" persistent max-width="900px">
    <v-card>
      <v-card-title class="mt-3">
        <v-row class="justify-space-between">
          <v-col cols="auto">Associar Aluno a Turma</v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn @click="close" text icon="mdi-close"> </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-container>
          <div class="text-center" v-if="loadingAssociate">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
          <div v-else>
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
            </v-row>
            <v-row>
              <v-col cols="12">
                <TableCustom
                  :height="'500px'"
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
                    <v-row
                      class="mr-2 d-flex"
                      justify="end"
                      style="min-width: 100px"
                    >
                      <v-btn
                        :loading="loadingAssociate"
                        prepend-icon="mdi-plus"
                        density="compact"
                        variant="flat"
                        color="secondary"
                        class="mr-sm-0 mr-md-2"
                        @click="associate(row.id)"
                        >Associar</v-btn
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
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="closeDelete"
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
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import TableCustom from '@/components/TableCustom.vue'
export default {
  name: 'AssociateTeamDialog',
  components: { TableCustom },
  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: false,
    },
    teamId: {
      required: true,
    },
  },
  data() {
    return {
      visibledialog: false,
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
      loadingAssociate: false,
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
          sortable: true,
        },
        {
          key: 'name',
          text: 'Nome',
          sortable: true,
        },
        {
          key: 'cpf',
          text: 'CPF',
          sortable: true,
        },
      ],
    }
  },
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
    close() {
      this.visibledialog = false
      this.$emit('close')
    },
    associate(studentId) {
      this.loadingAssociate = true

      this.$axios
        .post(`/team/${this.teamId}/students`, {
          student_id: studentId,
        })
        .then(() => {
          this.loadingAssociate = false
          this.$emit('associate', this.teamId)
          this.close()
        })
        .catch(errors => {
          console.log(errors)
          this.loadingAssociate = false
        })
    },

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
  },
  watch: {
    dialog() {
      this.visibledialog = this.dialog
    },

    filter: {
      handler() {
        this.loadStudents()
      },
      deep: true,
    },
  },
  mounted() {
    this.loadStudents()
  },
}
</script>
