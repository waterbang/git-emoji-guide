import { defineConfig } from "@bfchain/pkgm-bfsp";
export default defineConfig((info) => {
  const config: Bfsp.UserConfig = {
    name: "gitmoji",
    exports: {
      ".": "./index.ts",
    },
    packageJson: {
      license: "MIT",
      author: "BFChainer",
      dependencies: {
        "@types/node": "^17.0.29",
        tslib: "^2.3.1",
      },
    },
  };
  return config;
});
