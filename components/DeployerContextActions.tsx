import { Button, Card, Subtitle, Text } from "@tremor/react";
import { Deployment } from "@prisma/client";

export default async function DeployerContextActions({deployment}: {deployment: Deployment}) {
	return (
		<Card key={deployment.id}>
			<div className="flex flex-col flex-1 gap-8">
				<Text>
					You deployed most recently to this environment. Click the button below when you are finished testing
					to indicate that the environment is free for another deployment.
				</Text>
				<Button size="xs" color="green">Testing Complete</Button>
			</div>
		</Card>
	)
}
