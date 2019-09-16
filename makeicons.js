const { spawn } = require('child_process')
const { readdirSync, writeFileSync } = require('fs')

const SVG = 'public/favicon.svg'
const ANDROID_SIZES = [48, 72, 96, 144, 192, 512]
const IOS_SIZES = [76, 120, 152, 180]
const APP_STORE = [1024]
const SIZES = ANDROID_SIZES.concat(IOS_SIZES).concat(APP_STORE)
const URL = 'https://expenses.github.io/caster'

SIZES.forEach(size => {
  const output = `public/favicons/${size}.png`
  console.log(`Making ${output}`)

  spawn('convert', ['-background', 'none', SVG, '-resize', `${size}x${size}`, output])
})

readdirSync('public')
  .filter(file => file.endsWith('.png'))
  .forEach(file => {

  const webp = file.replace('.png', '.webp')
  console.log(`Making ${webp}`)
  spawn('convert', [file, '-define', 'webp:lossless=true', webp])
})

const manifest = {
  'name': 'Caster',
  'short_name': 'Caster',
  'description': 'A Blockstack podcast player',
  'start_url': '.',
  'display': 'standalone',
  'theme_color': '#fd3777',
  'background_color': '#2e2157',
  'icons': SIZES.map(size => ({src: `${URL}/favicons/${size}.png`, sizes: `${size}x${size}`}))
}

const manifestString = JSON.stringify(manifest, null, 2)

console.log(manifestString)

writeFileSync('public/manifest.json', manifestString)
