import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const data = await request.json();

	console.log('BITBUCKET API CALL', data);

	return new Response('Logged some stuff', {status: 200})
}
