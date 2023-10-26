import AddProductForm from "@/components/dashboard-ui/AddProductForm"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import isAdmin from "@/lib/authHelpers"

const page = async () => {

    const { userId } = auth()
    const isAuthorized = await isAdmin(userId)
    if (!isAuthorized) redirect('/')

    const categories = await db.category.findMany()

    return (
        <div className="min-h-screnn w-screen overflow-hidden px-5 mt-5">
            <h1 className="font-nunito font-semibold text-3xl">Add Product</h1>
            <AddProductForm categories={categories} />
        </div>
    )
}

export default page