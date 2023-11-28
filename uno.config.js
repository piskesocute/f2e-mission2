import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts
} from 'unocss';

export default defineConfig({
  theme: {
    // 這裡的設定會覆蓋 uno.css 的預設值
    // 你可以在這裡設定你的主題
    // 例如：
    colors: {
      nav: {
        primary: '#262E49'
      },
      main: {
        primary: '#f5f5f5'
      }
    }
  },
  presets: [
    presetUno({
      // attributifyPseudo: true 生成偽選擇器作為 [group=""] 而不是 .group
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        noto: ['Noto Sans TC'],
        inter: ['Inter', 'Roboto']
      }
    })
  ]
});
