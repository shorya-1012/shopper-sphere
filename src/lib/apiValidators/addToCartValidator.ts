import { z } from "zod";

export const AddToCartValidator = z.object({
    productId: z.string(),
    quantity: z.number().gte(1)
})

export type AddToCartPayload = z.infer<typeof AddToCartValidator>