import { Title, Text, Grid } from "@tremor/react";
import prismaDb from "../lib/prismadb";
import EnvironmentCard from "../components/EnvironmentCard";
import { EnvironmentWithDeploymentAndUser } from "../types";

export default async function DeploymentsPage() {
  const environments = await prismaDb.environment.findMany({
      orderBy: [{name: 'asc'}],
      include: {currentDeployment: {include: {user: true}}
    }
  });

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
