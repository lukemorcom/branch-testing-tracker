import { Callout, Card } from "@tremor/react";
import { timeAgo } from "../lib/time";
import { Environment, Prisma } from "@prisma/client";

type EnvironmentWithDeploymentAndUser = Prisma.EnvironmentGetPayload<{
    include: {currentDeployment: {include: {user: true}}}
  }>

export default function EnvironmentCard(props: {environment: EnvironmentWithDeploymentAndUser}) {
  return (
    <Card key={props.environment.id}>
    <div className="flex flex-col h-44">
      <h3 className="text-4xl font-medium">{props.environment.name}</h3>
      <p className="text-md">
          {props.environment.currentDeployment?.branchName}
        </p>
      <Callout className="mt-auto" title={"Deployed by " + props.environment.currentDeployment?.user.name + " " + timeAgo(props.environment.currentDeployment?.deployedAt) + " ago"} />
    </div>
  </Card>
  )
}
