import { z } from "zod";

const imageArrayValidator = z.object({
    imageURL: z.string()
})

export const AddProductApiValidator = z.object({
    name: z.string().min(3, 'Prod uct name should contain at least 3 characters'),
    price: z.number(),
    category: z.string(),
    description: z.string(),
    images: z.array(imageArrayValidator)
})

export type AddProductPayload = z.infer<typeof AddProductApiValidator>
export type ImageArray = z.infer<typeof imageArrayValidator>