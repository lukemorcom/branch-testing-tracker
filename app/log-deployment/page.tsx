import { Card, Title, Text } from '@tremor/react';
import UsersTable from '../table';
import prismaDb from '../../lib/prismadb';

export default async function LogDeploymentPage() {
  const environments = await prismaDb.environment.findMany({
    orderBy: [{name: 'asc'}],
    include: {currentDeployment: {include: {user: true}}
  }
});

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Deployments</Title>

      <Card className="mt-6">
        <UsersTable environments={environments}/>
      </Card>
    </main>
  );
}
