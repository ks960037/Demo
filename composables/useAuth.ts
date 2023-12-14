import { jwtDecode } from "jwt-decode"
import useFetchWithToken from "./useFetchWithToken"
import { useAuthToken, useAuthUser, useAuthLoading } from "./states.js"

export default () => {

    const setToken = (newToken: string | null) => {
        const authToken = useAuthToken()
        authToken.value = newToken
    }

    const setUser = (newUser: string | null) => {
        const authUser = useAuthUser()
        authUser.value = newUser
    }

    const setIsAuthLoading = (value: boolean) => {
        const authLoading = useAuthLoading()
        authLoading.value = value
    }

    const login = (account: string, password: string) => {
        console.log(account, password);
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: {
                        account,
                        password
                    }
                }) as { access_token: string, user: any }
                console.log("登入結果", data);
                setToken(data.access_token)
                setUser(data.user)

                resolve(true)
            }
            catch (e) {
                // console.log(e);
                reject(e);
            }
        })
    }

    const logout = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await useFetchWithToken('/api/auth/logout', {
                    method: 'POST'
                })

                setToken(null)
                setUser(null)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    /** 刷新 access token */
    const refreshToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/refresh') as { access_token: string }
                if (data) setToken(data.access_token)
                resolve(true)
            } catch (e) {
                console.log(e)
                reject(false);
            }
        })
    }

    const reRefreshAccessToken = () => {
        const authToken = useState('auth_token') as { value: string }

        if (!authToken.value) {
            return
        }

        const jwt = jwtDecode(authToken.value) as { exp: number }
        console.log("JWT持續時間", jwt.exp - Date.now() / 1000);
        setTimeout(async () => {
            console.log("觸發自動刷新")
            await refreshToken()
            reRefreshAccessToken()
        }, 599000);
    }

    const getUser = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await useFetchWithToken('/api/auth/user') as { user: any }

                setUser(data.user)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const initAuth = () => {
        return new Promise(async (resolve, reject) => {
            setIsAuthLoading(true)
            try {
                await refreshToken()
                await getUser()

                reRefreshAccessToken()

                resolve(true)
            } catch (error) {
                console.log(error)
                reject(error)
            } finally {
                setIsAuthLoading(false)
            }
        })
    }

    return {
        login,
        logout,
        initAuth
    }
}