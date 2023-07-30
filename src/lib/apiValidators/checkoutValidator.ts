import { z } from "zod";
import { Cart } from "@prisma/client";


export const CheckoutValidator = z.object({
    quantity: z.number(),

})

export type AddToCartPayload = z.infer<typeof CheckoutValidator>