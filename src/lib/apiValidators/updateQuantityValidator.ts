import { z } from "zod";

export const UpdateQuantityValidator = z.object({
    productId: z.string(),
    quantity: z.number().gte(1)
})

export type UpdateQuantityPayload = z.infer<typeof UpdateQuantityValidator>