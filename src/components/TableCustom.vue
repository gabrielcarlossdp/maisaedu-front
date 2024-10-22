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
        <tr v-for="item in itens" :key="item.name">
          <td v-for="head in headers" :key="head.key">{{ item[head.key] }}</td>
          <td v-if="actions || actions.length > 0">
            <slot name="actions" :row="item"></slot>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
<script>
export default {
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
  },
}
</script>
<style></style>
