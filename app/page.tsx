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

	// just an easy way of separating BE/FE environments, prisma migrations seem scary so don't want to add a column for now
	const apiEnvironments = environmentsMap.filter((e) => e.environment.name.slice(-3) === 'api');
	const appEnvironments = environmentsMap.filter((e) =>  e.environment.name.slice(-3) === 'app');

	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<Title>Overview</Title>
			<Text>A list of environments and their latest deployment status.</Text>
			<h2 className="font-bold text-xl mt-8">API</h2>
			<Grid numItemsSm={1} numItemsMd={2} numItemsLg={3} className="justify-center mt-6 gap-6">
				{apiEnvironments.map((o) => (
					<Grid key={o.environment.id} className="flex flex-col flex-1 gap-2">
						<EnvironmentCard key={'' + o.environment.id} environment={o.environment} isAuthUserDeployer={o.isAuthUserDeployer} />
						{(o.isAuthUserDeployer && !o.environment.currentDeployment?.finishedTesting) && <DeployerContextActions deployment={o.environment.currentDeployment!} environmentName={o.environment.name}/>}
					</Grid>
				))}
			</Grid>
			<hr className="m-4"/>
			<h2 className="font-bold text-xl mt-8">APP</h2>
			<Grid numItemsSm={1} numItemsMd={2} numItemsLg={3} className="justify-center mt-6 gap-6">
				{appEnvironments.map((o) => (
					<Grid key={o.environment.id} className="flex flex-col flex-1 gap-2">
						<EnvironmentCard key={'' + o.environment.id} environment={o.environment} isAuthUserDeployer={o.isAuthUserDeployer} />
						{(o.isAuthUserDeployer && !o.environment.currentDeployment?.finishedTesting) && <DeployerContextActions deployment={o.environment.currentDeployment!} environmentName={o.environment.name}/>}
					</Grid>
				))}
			</Grid>
		</main>
	);
}
