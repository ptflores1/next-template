import * as path from "path"
import { loadFilesSync } from "@graphql-tools/load-files"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge"
import { mergeSchemas } from "@graphql-tools/schema"
import { IResolvers } from "@graphql-tools/utils"
import { DateTimeTypeDefinition, DateTimeResolver, JSONDefinition, JSONResolver } from "graphql-scalars"
import { ApolloServer } from "@apollo/server"
import { NextRequest } from "next/server"

const schema = mergeSchemas({
  typeDefs: mergeTypeDefs([
    DateTimeTypeDefinition,
    JSONDefinition,
    ...loadFilesSync(path.join(process.cwd(), "./src/graphql/server/**/*.graphql")),
  ]),
  resolvers: mergeResolvers([
    { DateTime: DateTimeResolver },
    { JSON: JSONResolver },
    ...loadFilesSync<IResolvers>(path.join(process.cwd(), "./src/handlers/**/*.resolvers.ts")),
  ]),
})

const server = new ApolloServer({ schema })

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
})

export { handler as GET, handler as POST }
