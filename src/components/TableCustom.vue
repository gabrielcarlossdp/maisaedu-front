<template>
  <v-card class="rounded-lg" :loading="loading">
    <v-table>
      <thead>
        <tr>
          <th v-for="head in headers" :key="head.key" class="font-weight-bold">
            {{ head.text }}
          </th>
          <th
            class="text-end font-weight-bold"
            v-if="actions || actions.length > 0"
          >
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="itens.length === 0">
          <tr>
            <td
              class="text-center"
              :colspan="
                headers.length + (actions || actions.length > 0 ? 1 : 0)
              "
            >
              {{ loading ? 'Carregando...' : 'Nenhum item encontrado' }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="item in itens" :key="item.name">
            <td v-for="head in headers" :key="head.key">
              {{ item[head.key] }}
            </td>
            <td v-if="actions || actions.length > 0">
              <slot name="actions" :row="item"></slot>
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </v-card>
  <v-row v-if="dataTotalLength > 1" justify="space-between" class="mt-3">
    <v-col cols="auto">
      <v-select
        class="rounded-lg"
        variant="solo"
        v-model="pageSize"
        label="Itens"
        :items="[10, 20, 50, 100]"
      ></v-select>
      <v-tooltip activator="parent" location="end">Itens por Página</v-tooltip>
    </v-col>
    <v-col>
      <v-pagination
        v-if="lastPage > 1"
        :length="lastPage"
        v-model="page"
      ></v-pagination>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'TableCustom',
  emits: ['page', 'pageSize'],
  data: () => ({
    page: 1,
    pageSize: 10,
  }),
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    headers: {
      type: Array,
      required: true,
      default: () => [],
    },
    itens: {
      type: Array,
      required: true,
      default: () => [],
    },
    actions: {
      type: [Boolean, Array],
      required: false,
      default: false,
    },
    dataTotalLength: {
      type: Number,
      required: false,
      default: 0,
    },
    lastPage: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  watch: {
    page() {
      this.$emit('page', this.page)
    },
    pageSize() {
      this.$emit('pageSize', this.pageSize)
    },
  },
  methods: {
    clearPage() {
      this.page = 1
    },
  },
}
</script>
<style></style>
