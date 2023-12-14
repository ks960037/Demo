import { userTransformer } from "~/server/utils/transformers/user"

export default defineEventHandler(async (event) => {

    return {
        user: userTransformer(event.context.auth?.user)
    }

})