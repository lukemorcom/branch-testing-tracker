"use client";
import { Grid, Card, Col, Subtitle, Badge, Text, Button } from "@tremor/react";
import { EnvironmentWithDeploymentAndUser } from "../types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'

interface LogDeploymentFormProps {
    environments: EnvironmentWithDeploymentAndUser[];
}

interface FormInput {
	branchName: string;
	environmentId: string;
}

export default function LogDeploymentForm({environments}: LogDeploymentFormProps) {
	const router = useRouter();
	const [selectedEnvironment, setSelectedEnvironment] = useState<EnvironmentWithDeploymentAndUser | null>(null);
	const { register, handleSubmit } = useForm<FormInput>();

	const onEnvironmentClick = (id: string) => {
		setSelectedEnvironment(environments.find((e) => e.id === id) || null);
	}

	const onSubmit = handleSubmit(async (data) => {
		if (!selectedEnvironment!.currentDeployment?.finishedTesting) {
			toast.error(
				selectedEnvironment!.name + '\'s current deployment is still active. The original deployer needs to mark it'
				+ ' as finished before you can log a new deployment.',
				{className: 'text-center'}
			);

			return;
		}

		if (confirm('Log deployment of branch ' + data.branchName + ' to the ' + selectedEnvironment!.name + ' environment?')) {
			const res = await axios.post('/api/log-deployment', {data});

			if (res.status !== 200) {
				toast.error('Something went wrong. Harrass Luke about this.');

				return;
			}

			toast.success('Logged deployment of branch ' + data.branchName + ' to environment ' + selectedEnvironment!.name)
			setSelectedEnvironment(null);
			router.push('/');
		}
	})

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
					<Card className='h-96 flex flex-col gap-2'>
						<Text>Deploying to {selectedEnvironment!.name}</Text>
						    <form className="flex flex-col mt-8" onSubmit={onSubmit}>
							<label><Text>Branch</Text></label>
							<input className="bg-gray-200 rounded-md mt-2 pl-1" type="text" autoFocus {...register("branchName")} />
							<input {...register("environmentId")} hidden readOnly type="text" value={selectedEnvironment!.id}/>
							<Button size="xs" className="mt-8"><input value="Deploy" type="submit" /></Button>
						</form>
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
