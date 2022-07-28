const path = require('path')

const resolvePath = p => path.join(path.resolve(__dirname, p))

module.exports = {
  //reactScriptsVersion: "react-scripts",
  webpack: {
    alias: {
      '@': resolvePath('src/')
    },
  },
}