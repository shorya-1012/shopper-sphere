import { z } from "zod";

const UserStatusType = z.enum(["USER", "ADMIN"])

export const editUserStatusValidator = z.object({
    id: z.string(),
    status: UserStatusType
})

export type EditUserStatusPayload = z.infer<typeof editUserStatusValidator>