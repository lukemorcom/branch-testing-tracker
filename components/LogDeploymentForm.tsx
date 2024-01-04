"use client";

import { Grid, Card, Col, Subtitle, Badge } from "@tremor/react";
import { EnvironmentWithDeploymentAndUser } from "../types";
import { useState } from "react";

interface LogDeploymentFormProps {
    environments: EnvironmentWithDeploymentAndUser[];
}

export default function LogDeploymentForm({environments}: LogDeploymentFormProps) {
	const [selectedEnvironment, setSelectedEnvironment] = useState<EnvironmentWithDeploymentAndUser | null>(null);

	const onEnvironmentClick = (id: string) => {
		setSelectedEnvironment(environments.find((e) => e.id === id) || null);
	}

	return (
		<Grid numItems={3} className="mt-6 gap-6">
			<Col className="flex-grow" numColSpan={1}>
				<Card className='h-96'>
					<Subtitle className='pb-4'>Environment</Subtitle>
					<Grid>
						{environments.map((e) => (
							<Badge onClick={() => onEnvironmentClick(e.id)} className='mb-2 cursor-pointer' color={"green"} key={e.id}><span className='text-green-700'>{e.name}</span></Badge>
						))}
					</Grid>
				</Card>
			</Col>
			<Col className="flex-grow" numColSpan={2}>
				{selectedEnvironment ? (
					<Card className='h-96'>
						<p>A cool form where you log the deployment to... {selectedEnvironment.name}</p>
					</Card>
				) : (
					<Card className='h-96 flex flex-col justify-center items-center'>
						<Subtitle className="p-4">Select an environment</Subtitle>
					</Card>
				)}
			</Col>
		</Grid>
	);
}
