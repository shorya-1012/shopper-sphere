import { z } from "zod";

const OrderStatusSchema = z.enum(["PENDING", "DELIVERED"])

export const editOrderStatusValidator = z.object({
    id: z.string(),
    status: OrderStatusSchema
})

export type EditOrderStatusPayload = z.infer<typeof editOrderStatusValidator>