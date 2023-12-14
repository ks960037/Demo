export default () => {

    /** 新建帳號 */
    const createUser = (userData: Object) => {
        return useFetchWithToken("/api/admin/register", {
            method: "POST",
            body: { userData }
        })
    }

    /** 取得用戶清單 */
    const getUserList = async () => {
        const result = await useFetchWithToken("/api/admin/user", {})
        return result;
    }

    /** 取得用戶餘額 */
    const getUserCredit = async (userId: string) => {
        const result = await useFetchWithToken("/api/credit", {
            method: "GET",
            params: {
                uid: userId
            }
        })
        return result;
    }

    /** 為用戶儲值 */
    const topupUser = async (userId: string, amount: number) => {
        const result = await useFetchWithToken("/api/credit/topup", {
            method: "POST",
            body: {
                userId: userId,
                amount: amount
            }
        })
        return result;
    }

    /** 修改用戶費率 */
    const changeSMSChargeRate = async (userId: string, type: string, newRate: number) => {
        const result = await useFetchWithToken("/api/admin/changeRate", {
            method: "POST",
            body: {
                userId: userId,
                type: type,
                rate: newRate
            }
        })
        return result;
    }

    /** 重置用戶密碼 */
    const resetPassword = async (userId: string, password: string) => {
        const result = await useFetchWithToken("/api/admin/resetPassword", {
            method: 'POST',
            body: {
                userId,
                password
            }
        })
        return result;
    }

    /** 刪除帳號 */
    const deleteAccount = async (userId: string) => {
        const result = await useFetchWithToken("/api/admin/deleteUser", {
            method: 'POST',
            body: {
                userId
            }
        })
        return result;
    }

    return {
        createUser,
        getUserList,
        resetPassword,
        deleteAccount,
        getUserCredit,
        topupUser,
        changeSMSChargeRate
    }
}