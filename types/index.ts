import { Prisma } from "@prisma/client"

export type EnvironmentWithDeploymentAndUser = Prisma.EnvironmentGetPayload<{
  include: {
    currentDeployment: {
      include: {
        user: true
      },
      select: {
        finishedTesting: true,
      }
    }
  }
}>;
