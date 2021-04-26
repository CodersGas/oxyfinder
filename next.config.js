const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const path = require('path')
// comment update
dotenvLoad();
const withNextEnv = nextEnv();

module.exports = withNextEnv(withCSS(withSass({
	webpack(config, options) {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['utils'] = path.join(__dirname, 'utils')
    return config
  },
  //
})));