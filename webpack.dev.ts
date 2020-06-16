import * as path from 'path';
import * as webpack from "webpack";
import * as HtmlWebPackPlugin from "html-webpack-plugin";

// const htmlPlugin = new HtmlWebPackPlugin({
//   template: "./src/index.html"
// });

// const config: webpack.Configuration = {
//   mode: "development",
//   entry: "./src/index.tsx",
//   resolve: {
//     // Add '.ts' and '.tsx' as resolvable extensions.
//     extensions: [".ts", ".tsx", ".js", ".json"]
//   },

//   module: {
//     rules: [
//       // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
//       { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
//       { test: /\.css$/, use: ['style-loader', 'css-loader']}
//     ]
//   },
//   plugins: [htmlPlugin],
// };

// export default config;

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html"
});

module.exports = () => {
  return {
      entry: ["./src/index.tsx"],
      mode: "development",
      resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"]
          },
        
      output: {
          path: path.join(__dirname, 'dist'),
          filename: 'bundle.js',
          publicPath: '/'
      },
      module: {
          rules:[
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { test: /\.css$/, use: ['style-loader', 'css-loader']}
          ]
      },

      plugins:
        [htmlPlugin],
      devServer: {
          historyApiFallback: true
      }
  }
}