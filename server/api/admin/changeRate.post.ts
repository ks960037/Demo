import { changeRate } from "~/server/db/users"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.log("修改費率", body);
        const uesrId = body.userId;
        const type = body.type;
        const rate = body.rate;

        return changeRate(uesrId, type, rate);
    } catch (error: any) {
        console.log(error)
        const eMessage = error.message as string;
        return createError({
            status: 500,
            statusText: "",
            message: eMessage
        })
    }
})