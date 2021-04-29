const get = require('lodash/get')
const { generateAdaptiveTheme } = require('@adobe/leonardo-contrast-colors');

const contrasts = {
  50: 1.19,
  100: 1.35,
  200: 1.58,
  300: 1.91,
  400: 2.28,
  450: 2.31,
  500: 3.81,
  600: 5.38,
  700: 8.02,
  800: 8.68,
  900: 10.09,
  1000: 12.33
}

const separator = "__"

module.exports = function(config){
  return {colors: generateAdaptiveTheme({
      colorScales: [
        {
          name: 'brand',
          colorspace: "LAB",
          colorKeys: config.brand.colorKeys,
          ratios: Object.keys(contrasts).reduce((acc, shade) => {
            acc[`brand${separator}${shade}`] = contrasts[shade]
            return acc
          }, {})
        }
      ],
      baseScale: 'brand',
      brightness: 100
    }).reduce((acc, swatch)=>{
      if(swatch.name){
        acc[`${swatch.name}`] = swatch.values.reduce((valuesAcc, {name, value})=>{
          const [_name, shade] = name.split(separator)
          valuesAcc[shade] = value
          return valuesAcc
        }, {})
        return acc
      }
      else return acc
    }, {})}
}