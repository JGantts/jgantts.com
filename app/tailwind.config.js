/** @type {import('tailwindcss').Config} */

import * as radix from '@radix-ui/colors';

function flattenRadixColors(colors) {
  return Object.keys(colors).reduce((flatObject, key) => {
    const modifiedSubObject = Object.keys(colors[key]).reduce((subObj, subKey) => {

      let oldKey = subKey
      let newKey = ''

      if (oldKey.endsWith('1')) {
        newKey = oldKey.slice(0, -1) + descriptions[0];
      } else if (oldKey.endsWith('2')) {
        newKey = oldKey.slice(0, -1) + descriptions[1];
      } else if (oldKey.endsWith('3')) {
        newKey = oldKey.slice(0, -1) + descriptions[2];
      } else if (oldKey.endsWith('4')) {
        newKey = oldKey.slice(0, -1) + descriptions[3];
      } else if (oldKey.endsWith('5')) {
        newKey = oldKey.slice(0, -1) + descriptions[4];
      } else if (oldKey.endsWith('6')) {
        newKey = oldKey.slice(0, -1) + descriptions[5];
      } else if (oldKey.endsWith('7')) {
        newKey = oldKey.slice(0, -1) + descriptions[6];
      } else if (oldKey.endsWith('8')) {
        newKey = oldKey.slice(0, -1) + descriptions[7];
      } else if (oldKey.endsWith('9')) {
        newKey = oldKey.slice(0, -1) + descriptions[8];
      } else if (oldKey.endsWith('10')) {
        newKey = oldKey.slice(0, -2) + descriptions[9]; // Note the slice here is -2 because '10' has two digits
      } else if (oldKey.endsWith('11')) {
        newKey = oldKey.slice(0, -2) + descriptions[10];
      } else if (oldKey.endsWith('12')) {
        newKey = oldKey.slice(0, -2) + descriptions[11];
      }
    

      subObj[newKey] = colors[key][subKey];
      return subObj;
    }, {});
    return Object.assign(flatObject, modifiedSubObject);
  }, {});
}
function transformIdentifiers(prefixes, suffixDescriptions) {
  let result = [];

  prefixes.forEach((item, index) => {
    if (suffixDescriptions[index]) {  // Ensure there's a corresponding description
      result.push(`${item}-${suffixToString(suffixDescriptions[index])}`);
    }
  });

  return result;
}
const descriptions = [
  "app-background",
  "subtle-background",
  "ui-element-background",
  "hovered-ui-element-background",
  "active-selected-ui-element-background",
  "subtle-borders-and-separators",
  "ui-element-border-and-focus-rings",
  "hovered-UI-element-border",
  "solid-backgrounds",
  "hovered-solid-backgrounds",
  "low-contrast-text",
  "high-contrast-text"
];


const colors = flattenRadixColors(radix)

console.log(colors)

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors
  },
  plugins: [],
}

A
[
  "amber1",
  "amber2",
  "amber3",
  "amber4",
  "amber5",
  "amber6",
  "amber7",
  "amber8",
  "amber9",
  "amber10",
  "amber11",
  "amber12",
]

B
[
  "amber-1-app-background",
  "amber-2-subtle-background",
  "amber-3-ui-element-background",
  "amber-hovered-ui-element-background",
  "amber-active-selected-ui-element-background",
  "amber-subtle-borders-and-separators",
  "amber-ui element-border-and-focus-rings",
  "amber-hovered-UI-element-border",
  "amber-solid-backgrounds",
  "amber-hovered-solid-backgrounds",
  "amber-low-contrast-text",
  "amber-high-contrast-text"
]