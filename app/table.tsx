import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Badge
} from '@tremor/react';
import { EnvironmentWithDeploymentAndUser } from '../types';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function DeploymentsTable({ environments }: { environments: EnvironmentWithDeploymentAndUser[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Environment</TableHeaderCell>
          <TableHeaderCell>Branch</TableHeaderCell>
          <TableHeaderCell>Deployed By</TableHeaderCell>
          <TableHeaderCell>Deployed At</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {environments.map((e) => (
          <TableRow key={e.id}>
            <TableCell>
              <Badge color={'green'}>
                <span className='text-green-700'>{e.name}</span>
              </Badge>
            </TableCell>
            <TableCell>
              <Text>{e.currentDeployment?.branchName || '?'}</Text>
            </TableCell>
            <TableCell>
              <Text>{e.currentDeployment?.user.name || '?'}</Text>
            </TableCell>
            <TableCell>
              <Text>{e.currentDeployment?.deployedAt.toLocaleString() || '?'}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
