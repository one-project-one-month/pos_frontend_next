import prisma from "../../prisma/prismaClient";

export default async function Home() {
    const users = await prisma.user.findMany();

    return (
        <main>
            {users.map((user) => (
                <div key={user.id}>{user.name}</div>
            ))}
        </main>
    );
}
