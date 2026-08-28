import { authApi } from "@/app/clients/api/auth"

export const loginUser = async (password?: string): Promise<boolean> => {
    const { success } = await authApi.login(password);

    return success;
}

export const updatePasswordUser = async (password: string): Promise<boolean> => {
    const { success } = await authApi.updatePassword(password);

    return success;
}

export const logoutUser = async (): Promise<boolean> => {
    const { success } = await authApi.logout();

    return success;
}