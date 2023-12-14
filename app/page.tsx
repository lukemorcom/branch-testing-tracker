import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import prismaDb from '../lib/prismadb';
import { checkAuth } from '../lib/auth';

interface User {
  id: string;
  name: string;
  email: string;
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';

  const isAuthed = checkAuth();

  const users = await prismaDb.user.findMany({
    select: {id: true, name: true, email: true}
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>{users.map((u) => u.name)}</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users}/>
      </Card>
    </main>
  );
}
