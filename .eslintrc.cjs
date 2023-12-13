/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    '@unocss',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-undef': 'off'
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue']
      }
    },
    'import/core-modules': [
      'vite',
      '@vitejs/plugin-vue',
      'virtual:uno.css',
      '@unocss/reset/eric-meyer.css',
      'unocss/vite',
      'unplugin-vue-components/vite',
      'unplugin-auto-import/vite',
      'unocss'
    ]
  }
};
