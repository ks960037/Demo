import { getUserByAccount } from "~/server/db/users";
import { createRefreshToken } from "~/server/db/refreshTokens";

import { userTransformer } from "~/server/utils/transformers/user"
import { generateTokens } from "~/server/utils/jwt.js"

import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    /** 
     {"account":"helloTaiwan",
     "password":"a1234567"}
     */
    const { account, password } = body;
    console.log("[server/api/login]", account, password);

    if (!account || !password) return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "缺少帳號或密碼"
    }))

    // 資料庫查找對應的用戶
    const user: any | null = await getUserByAccount(account);
    console.log("[server/api/login] 資料庫查詢結果:", user);
    if (!user) return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "查無此用戶"
    }))

    // 檢查密碼正確性
    const isPasswordMatched = await bcrypt.compare(password, user.password)
    console.log("[server/api/login] 密碼正確？:", isPasswordMatched);
    if (!isPasswordMatched) return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "密碼錯誤"
    }))

    const { accessToken, refreshToken } = generateTokens(user);
    console.log("[server/api/login] 產生 JWT:", accessToken, refreshToken);
    // 儲存登入過的 Token 到資料庫
    await createRefreshToken(refreshToken, user.id)

    // refresh token 存 cookie
    setCookie(event, "refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: true
    })

    return {
        access_token: accessToken,
        user: userTransformer(user)
    }
});
