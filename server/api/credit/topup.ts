import { topup } from "~/server/db/credits"

export default defineEventHandler(async (event) => {
    console.log("加扣點");
    try {
        // 只許州官放火
        if (!event.context.admin) return;

        const body = await readBody(event);
        const userId = body.userId;
        const amount = body.amount;
        let creditData = {
            userId: userId,
            amount: amount,
            reason: "admin 加點"
        }
        topup(creditData);
        return "OK"
    } catch (error) {
        // 處理錯誤...
        console.log(error);
        return error;
    }
})
