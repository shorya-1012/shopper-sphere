import AddProductForm from "@/components/dashboard-ui/AddProductForm"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const page = async () => {

    const { userId } = auth()
    if (!userId) redirect('/')

    const currUser = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    if (currUser?.role !== 'ADMIN') redirect('/')

    const categories = await db.category.findMany()

    return (
        <div className="min-h-screnn w-screen overflow-hidden px-5 mt-5">
            <h1 className="font-nunito font-semibold text-3xl">Add Product</h1>
            <AddProductForm categories={categories} />
        </div>
    )
}

export default page