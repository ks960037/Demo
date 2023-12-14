import { getBalanceOfUser, charge } from "~/server/db/credits"
import { makeSMSRecord } from "~/server/db/records"
import { textCounter } from "~/server/utils/textCounter";

// 各家服務商 API 呼叫方法
import { fetchWanLi } from "./externalAPICaller/wanLi"
import { fetchYKGMS } from "./externalAPICaller/YKGMS"

export default defineEventHandler(async (event) => {
    console.log('發送SMS');
    const body = await readBody(event);
    // console.log(body);
    const numbers = body.numbers;
    // console.log(numbers);
    const smsContent = "【foo】" + body.smsContent as string;
    // console.log(smsContent);
    const sendtime = body.sendtime;
    // console.log(sendtime);
    const userId = body.userId;
    // console.log(userId);

    // 確認用戶點數
    const user_credit = await getBalanceOfUser(userId)
    // console.log("用戶點數", user_credit);

    /** 發送號碼數量 */
    const sms_receivers = numbers.length;
    const textCounterResult = textCounter(smsContent);
    console.log("SMS分析", textCounterResult);

    /** 依據簡訊長度決定倍數 */
    let sms_sections = 1;
    if (textCounterResult.other - 2) sms_sections = Math.ceil(smsContent.length / 67) // 扣除簽名的【】，若還有非 anscii 字元，以67字算1封。
    else sms_sections = Math.ceil(smsContent.length / 160);

    // 先計算總共要扣費多少，確認餘額充足，否則返回
    const cost = sms_receivers * sms_sections;
    if (user_credit < cost) return "餘額不足"

    console.log("餘額足夠，開始進行發送")

    // 扣錢
    // let res_withdraw = null
    // try {
    //     res_withdraw = await charge(userId, cost, 1);
    // } catch (e) {
    //     // 扣費失敗
    //     console.log(e);
    //     return "扣款失敗";
    // }
    // 扣費成功
    // console.log(res_withdraw);

    // 改成電話號碼一筆一筆發送 API
    // 每一筆發送總共做 3 件事
    // 1. 扣款
    // 2. 記錄
    // 3. 打 API

    let numberList: string = "";

    // API 結果
    let promiseArr: any[] = [];
    let messages_sent = 0;
    for (let number of numbers) {
        numberList += "00" + number + ",";
        messages_sent++;
        if (messages_sent == 1000) {
            // 依據API需求 去除結尾逗號
            numberList = numberList.slice(0, numberList.length - 1);
            fetchWanLi(userId, numberList, smsContent, sendtime);
            console.log("API發送 WanLi ", numberList, smsContent);

            makeSMSRecord(userId, "GLOBE", numberList, smsContent);
            const totalAmount = messages_sent * sms_sections;
            charge(userId, totalAmount, "GLOBE")

            messages_sent = 0;
            numberList = "";
        }

        // number = "00" + number; // 補 00 回開頭
        // try {
        // 按照不同電信商切換方法
        // promiseArr.push(fetchYKGMS(userId, number, smsContent, sendtime));
        // 真打 API
        // fetchWanLi(userId, number, smsContent, sendtime);
        // makeSMSRecord(userId, "GLOBE", number, smsContent);
        // messages_sent++;
        // } catch (error) {
        //     console.log(error);
        //     return error;
        // }
    }
    const result = await Promise.all(promiseArr);
    console.log(result);
    // 計算總筆數後再一次扣費
    const totalAmount = messages_sent * sms_sections;
    charge(userId, totalAmount, "GLOBE")

    // 記錄結果到 cloudwatch
    // return JSON.stringify(result);
    return "發送完畢"
})
