import { Context } from "src/app/api/graphql/context"

const resolvers = {
  Query: {
    async test(_, __, { prisma }: Context) {
      const user = await prisma.user.findFirst()
      return { text: user.name }
    },
  },
}

export default resolvers
