import { z } from "zod";


export const DeleteProductValidator = z.object({
    productId: z.string()
})

export type DeleteProductPayload = z.infer<typeof DeleteProductValidator>