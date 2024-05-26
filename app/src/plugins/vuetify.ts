import { createVuetify, type ThemeDefinition } from 'vuetify'

import { md3 } from 'vuetify/blueprints'

import * as radixColors from '@radix-ui/colors';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'vuetify/styles';

const themeDark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: radixColors.purpleDark.purple8,
    secondary: radixColors.purpleDark.purple8,
    accent: radixColors.orangeDark.orange5,
    error: radixColors.purpleDark.purple8,
    info: radixColors.purpleDark.purple8,
    success: radixColors.purpleDark.purple8,
    warning: radixColors.purpleDark.purple8,
    background: radixColors.blueDark.blue5,
  }
}

const themeLight: ThemeDefinition = {
  dark: false,
    colors: {
      primary: radixColors.purple.purple8,
      secondary: radixColors.purple.purple8,
      accent: radixColors.orangeDark.orange5,
      error: radixColors.purple.purple8,
      info: radixColors.purple.purple8,
      success: radixColors.purple.purple8,
      warning: radixColors.purple.purple8,
      background: radixColors.blue.blue5,
  }
}

export default createVuetify({
  blueprint: md3,
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
