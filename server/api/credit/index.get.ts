import { getBalanceOfUser } from "~/server/db/credits"

export default defineEventHandler(async (event) => {
    console.log("查詢用戶點數");
    try {
        let userId = event.context.auth.user.id as string;
        // console.log("userid：", event.context.auth.user.id);
        // admin 可以查別人的餘額
        if (event.context.admin) {
            // console.log("是 admin")
            const query = getQuery(event);
            userId = query.uid as string;
        }
        let result = await getBalanceOfUser(userId);
        console.log("查詢結果：", result);
        return result;
    } catch (error) {
        // 處理錯誤...
        console.log(error);
        return error;
    }
})
