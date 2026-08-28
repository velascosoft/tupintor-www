import apiClient from "@/app/clients/api";

interface AuthApi {
    login: (password?: string) => Promise<ApiResponse>;
    updatePassword: (password: string) => Promise<ApiResponse>;
    logout: () => Promise<ApiResponse>;
}

const login = async (password?: string): Promise<ApiResponse> => 
    apiClient.post('/auth/login', { password });

const updatePassword = async (password: string): Promise<ApiResponse> =>
    apiClient.patch('/auth/password', { password });

const logout = async (): Promise<ApiResponse> =>
    apiClient.post('/auth/logout', {})

export const authApi: AuthApi = {
    login,
    updatePassword,
    logout,
}