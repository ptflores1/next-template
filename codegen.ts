import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "src/graphql/generated//server/index.ts": {
      schema: "src/graphql/server/**/*.graphql",
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        "typescript",
        "typescript-resolvers",
      ],
    },
    "src/graphql/generated/client/": {
      schema: "src/graphql/server/**/*.graphql",
      documents: "src/graphql/client/**/*.graphql",
      preset: "client",
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
      ],
    },
  },
}

export default config
