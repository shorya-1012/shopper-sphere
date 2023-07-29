import { z } from "zod";

export const RemoveCartItemValidator = z.object({
    productId: z.string(),
})

export type RemoveCartItemPayload = z.infer<typeof RemoveCartItemValidator>