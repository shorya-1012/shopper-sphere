import { z } from "zod";

export const AddReviewValidator = z.object({
    productId: z.string().min(3),
    rating: z.number().gte(1).lte(5),
    commentTitle: z.string(),
    comment: z.string(),
})

export type AddReviewPayload = z.infer<typeof AddReviewValidator>