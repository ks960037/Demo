
import { getUserList } from "~/server/db/users"

export default defineEventHandler(async (event) => {
    try {
        console.log("")
        const raw = await getUserList();
        const result = raw.filter((item) => item.name != "admin")
        console.log(result);
        return result;
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