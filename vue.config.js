const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/me/' // Cambia '/me/' por el nombre exacto de tu repositorio
    : '/'
})
