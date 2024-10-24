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
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#DB203B',
          secondary: '#00ABB5',
          greybg: '#F5F5F5',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#DB203B',
          secondary: '#00ABB5',
          greybg: '#181818',
        },
      },
    },
  },
})
