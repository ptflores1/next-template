import * as path from "path"
import { loadFilesSync } from "@graphql-tools/load-files"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge"
import { mergeSchemas } from "@graphql-tools/schema"
import { DateTimeTypeDefinition, DateTimeResolver, JSONDefinition, JSONResolver } from "graphql-scalars"
import { ApolloServer } from "@apollo/server"
import { NextRequest } from "next/server"
import { context, Context } from "./context"
import resolvers from "@/resolvers/index"

const schema = mergeSchemas({
  typeDefs: mergeTypeDefs([
    DateTimeTypeDefinition,
    JSONDefinition,
    ...loadFilesSync(path.join(process.cwd(), "./src/graphql/server/**/*.graphql")),
  ]),
  resolvers: mergeResolvers([{ DateTime: DateTimeResolver }, { JSON: JSONResolver }, resolvers]),
})

const server = new ApolloServer<Context>({ schema })

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context,
})

export { handler as GET, handler as POST }
