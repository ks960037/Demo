import { userTransformer } from "~/server/utils/transformers/user"
import { createUser } from "~/server/db/users"

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("建帳號", body)

  const { account, password, name } = body.userData;
  console.log("建帳號", account, password, name)

  if (!account || !password || !name) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "缺少資料",
    }));
  }

  // 寫入 mongoDB
  const userData = {
    account,
    password,
    name
  }

  let result = null
  try {
    result = await createUser(userData)
    return {
      code: 200,
      message: "成功新建帳號",
      body: userTransformer(result)
    }
  }
  catch (e: any) {
    return {
      code: 500,
      message: e,
      errorCode: e.code,
      reason: e.keyPattern
    }
  }
});
