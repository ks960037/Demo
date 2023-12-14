import { useAuthToken } from "./states.js"
export default (url: string, options: { [key: string]: any } = {}) => {
    console.log("夾帶token傳送", url, useAuthToken().value);
    return $fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${useAuthToken().value}`
        }
    })
}