import { Callout, Card, Subtitle, Text } from "@tremor/react";
import { timeAgo } from "../lib/time";
import { Prisma } from "@prisma/client";

type EnvironmentWithDeploymentAndUser = Prisma.EnvironmentGetPayload<{
    include: {currentDeployment: {include: {user: true}}}
  }>

export default function EnvironmentCard({environment}: {environment: EnvironmentWithDeploymentAndUser}) {
	return (
		<Card key={environment.id}>
			<div className="flex flex-col h-full">
				<h3 className="text-4xl font-medium pb-2">{environment.name}</h3>
				<div className="pb-6">
					<Text>
						{environment.currentDeployment?.branchName}
					</Text>
				</div>
				{/* Is this a proper way of doing this? Works tho */}
				<div className="flex-grow" />
				<Callout className="mt-auto" title={"Deployed by " + environment.currentDeployment?.user.name + " " + timeAgo(environment.currentDeployment?.deployedAt) + " ago"} />
			</div>
		</Card>
	)
}
