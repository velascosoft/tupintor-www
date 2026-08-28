import { galleryApi } from "@/app/clients/api/gallery";
import { BlobAccessType, type PutBlobResult } from "@vercel/blob";

export const uploadImage = async (title: string, category: string, isFeatures: boolean, file: File, access: BlobAccessType = "public"): Promise<PutBlobResult> => {
    
    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("isFeatures", String(isFeatures));
    formData.append("access", access);
    formData.append("file", file);

    const { success, data, message } = await galleryApi.uploadImage(formData);

    if(success)
        return data!;
    
    return Promise.reject(new Error(message as string || "Error al carga imagen"))
}

export const listImages = async (): Promise<Array<{
    id: string;
    url: string;
    title: string;
    category: string;
}>> => {
    const { success, data } = await galleryApi.listImages();

    if (!success)
        return [];

    const blobs = data?.blobs.map(blob => {
        const pathnameParts = blob.pathname.split("/");
        const pathnameSubParts = pathnameParts[1].split("-");

        const category = pathnameParts[0];
        const title = pathnameSubParts[0];
        const id = pathnameSubParts[1];

        return {
            id,
            url: blob.url,
            title,
            category
        }
    });

    return blobs || [];
}

export const deleteImage = async (url: string): Promise<boolean> => {
    const { success } = await galleryApi.deleteImage(url);

    return success;
}