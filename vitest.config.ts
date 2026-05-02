import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import { readFileSync } from "fs";
import { compile } from "@mdx-js/mdx";

const mdxPlugin = {
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
  plugins: [react(), tsconfigPaths(), mdxPlugin as any],
  test: {
    environment: "node",
    globals: false,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
