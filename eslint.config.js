import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginPrettierRecommendedConfigs from 'eslint-plugin-prettier/recommended'

export default [
  {languageOptions: { globals: globals.browser }},
  //eslint默认规则
  pluginJs.configs.recommended,
  // ts 默认推荐规则
  ...tseslint.configs.recommended,
  // vue3 基础推荐规则
  ...pluginVue.configs["flat/essential"],
   // prettier 默认推荐规则
	pluginPrettierRecommendedConfigs
];