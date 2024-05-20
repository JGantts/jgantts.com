// Import Vue and Vuetify components
import { createVuetify, type ThemeDefinition } from 'vuetify'
import 'vuetify/styles'  // Import Vuetify styles

import {
  bronze,
  bronzeDark,

  // Mauve
  mauve,
  mauveDark,

  tomato,
  tomatoDark,
  red,
  redDark,
  crimson,
  crimsonDark,
  plum,
  plumDark,
  violet,
  violetDark,
  purple,
  purpleDark,

  // Slate
  slate,
  slateDark,

  indigo,
  indigoDark,
  blue,
  blueDark,
  sky,
  skyDark,
  cyan,
  cyanDark,

  // Sage
  sage,
  sageDark,

  mint,
  mintDark,
  teal,
  tealDark,
  green,
  greenDark,

  // Olive
  olive,
  oliveDark,

  grass,
  grassDark,
  lime,
  limeDark,

  // Sand
  sand,
  sandDark,

  yellow,
  yellowDark,
  amber,
  amberDark,
  orange,
  orangeDark,

} from '@radix-ui/colors';

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles';

const themeDark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: blueDark.blue5,
    secondary: blueDark.blue5,
    accent: blueDark.blue5,
    error: blueDark.blue5,
    info: blueDark.blue5,
    success: blueDark.blue5,
    warning: blueDark.blue5,
    background: blueDark.blue5,
  }
}

const themeLight: ThemeDefinition = {
  dark: false,
  colors: {
    primary: blue.blue5,
    secondary: blue.blue5,
    accent: blue.blue5,
    error: blue.blue5,
    info: blue.blue5,
    success: blue.blue5,
    warning: blue.blue5,
    background: blue.blue5,
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
