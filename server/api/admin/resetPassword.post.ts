import { resetPassword } from "~/server/db/users"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.log("修改密碼", body);
        const uesrId = body.userId;
        const password = body.password;

        return resetPassword(uesrId, password);
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