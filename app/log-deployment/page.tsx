import { Card, Title, Text, Grid, Col, Subtitle, Badge } from '@tremor/react';
import { getEnvironments } from '../../lib/db';

export default async function LogDeploymentPage() {
  const environments = await getEnvironments();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Log Deployment</Title>
      <Grid numItems={3} className="mt-6 gap-6">
        <Col className="flex-grow" numColSpan={1}>
          <Card className='h-96'>
            <Subtitle>Environment</Subtitle>
            {environments.map((e) => (
              <Badge color={"green"} key={e.id}><span className='text-green-700'>{e.name}</span></Badge>
            ))}
          </Card>
        </Col>
        <Col className="flex-grow" numColSpan={2}>
          <Card className='h-96'>
            <Subtitle>Deployment Information</Subtitle>
          </Card>
        </Col>
      </Grid>
    </main>
  );
}
