import * as path from "node:path";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/index.ts", // Punto de entrada de la aplicación
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"], // Extensiones de archivo que se resolverán
  },
  devServer: {
    port: 4001, // Puerto del servidor de desarrollo
    historyApiFallback: true, // Habilita el soporte para React Router
    watchFiles: [path.resolve(__dirname, "src")], // Archivos a observar en desarrollo
  },
  output: {
    uniqueName: "app1", // Identificador único para este microfrontend
    publicPath: "http://localhost:4001/", // Ruta pública para los archivos generados
  },
  experiments: {
    css: true, // Habilita el soporte para CSS
  },
  module: {
    rules: [
      {
        test: /\.svg$/, // Maneja archivos SVG
        type: "asset",
      },
      {
        test: /\.css$/, // Maneja archivos CSS
        use: ["postcss-loader"],
        type: "css",
      },
      {
        test: /\.(jsx?|tsx?)$/, // Maneja archivos JSX/TSX
        use: [
          {
            loader: "builtin:swc-loader", // Usa SWC para transpilar
            options: {
              jsc: {
                parser: {
                  syntax: "typescript", // Soporte para TypeScript
                  tsx: true, // Soporte para TSX
                },
                transform: {
                  react: {
                    runtime: "automatic", // Usa el nuevo JSX transform
                    development: isDev, // Habilita el modo desarrollo
                    refresh: isDev, // Habilita React Refresh en desarrollo
                  },
                },
              },
              env: { targets }, // Define los navegadores objetivo
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html", // Usa este archivo como plantilla HTML
    }),
    new ModuleFederationPlugin({
      name: "app1", // Nombre único de este microfrontend
      filename: "remoteEntry.js", // Nombre del archivo remoto
      exposes: {
        "./Header": "./src/components/Header.tsx", // Expone el componente Header
        "./Footer": "./src/components/Footer.tsx", // Expone el componente Footer
        "./Home": "./src/components/HomeContent.tsx", // Expone el componente Home
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" }, // Comparte React como un singleton
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" }, // Comparte React DOM como un singleton
      },
    }),
    isDev ? new RefreshPlugin() : null, // Habilita React Refresh en desarrollo
  ].filter(Boolean), // Filtra plugins nulos
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(), // Minimiza JavaScript con SWC
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets }, // Minimiza CSS con Lightning CSS
      }),
    ],
  },
});