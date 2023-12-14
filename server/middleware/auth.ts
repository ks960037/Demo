// import UrlPattern from "url-pattern"
import { getUserById } from '~/server/db/users.js'
import { decodeAccessToken } from "../utils/jwt.js"

export default defineEventHandler(async (event) => {
    const endpoints = [
        '/api/auth/user',
        '^/api/credit',
        '^/api/sendSMS',
        '^/api/admin',
    ]
    const isHandledByThisMiddleware = endpoints.some(endopoint => {
        const regex = new RegExp(endopoint);
        // console.log("請求路由", event.node.req.url)
        // console.log("比對", regex.test(event.node.req.url as string))
        return regex.test(event.node.req.url as string)
    })
    console.log(`${event.node.req.url}讀取 jwt:`, isHandledByThisMiddleware)

    if (!isHandledByThisMiddleware) {
        return
    }

    // 解析請求中的驗證資訊
    const token = event.node.req.headers['authorization']?.split(' ')[1]
    console.log("jwt 內容:", token)
    const decoded = decodeAccessToken(token) as { userId: string }
    console.log("解析 jwt:", decoded)
    if (!decoded) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        }))
    }

    try {
        const userId = decoded.userId

        const user = await getUserById(userId);

        event.context.auth = { user }
        if (user.account == "admin") {
            event.context.admin = true
        }
    } catch (error) {
        return
    }

})