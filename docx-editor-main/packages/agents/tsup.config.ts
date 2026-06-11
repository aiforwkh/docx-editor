import { defineConfig } from 'tsup';

// Tsup builds the framework-agnostic entries. Vue SFCs are built by
// `vite.config.ts` because tsup/esbuild can't compile `.vue` files. The
// dedicated `tsconfig.tsup.json` excludes vue/* so the d.ts pass doesn't
// trip on the SFC shim.
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    bridge: 'src/bridge.ts',
    server: 'src/server.ts',
    mcp: 'src/mcp/index.ts',
    'ai-sdk/server': 'src/ai-sdk/server.ts',
  },
  format: ['cjs', 'esm'],
  dts: { resolve: true },
  tsconfig: 'tsconfig.tsup.json',
  splitting: true,
  sourcemap: false,
  clean: true,
  treeshake: {
    preset: 'smallest',
  },
  minify: true,
  noExternal: ['@eigenpal/docx-editor-core'],
  external: ['prosemirror-model', 'prosemirror-state', 'prosemirror-view', 'ai'],
});
