import { NextRequest, NextResponse } from "next/server";
import prismaDb from "../../../prisma/prismadb";

export async function POST(request: NextRequest) {
	const { deploymentId } = await request.json();

	await prismaDb.deployment.update({
		where: {id: deploymentId},
		data: {finishedTesting: true}
	});

	return NextResponse.json('Finished successfully', {status: 200});
}
