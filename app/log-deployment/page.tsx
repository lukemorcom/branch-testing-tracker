import { Title } from '@tremor/react';
import { getEnvironments } from '../../lib/db';
import LogDeploymentForm from '../../components/LogDeploymentForm';

export default async function LogDeploymentPage() {
  const environments = await getEnvironments();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Log Deployment</Title>
      <LogDeploymentForm environments={environments}/>
    </main>
  );
}
