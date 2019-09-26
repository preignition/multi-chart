/* eslint-disable import/no-extraneous-dependencies */
const { createDefaultConfig } = require('@open-wc/testing-karma');

module.exports = config => {
  config.set(
    Object.assign(createDefaultConfig(config), {
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        { pattern: config.grep ? config.grep : 'test/**/*.test.js', type: 'module' },
      ],

      esm: {
        nodeResolve: true,
      },
      // for tests to work with pika ...
      proxies: {
        '/web_modules/': '/base/web_modules/'
      }
      // you can overwrite/extend the config further
    }),
  );
  return config;
};
