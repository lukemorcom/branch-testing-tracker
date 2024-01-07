"use client";
import { Button, Callout, Card } from "@tremor/react";
import { Deployment } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function DeployerContextActions({deployment}: {deployment: Deployment}) {
	const [hasClickedFinish, setHasClickedFinish] = useState(false);
	const [isMounted, setIsMounted] = useState(true);

	const finishedClick = async () => {
		const res = await axios.post('/api/finish-deployment', {deployment: deployment.id});

		if (res.status !== 200) {
			toast.error('Oops, something went wrong. Harrass Luke about this.');

			return;
		}

		setIsMounted(false);
		toast.success('Finished with ' + deployment.branchName + '.');
	}

	return (
		<>
			{isMounted && (
				<Card key={deployment.id}>
					<div className="flex flex-col">
						<Callout title="Are you done?" color="green">
					Your deployment to this environment is the most recent. Click the button below when you are done
					using this environment to indicate that others may deploy to it.
						</Callout>
						{!hasClickedFinish && <Button onClick={() => setHasClickedFinish(true)} size="xs" className="mt-2"><span className="text-white">Testing Complete</span></Button>}
						{hasClickedFinish && (
							<div className="flex flex-row justify-center gap-2">
								<Button color="red" onClick={finishedClick} size="xs" className="mt-2"><span className="text-white">I'm Sure</span></Button>
								<Button color="amber" onClick={() => setHasClickedFinish(false)} size="xs" className="mt-2"><span className="text-white">I Changed My Mind</span></Button>
							</div>
						)}
					</div>
				</Card>
			)}
		</>
	)
}
