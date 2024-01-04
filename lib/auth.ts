import { getServerSession } from "next-auth";

export async function getSession() {
	return await getServerSession();
}

export async function checkAuth() {
	const session = await getServerSession();

	return !! session?.user;
}

export async function getUser() {
	const session = await getServerSession();

	return session!.user;
}
