import { defineConfig,UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      createSvgIconsPlugin({
        // 指定 SVG图标 保存的文件夹路径
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定 使用svg图标的格式
        symbolId: 'icon-[dir]-[name]',
  
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      vue(),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
    ],
    resolve:{
      alias:{
        '@': path.resolve(__dirname, 'src')
      }
    },
    //scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/style/variable.scss";'
        }
      }
    }
  }
})
