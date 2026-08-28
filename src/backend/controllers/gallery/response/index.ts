import { z } from "zod";

const BlobSchema = z.object({
    url: z.string().url(),
    pathname: z.string(),
    size: z.number(),
    uploadedAt: z.date(),
    etag: z.string()
})

export const ListImagesResponseSchema = z.object({
    count: z.number(),
    blobs: z.array(BlobSchema).default([])
});

export type ListImagesResponse = z.infer<typeof ListImagesResponseSchema>;

