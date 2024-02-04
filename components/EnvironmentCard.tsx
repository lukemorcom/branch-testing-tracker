"use client";

import { Callout, Card, Text } from "@tremor/react";
import { timeAgo } from "../lib/time";
import { EnvironmentWithDeploymentAndUser } from "../types";
import axios from "axios";
import toast from "react-hot-toast";

export default async function EnvironmentCard({environment, isAuthUserDeployer}: {environment: EnvironmentWithDeploymentAndUser; isAuthUserDeployer: Boolean}) {
	let hiddenClicks = 0;

	const incrementHiddenClicks = async () => {
		hiddenClicks++;

		if (hiddenClicks === 5) {
			if (confirm('You didn\'t deploy this, but you clearly know what you\`re doing. Mark the deployment to ' + environment.name + ' as finished?')) {
				const res = await axios.post('/api/finish-deployment', {deploymentId: environment.currentDeploymentId});

				if (res.status !== 200) {
					toast.error('Oops, something went wrong. Harrass Luke about this.');
		
					return;
				}
		
				toast.success('You marked ' + environment.name + ' as finished testing.');
			}

			hiddenClicks = 0;
		}
	}

	return (
		<Card key={environment.id} onClick={incrementHiddenClicks}>
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
