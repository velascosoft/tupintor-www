type ApiResponse<D = unknown> = {
    success: boolean,
    data?: D,
    message?: unknown
}