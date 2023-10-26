import { db } from "./db"

const isAdmin = async (userId: string | null): Promise<boolean> => {
    if (!userId) return false

    const currentUser = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!currentUser || currentUser.role != "ADMIN") {
        return false
    }

    return true;
}

export default isAdmin;