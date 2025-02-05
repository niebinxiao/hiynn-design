const style = require("ansi-styles");

let babel_env = process.env["BABEL_ENV"];
let loose = false,
  modules = false,
  useESModules = false;

switch (babel_env) {
  case "commonjs":
    loose = true;
    modules = "cjs";
    useESModules = false;
    break;
  case "es":
    loose = true;
    modules = false;
    useESModules = true;
    break;
  case "umd":
    loose = false;
    modules = false;
    useESModules = false;
    break;
}

if (babel_env) {
  console.log(`${style.blue.open}------ build by ${babel_env.toUpperCase()} ------ ${style.bgColor.close}`);
}

//useBuiltIns: true 如果为 true 且引入了polyfill
// (import "babel-polyfill"）的话，插件 会根据 targets 的配置，重写 import "babel-polyfill" ，
//只引入对应环境必须的 "babel-polyfill" 的子模块，减少了多余的代码引入
const presets = [["@babel/preset-env", { loose, modules }], "@babel/preset-react"];
const plugins = [
  "@babel/plugin-proposal-object-rest-spread",
  // @babel/plugin-proposal-decorators必须在@babel/plugin-proposal-class-properties前面，否则装饰器不起作用
  [
    "@babel/plugin-proposal-decorators",
    {
      legacy: true
    }
  ],
  ["@babel/plugin-proposal-class-properties", { loose: true }],
  ["@babel/plugin-transform-runtime", { useESModules }],
  [
    "import",
    {
      libraryName: "antd",
      // libraryDirectory: "es",
      style: true // `style: true` 会加载 less 文件
    },
    "antd"
  ],
  [
    "import",
    {
      libraryName: "react-code-previewer",
      libraryDirectory: "es",
      style: true // `style: true` 会加载 less 文件
    },
    "rcd"
  ]
];
module.exports = { presets, plugins };
