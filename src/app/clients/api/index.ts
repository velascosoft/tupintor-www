const BASE_URL = '/api';

const handleResponse = async (response: Response): Promise<any> => {
    if (!response.ok)
        return { success: false };

    const body = await response.json();
    return body;
}

const handleError = async (err: any): Promise<any> => {
    return { success: false, message: err.message };
}

const api = {
    get: async (path: string, query: any = {}, options?: Omit<RequestInit, "method">) => {
        try {
            Object.keys(query).forEach(key => {
                if (query[key] === undefined) {
                    delete query[key];
                }
            });
            const url = BASE_URL + path + "?" + new URLSearchParams(query).toString();

            const response = await fetch(url, {
                ...options,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    ...options?.headers,
                },
            })

            return handleResponse(response);
        } catch (e) {
            return handleError(e);
        }
    },
    post: async (path: string, data: unknown, options?: Omit<RequestInit, "method">) => {
        try {
            let body: BodyInit | null = null;
            let headers: HeadersInit = {
                'Accept': 'application/json',
                ...options?.headers,
            };

            if (data instanceof FormData) {
                body = data;

            } else if (data instanceof File) {
                body = data;

                headers = {
                    ...headers,
                    'Content-Type': data.type || 'application/octet-stream',
                };
            } else {
                body = JSON.stringify(data);

                headers = {
                    ...headers,
                    'Content-Type': 'application/json',
                };
            }

            const response = await fetch(BASE_URL + path, {
                ...options,
                method: 'POST',
                headers,
                body
            });

            return handleResponse(response);
        } catch (e) {
            return handleError(e);
        }
    },
    put: async (path: string, data: unknown, options?: Omit<RequestInit, "method">) => {
        try {
            let body: BodyInit | null = null;
            let headers: HeadersInit = {
                'Accept': 'application/json',
                ...options?.headers,
            };

            if (data instanceof FormData) {
                body = data;

            } else if (data instanceof File) {
                body = data;

                headers = {
                    ...headers,
                    'Content-Type': data.type || 'application/octet-stream',
                };
            } else {
                body = JSON.stringify(data);

                headers = {
                    ...headers,
                    'Content-Type': 'application/json',
                };
            }

            const response = await fetch(BASE_URL + path, {
                ...options,
                method: 'PUT',
                headers,
                body
            });

            return handleResponse(response);
        } catch (e) {
            return handleError(e);
        }
    },
    patch: async (path: string, data: unknown, options?: Omit<RequestInit, "method">) => {
        try {

            let body: BodyInit | null = null;
            let headers: HeadersInit = {
                'Accept': 'application/json',
                ...options?.headers,
            };

            if (data instanceof FormData) {
                body = data;

            } else if (data instanceof File) {
                body = data;

                headers = {
                    ...headers,
                    'Content-Type': data.type || 'application/octet-stream',
                };
            } else {
                body = JSON.stringify(data);

                headers = {
                    ...headers,
                    'Content-Type': 'application/json',
                };
            }

            const response = await fetch(BASE_URL + path, {
                ...options,
                method: 'PATCH',
                headers,
                body
            });

            return handleResponse(response);
        } catch (e) {
            return handleError(e);
        }
    },
    delete: async (path: string, query: any = {}, data: unknown = {}, options?: Omit<RequestInit, "method">) => {
        try {
            Object.keys(query).forEach(key => {
                if (query[key] === undefined) {
                    delete query[key];
                }
            });

            const url = BASE_URL + path + "?" + new URLSearchParams(query).toString();

            const response = await fetch(url, {
                ...options,
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    ...options?.headers,
                },
                body: JSON.stringify(data)
            })

            return handleResponse(response);
        } catch (e) {
            return handleError(e);
        }
    }
};

export default api;