import * as path from "node:path";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

const isDev = process.env.NODE_ENV === "development";


const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/index.ts", 
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"], 
  },
  devServer: {
    port: 4001, 
    historyApiFallback: true, 
    watchFiles: [path.resolve(__dirname, "src")], 
  },
  output: {
    uniqueName: "app1", 
    publicPath: isDev ? "auto" : "http://react-tp-site.s3-website-sa-east-1.amazonaws.com/",
  },
  experiments: {
    css: true, 
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/, 
        type: "asset",
      },
      {
        test: /\.css$/, 
        use: ["postcss-loader"],
        type: "css",
      },
      {
        test: /\.(jsx?|tsx?)$/, 
        use: [
          {
            loader: "builtin:swc-loader", 
            options: {
              jsc: {
                parser: {
                  syntax: "typescript", 
                  tsx: true, 
                },
                transform: {
                  react: {
                    runtime: "automatic", 
                    development: isDev, 
                    refresh: isDev, 
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html", 
    }),
    new ModuleFederationPlugin({
      name: "app1", 
      filename: "remoteEntry.js", 
      exposes: {
        "./Header": "./src/components/Header.tsx",
        "./Footer": "./src/components/Footer.tsx",
        "./Home": "./src/components/HomeContent.tsx", 
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" }, 
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
      },
    }),
    isDev ? new RefreshPlugin() : null, 
  ].filter(Boolean), 
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(), 
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets }, 
      }),
    ],
  },
});