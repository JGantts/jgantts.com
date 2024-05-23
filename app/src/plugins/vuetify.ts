import { createVuetify, type ThemeDefinition } from 'vuetify'

import * as radixColors from '@radix-ui/colors';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'vuetify/styles';

const themeDark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: radixColors.blueDark.blue1,
    secondary: radixColors.blueDark.blue1,
    accent: radixColors.blueDark.blue1,
    error: radixColors.blueDark.blue1,
    info: radixColors.blueDark.blue1,
    success: radixColors.blueDark.blue1,
    warning: radixColors.blueDark.blue1,
    background: radixColors.blueDark.blue1,
  }
}

const themeLight: ThemeDefinition = {
  dark: false,
    colors: {
    primary: radixColors.blue.blue12,
    secondary: radixColors.blue.blue12,
    accent: radixColors.blue.blue12,
    error: radixColors.blue.blue12,
    info: radixColors.blue.blue12,
    success: radixColors.blue.blue12,
    warning: radixColors.blue.blue12,
    background: radixColors.blue.blue12,
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "themeDark",
    themes: {
      themeDark,
      themeLight,
    }
  }
})
