<template>
  <v-snackbar v-model="show" :color="color" top :timeout="timeout">
    {{ text }}
    <template v-slot:actions>
      <v-btn text @click="close"> Fechar </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { useSnackbarStore } from '@/stores/snackbar'
import { mapState } from 'pinia'

export default {
  name: 'SnackbarCustom',
  computed: {
    ...mapState(useSnackbarStore, {
      show: state => state.show,
      text: state => state.text,
      color: state => state.color,
      timeout: state => state.timeout,
    }),
  },
  methods: {
    close() {
      useSnackbarStore().show = false
    },
  },
  watch: {
    show() {
      if (this.show) {
        setTimeout(() => {
          this.close()
        }, this.timeout)
      }
    },
  },
}
</script>
