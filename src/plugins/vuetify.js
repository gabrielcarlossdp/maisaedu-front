import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          greybg: '#F5F5F5',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          greybg: '#181818',
        },
      },
    },
  },
})
