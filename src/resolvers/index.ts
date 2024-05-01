// https://github.com/ardatan/graphql-tools/discussions/2919
import { mergeResolvers } from "@graphql-tools/merge"

import test from "./test.resolvers"

const resolvers = [test]
export default mergeResolvers(resolvers)
