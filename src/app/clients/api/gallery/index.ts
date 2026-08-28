import apiClient from "@/app/clients/api";
import { ListImagesResponse } from "@/backend/controllers/gallery/response";
import { PutBlobResult } from "@vercel/blob";

interface GalleryApi {
    listImages: () => Promise<ApiResponse<ListImagesResponse>>;
    uploadImage: (data: FormData) => Promise<ApiResponse<PutBlobResult>>;
    deleteImage: (url: string) => Promise<ApiResponse>;
}

const listImages = async (): Promise<ApiResponse<ListImagesResponse>> => 
    apiClient.get('/gallery', {});

const uploadImage = async (data: FormData): Promise<ApiResponse<PutBlobResult>> =>
    apiClient.post('/gallery/upload', data)

const deleteImage = async (url: string): Promise<ApiResponse> =>
    apiClient.delete('/gallery/delete', {}, { url })

export const galleryApi: GalleryApi = {
    listImages,
    uploadImage,
    deleteImage
}