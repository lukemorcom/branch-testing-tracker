import { Title, Text, Grid } from "@tremor/react";
import EnvironmentCard from "../components/EnvironmentCard";
import { EnvironmentWithDeploymentAndUser } from "../types";
import { getEnvironments } from "../lib/db";
import { getUser } from "../lib/auth";
import DeployerContextActions from "../components/DeployerContextActions";

export default async function DeploymentsPage() {
	const environments = await getEnvironments();
	const user = await getUser();

	const environmentsMap = environments.map((environment: EnvironmentWithDeploymentAndUser) => ({
		environment,
		isAuthUserDeployer: user!.email == environment.currentDeployment?.user.email,
	  }));

	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<Title>Overview</Title>
			<Text>A list of environments and their latest deployment status.</Text>
			<Grid numItemsMd={2} className="flex justify-center mt-6 gap-6">
				{environmentsMap.map((o) => (
					<Grid key={o.environment.id} className="flex flex-col flex-1 gap-2">
						<EnvironmentCard key={'' + o.environment.id} environment={o.environment} isAuthUserDeployer={o.isAuthUserDeployer} />
						{(o.isAuthUserDeployer && !o.environment.currentDeployment?.finishedTesting) && <DeployerContextActions deployment={o.environment.currentDeployment!} environmentName={o.environment.name}/>}
					</Grid>
				))}
			</Grid>
		</main>
	);
}
