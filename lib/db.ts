import prismaDb from "../prisma/prismadb";

export async function getEnvironments() {
	return await prismaDb.environment.findMany({
		orderBy: [{name: 'asc'}],
		include: {currentDeployment: {include: {user: true}}
		}
	});
}
