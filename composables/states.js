export const useAuthToken = () => useState('auth_token')
export const useAuthUser = () => useState('auth_user')
export const useAuthLoading = () => useState('auth_loading', () => true)
/** 點數紀錄 */
export const useCredits = () => useState('credits', () => 0)
