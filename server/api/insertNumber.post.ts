import PHNumber from "../models/PHNumber";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let keys = Object.keys(body);
    try {
        for (let tag of keys) {
            // 按照分類將號碼取出
            let phones = body[tag];
            for (let phone of phones) {
                // 確認資料庫查無此號碼
                let queryResult = await PHNumber.find({ phone_number: "+" + phone });
                if (queryResult.length == 0)
                    // 新增該號碼
                    PHNumber.create({
                        _id: null,
                        phone_number: "+" + phone,
                        tag: tag,
                        update_at: Date(),
                    })
            }
        }
        return {
            statusCode: 200,
            result: "",
            message: "成功"
        };
    } catch (err) {
        console.log(err);
        return "Error";
    }
})
