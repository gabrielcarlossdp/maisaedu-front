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
          @click:append-inner="loadTeams()"
          flat
          v-model="filter.search"
          class="border rounded"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" to="/team/create">
          <v-icon icon="mdi-plus"></v-icon> Cadastrar Turma</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TableCustom
          :headers="headers"
          :itens="teams"
          actions
          :loading="loadingTeams"
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
                icon="mdi-pencil"
                density="compact"
                variant="text"
                color="warning"
                class="mr-sm-0 mr-md-2"
                :to="`/team/${row.id}`"
              ></v-btn>

              <v-btn
                icon="mdi-delete"
                class="d-flex"
                variant="text"
                density="compact"
                color="error"
                @click="deleteItem(row)"
              >
              </v-btn>
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
            :loading="loadingTeamDelete"
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
  name: 'TeamView',
  components: { TableCustom },
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
    loadingTeams: false,
    loadingTeamDelete: false,
    loaded: false,
    loading: false,
    editedIndex: -1,
    dialogDelete: false,
    editedItem: {
      codigo: '',
      name: '',
      description: '',
    },
    defaultItem: {
      codigo: '',
      name: '',
      description: '',
    },
    teams: [],
    headers: [
      {
        key: 'id',
        text: 'Código',
        sortable: true,
      },
      {
        key: 'name',
        text: 'Nome',
        sortable: true,
      },
      {
        key: 'description',
        text: 'Descricão',
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
    loadTeams() {
      this.loadingTeams = true
      this.$axios
        .get('/team?' + this.queryFilter)
        .then(response => {
          this.teams = response.data.data

          if (response.data.meta) {
            this.dataTotalLength = response.data.meta.total
            this.lastPage = response.data.meta.last_page
            this.filter.page = response.data.meta.current_page
            this.filter.pageSize = response.data.meta.per_page
          }
          this.loadingTeams = false
        })
        .catch(errors => {
          console.log(errors)
          this.loadingTeams = false
        })
    },
    deleteItemConfirm() {
      this.loadingTeamDelete = true
      this.$axios
        .delete(`/team/${this.editedItem.id}`)
        .then(() => {
          useSnackbarStore().showSnackbar({
            text: 'Turma excluída com sucesso!',
            color: 'success',
          })

          this.loadingTeamDelete = false
          this.loadTeams()
        })
        .catch(errors => {
          console.log(errors)
          this.loadingTeamDelete = false
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
      console.log(item)
      this.editedIndex = this.teams.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.teams.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
  },
  mounted() {
    this.loadTeams()
  },
  watch: {
    filter: {
      handler() {
        this.loadTeams()
      },
      deep: true,
    },
  },
}
</script>
