// const path = require('path');
const defaultConfig = require('@open-wc/demoing-storybook/default-storybook-webpack-config.js');

module.exports = ({
  config
}) => {
  // make pika web_modules work !
  // config.resolve.alias['/web_modules'] = path.resolve(__dirname, '../web_modules/');
  return defaultConfig({
    config,
    transpilePackages: [
      'lit-html',
      'lit-element', 
      '@open-wc',
      '@preignition', 
      '@morbidick'
    ]
  });
};