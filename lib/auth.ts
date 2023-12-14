import { getServerSession } from "next-auth";

export async function checkAuth() {
    const session = await getServerSession();

    const f = !! session?.user;
    console.log(f);

    return f;
}
