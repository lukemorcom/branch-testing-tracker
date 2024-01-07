import { NextRequest } from "next/server";
import { getUser } from "../../../lib/auth";
import prismaDb from "../../../prisma/prismadb";

export async function POST(request: NextRequest) {
	const {data: {branchName, environmentId}} = await request.json();
	console.log(branchName);

	// lol what am I even doing this is so tapped
	const user = await getUser();
	const userRow = await prismaDb.user.findUnique({
		where: {
		  email: user!.email!,
		},
	  });
	const userId = userRow!.id;

	// create the deployment record
	const newDeployment = await prismaDb.deployment.create({
		data: {
			userId,
			branchName: branchName,
			environment: {connect: {id: environmentId}}
		}
	});

	// update the environment with the new deployment
	await prismaDb.environment.update({
		where: { id: environmentId },
		data: {currentDeploymentId: newDeployment.id}
	})

	return new Response('Logged deployment successfully', {status: 200})
}
