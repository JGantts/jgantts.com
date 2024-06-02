/** @type {import('tailwindcss').Config} */

import * as radix from '@radix-ui/colors';

function flattenRadixColors(colors) {
  return Object.keys(colors).reduce((flatObject, key) => {
    const modifiedSubObject = Object.keys(colors[key]).reduce((subObj, subKey) => {

      let oldKey = subKey
      let newKey = ''

      for (let numberNumber of [...Array(13).keys()].slice(1)) {
        let numberString = numberNumber.toString()
        if (oldKey.endsWith(numberString)) {
          newKey = `${oldKey.slice(0, -1 * numberString.length)}${key.includes('Dark') ? '-dark' : ''}-${numberString}`
        }
      }

      subObj[newKey] = colors[key][subKey];
      return subObj;
    }, {});
    return Object.assign(flatObject, modifiedSubObject);
  }, {});
}

console.log(radix)

const colors = flattenRadixColors(radix)

//console.log(colors)

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
