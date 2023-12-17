import { Card, Title, Text } from '@tremor/react';
import UsersTable from '../table';
import prismaDb from '../../lib/prismadb';

export default async function DeploymentsPage() {
  const users = await prismaDb.user.findMany({
    select: {id: true, name: true, email: true}
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>{users.map((u) => u.name)}</Text>
      <Card className="mt-6">
        <UsersTable users={users}/>
      </Card>
    </main>
  );
}
