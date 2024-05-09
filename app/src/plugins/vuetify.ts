// Import Vue and Vuetify components
import { createVuetify } from 'vuetify'
import { VApp, VAppBar, VAppBarNavIcon, VBtn, VCardText, VList, VMain, VNavigationDrawer, VSpacer, VToolbarTitle } from 'vuetify/lib/components/index.mjs'
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


export default createVuetify({
  components: {
    VApp,
    VAppBarNavIcon,
    VToolbarTitle,
    VSpacer,
    VBtn,
    VAppBar,
    VList,
    VNavigationDrawer,
    VCardText,
    VMain,
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          background: blue.blue5,
          primary: blue.blue5,
          secondary: blue.blue5,
        }
      },
    }
  }
})