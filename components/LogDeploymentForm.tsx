"use client";
import { Grid, Card, Col, Subtitle, Badge, Text, Button } from "@tremor/react";
import { EnvironmentWithDeploymentAndUser } from "../types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

interface LogDeploymentFormProps {
    environments: EnvironmentWithDeploymentAndUser[];
}

interface FormInput {
	branch: string;
	environmentId: string;
}

export default function LogDeploymentForm({environments}: LogDeploymentFormProps) {
	const [selectedEnvironment, setSelectedEnvironment] = useState<EnvironmentWithDeploymentAndUser | null>(null);
	const { register, handleSubmit } = useForm<FormInput>();

	const onEnvironmentClick = (id: string) => {
		setSelectedEnvironment(environments.find((e) => e.id === id) || null);
	}

	const onSubmit = handleSubmit(async (data) => {
		if (confirm('Log deployment of branch ' + data.branch + 'to the ' + selectedEnvironment!.name + 'environment?')) {
			const res = await axios.post('/api/log-deployment', {data});

			if (res.status !== 200) {
				toast.error('Something went wrong. Harrass Luke about this.');

				return;
			}

			toast.success('Logged deployment of branch ' + data.branch + ' to environment ' + selectedEnvironment!.name)
			setSelectedEnvironment(null);
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
					<Card className='h-96'>
						    <form className="flex flex-col" onSubmit={onSubmit}>
							<label><Text>Branch</Text></label>
							<select {...register("branch")}>
								<option value="branch1">branch1</option>
								<option value="branch2">branch2</option>
								<option value="branch3">branch3</option>
							</select>
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
