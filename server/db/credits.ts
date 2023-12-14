import { Credit } from '~/server/models/Credit';
import { User } from '~/server/models/User';
import mongoose from 'mongoose';

export interface CreditData {
    userId: string;
    amount: number;
    reason: string;
}

export const topup = (creditData: CreditData): Promise<any> => {
    return Credit.create({
        ...creditData
    });
}

/** 簡訊發送扣費方法
 * @param userId 用戶id
 * @param countSMS 簡訊數量
 * @param typeSMS 簡訊種類
 */
export const charge = async (userId: any, countSMS: any, typeSMS: any): Promise<any> => {
    // 查用戶
    const user = await User.findById(userId);
    let rateSMS = 1;
    switch (typeSMS) {
        case "GLOBE":
            rateSMS = user?.GLOBE as number;
            return await Credit.create({
                userId: userId,
                amount: -countSMS * rateSMS,
                reason: "發送 GLOBE 簡訊扣費",
            })
        case "SMART":
            rateSMS = user?.SMART as number;
            return await Credit.create({
                userId: userId,
                amount: -countSMS * rateSMS,
                reason: "發送 SMART 簡訊扣費",
            })
        case "DITO":
            rateSMS = user?.DITO as number;
            return await Credit.create({
                userId: userId,
                amount: -countSMS * rateSMS,
                reason: "發送 DITO 簡訊扣費",
            })
        case "CHERRY":
            rateSMS = user?.CHERRY as number;
            return await Credit.create({
                userId: userId,
                amount: -countSMS * rateSMS,
                reason: "發送 CHERRY 簡訊扣費",
            })
        default:
            rateSMS = user?.OTHER as number;
            return await Credit.create({
                userId: userId,
                amount: -countSMS * rateSMS,
                reason: "發送 OTHER 簡訊扣費",
            })
    }
}

interface record {
    amount: number;
}
export const getBalanceOfUser = async (uId: string): Promise<any> => {
    // console.log("送去資料庫查", uId);

    let objUID = new mongoose.Types.ObjectId(uId);
    let records = await Credit.aggregate([{
        $group: {
            _id: "$userId",
            total: { $sum: "$amount" }
        }
    }, {
        $match: {
            _id: objUID
        }
    }])
    console.log("聚合查詢", records);
    if (records.length == 0) return 0; // 沒有紀錄就是沒有點數
    let result = records[0] as { total: number }
    return result.total;
}