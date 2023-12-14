import { SMSRecord } from "~/server/models/SMSRecord"

export const makeSMSRecord = (userId: string, type: string, number: string, content: string) => {
    return SMSRecord.create({
        userId: userId,
        type: type,
        number: number,
        content: content,
        state: 1
    })
}

export const getSMSRecord = (userId: string) => {
    return SMSRecord.findById(userId);
}