import { Callout, Card } from "@tremor/react";
import { timeAgo } from "../lib/time";
import { Prisma } from "@prisma/client";

type EnvironmentWithDeploymentAndUser = Prisma.EnvironmentGetPayload<{
    include: {currentDeployment: {include: {user: true}}}
  }>

export default function EnvironmentCard({environment}: {environment: EnvironmentWithDeploymentAndUser}) {
  return (
    <Card key={environment.id}>
    <div className="flex flex-col h-44">
      <h3 className="text-4xl font-medium">{environment.name}</h3>
      <p className="text-md">
          {environment.currentDeployment?.branchName}
        </p>
      <Callout className="mt-auto" title={"Deployed by " + environment.currentDeployment?.user.name + " " + timeAgo(environment.currentDeployment?.deployedAt) + " ago"} />
    </div>
  </Card>
  )
}
