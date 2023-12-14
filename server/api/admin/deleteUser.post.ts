import { deleteUser } from "~/server/db/users"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.log("刪除帳號", body);
        const uesrId = body.userId;

        return deleteUser(uesrId);
    } catch (error: any) {
        console.log(error)
        const eMessage = error.message as string;
        return sendError(event, createError({
            status: 500,
            statusText: "",
            message: eMessage
        }))
    }
})