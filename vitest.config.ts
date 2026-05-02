import { compile } from "@mdx-js/mdx";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, type Plugin } from "vitest/config";

const mdxPlugin: Plugin = {
  name: "vite-plugin-mdx",
  async resolveId(id: string) {
    if (id.endsWith(".mdx")) {
      return id;
    }
  },
  async load(id: string) {
    if (id.endsWith(".mdx")) {
      const content = readFileSync(id, "utf-8");
      const { value } = await compile(content);
      return String(value);
    }
  },
};

export default defineConfig({
  plugins: [react(), tsconfigPaths(), mdxPlugin],
  test: {
    environment: "node",
    globals: false,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
