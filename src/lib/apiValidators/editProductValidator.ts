import { z } from "zod";

export const editProductValidator = z.object({
    id: z.string(),
    name: z.string().min(3, 'Prod uct name should contain at least 3 characters'),
    price: z.number(),
    category: z.string(),
    description: z.string(),
})

export type EditProductPayload = z.infer<typeof editProductValidator>