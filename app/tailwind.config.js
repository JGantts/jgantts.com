/** @type {import('tailwindcss').Config} */

import * as radix from '@radix-ui/colors';

function flattenRadixColors(colors) {
  let convertedObject = {
    light: {},
    dark: {},  
  }
  for (let key1 in colors) {
    let key1_2 = key1.replace('Dark', '')
    let toAddTo
    if (key1.toLowerCase().includes('dark')) {
      toAddTo = convertedObject.dark

    } else {
      toAddTo = convertedObject.light
    }
    toAddTo[key1_2] = {}
    for (let key2 in colors[key1]) {
      let key2_2 = '_' + key2.replace(key1_2, '')
      toAddTo[key1_2][key2_2] = colors[key1][key2]
    }
  }
  return convertedObject
}

console.log(radix)

const colors = flattenRadixColors(radix)

let light = colors.light
let dark = colors.dark

let lightTheme = {
  "primary":            light.orange._10,
  "primary-content":    light.orange._1,
  "secondary":          light.purple._6,
  "secondary-content":  light.purple._12,
  "accent":             light.purple._3,
  "accent-content":     light.purple._12,
  "neutral":            light.slate._3,
  "neutral-content":    light.slate._12,
  "base-100":           light.blue._3,
  "base-200":           light.blue._2,
  "base-300":           light.blue._1,
  "base-content":       light.blue._12,
  "info":               light.lime._3,
  "info-content":       light.lime._12,
  "success":            light.teal._3,
  "success-content":    light.teal._12,
  "warning":            light.yellow._3,
  "warning-content":    light.yellow._12,
  "error":              light.red._3,
  "error-content":      light.red._12,
}

let darkTheme = {
  "primary":            dark.tomato._9,
  "primary-content":    dark.tomato._1,
  "secondary":          dark.purple._3,
  "secondary-content":  dark.purple._12,
  "accent":             dark.purple._3,
  "accent-content":     dark.purple._12,
  "neutral":            dark.slate._3,
  "neutral-content":    dark.slate._12,
  "base-100":           dark.blue._3,
  "base-200":           dark.blue._2,
  "base-300":           dark.blue._1,
  "base-content":       dark.blue._12,
  "info":               dark.lime._3,
  "info-content":       dark.lime._12,
  "success":            dark.teal._3,
  "success-content":    dark.teal._12,
  "warning":            dark.yellow._3,
  "warning-content":    dark.yellow._12,
  "error":              dark.red._3,
  "error-content":      dark.red._12,
}

let myExport = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        light: lightTheme,
        dark: darkTheme,
      },
    ],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui'),
  ],
}

module.exports = myExport
