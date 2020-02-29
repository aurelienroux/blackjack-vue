module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
        `
      }
    }
  },

  pwa: {
    name: 'Blackjack',
    themeColor: '#037500',
    msTileColor: '#037500',
    manifestOptions: {
      background_color: '#037500'
    }
  }
}
