import PHNumber from "../models/PHNumber";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body);
    try {
        // 按照分類處理號碼
        let keys = Object.keys(body);
        for (let tag of keys) {
            /** 準備儲存的號碼 */
            let phones: Array<string> = body[tag];
            console.log("目標", phones);
            /** 查詢資料庫中已有的號碼 */
            let queryResult = await PHNumber.find({
                phone_number: { $in: phones }
            }).select("phone_number");
            console.log("結果", queryResult);
            /** 篩選出未儲存號碼 */
            let unStoredPhones = phones.filter((value) => {
                let isStored = queryResult.filter((q) => q.phone_number == value);
                return isStored.length == 0;
            })
            console.log("未儲存", unStoredPhones);
            // 將未儲存過的號碼存入
            let insertDataArray = [];
            for (let phone of unStoredPhones) {
                insertDataArray.push({
                    phone_number: phone,
                    tag: tag,
                    update_at: Date(),
                })
            }
            console.log("即將儲存", insertDataArray);
            const result = await PHNumber.insertMany(insertDataArray);
            console.log("結果", result);
        }
    }
    catch (err) {
        console.log(err);
        return "Error";
    }
})
