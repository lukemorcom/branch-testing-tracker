import { NextRequest } from "next/server";
import { getUser } from "../../../lib/auth";

export async function POST(request: NextRequest) {
	const data = await request.json();
	const user = await getUser();

	console.log(data);

	return new Response('Logged deployment successfully', {status: 200})
}
