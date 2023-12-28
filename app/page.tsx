import { Title, Text, Grid } from "@tremor/react";
import EnvironmentCard from "../components/EnvironmentCard";
import { EnvironmentWithDeploymentAndUser } from "../types";
import { getEnvironments } from "../lib/db";

export default async function DeploymentsPage() {
	const environments = await getEnvironments();

	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<Title>Overview</Title>
			<Text>A list of environments and their latest deployment status.</Text>
			<Grid numItemsMd={2} className="flex mt-6 gap-6">
				{environments.map((e: EnvironmentWithDeploymentAndUser) => (
					<EnvironmentCard key={e.id} environment={e} />
				))}
			</Grid>
		</main>
	);
}
