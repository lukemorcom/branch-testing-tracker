import { Callout, Card, Text } from "@tremor/react";
import { timeAgo } from "../lib/time";
import { EnvironmentWithDeploymentAndUser } from "../types";

export default async function EnvironmentCard({environment, isAuthUserDeployer}: {environment: EnvironmentWithDeploymentAndUser; isAuthUserDeployer: Boolean}) {
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
				<Callout className="mt-auto" title={"Deployed by " + (isAuthUserDeployer ? 'You' : environment.currentDeployment?.user.name) + " " + timeAgo(environment.currentDeployment?.deployedAt) + " ago"} />
				{!environment.currentDeployment?.finishedTesting && <Callout color="amber" className="mt-2 p-0 pl-4 pb-2" title="">Not finished testing</Callout>}
				{environment.currentDeployment?.finishedTesting && <Callout color="green" className="mt-2 p-0 pl-4 pb-2" title="">Finished testing!</Callout>}
			</div>
		</Card>
	)
}
