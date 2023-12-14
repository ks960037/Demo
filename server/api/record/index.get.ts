import { getSMSRecord } from "~/server/db/records"

export default defineEventHandler(async (event) => {
    console.log("查詢用戶發送記錄");
    try {
        let userId = event.context.auth.user.id as string;
        // console.log("userid：", event.context.auth.user.id);
        // admin 可以查全部人的記錄
        if (event.context.admin) {

        }
        let result = await getSMSRecord(userId);
        console.log("查詢結果：", result);
        return result;
    } catch (error) {
        // 處理錯誤...
        console.log(error);
        return error;
    }
})
