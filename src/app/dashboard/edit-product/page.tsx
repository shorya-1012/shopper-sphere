import EditProductForm from "@/components/dashboard-ui/EditProductForm"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import isAdmin from "@/lib/authHelpers"

const page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const { userId } = auth()
    const isAuthorized = await isAdmin(userId)
    if (!isAuthorized) redirect('/')

    const productId = searchParams.productId
    if (!productId) redirect('/')

    const categories = await db.category.findMany()

    const productToBeEdited = await db.product.findUnique({
        where: {
            id: productId
        }
    })
    if (!productToBeEdited) redirect('/')

    return (
        <div className="min-h-screnn w-screen overflow-hidden px-5 mt-5">
            <h1 className="font-nunito font-semibold text-3xl">Add Product</h1>
            <EditProductForm product={productToBeEdited} categories={categories} />
        </div>
    )
}

export default page