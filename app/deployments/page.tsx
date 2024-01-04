import { Card, Title, Text } from '@tremor/react';
import DeploymentsTable from '../table';
import { getEnvironments } from '../../lib/db';

export default async function DeploymentsPage() {
	const environments = await getEnvironments();

	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<Title>Deployments</Title>
			<Card className="mt-6">
				<DeploymentsTable environments={environments}/>
			</Card>
		</main>
	);
}
