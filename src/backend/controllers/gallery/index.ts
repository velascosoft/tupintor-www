import { ApiRouteController, RequestMapping, UseController } from "@velascosoftware/next-api-router";
import { NextRequest, NextResponse } from "next/server";
import { BlobAccessType, ListBlobResult, ListBlobResultBlob, type PutBlobResult, list, put, del } from '@vercel/blob';
import { StatusCodes } from "http-status-codes";
import { logger } from "@/backend/lib/logger";
import { BLOB_READ_WRITE_TOKEN } from "@/backend/config";
import { ListImagesResponse } from "./response";

const log = logger.child({ module: "gallery-controller " });

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

@UseController()
export class GalleryController implements ApiRouteController {

    @RequestMapping("/", "GET")
    async listImages(_: NextRequest): Promise<NextResponse<ApiResponse<ListImagesResponse>>> {
        try {
            const blobs: Array<ListBlobResultBlob> = [];
            let cursor: string | undefined;

            do {
                const result: ListBlobResult = await list({
                    token: BLOB_READ_WRITE_TOKEN,
                    cursor,
                    limit: 1000,
                });

                blobs.push(...result.blobs);
                cursor = result.hasMore ? result.cursor : undefined;
            } while (cursor);

            const response: ListImagesResponse = {
                count: blobs.length,
                blobs
            }

            return NextResponse.json(
                { success: true, data: response },
                { status: StatusCodes.OK }
            );
        } catch (error) {

            log.error(error);

            return NextResponse.json(
                { success: false },
                { status: StatusCodes.INTERNAL_SERVER_ERROR }
            );
        }
    }

    @RequestMapping("/upload", "POST")
    async uploadImage(req: NextRequest): Promise<NextResponse<ApiResponse<PutBlobResult>>> {
        try {

            const formData = await req.formData();

            const file = formData.get("file");
            const title = formData.get("title");
            const category = formData.get("category");
            const isFeatures = formData.get("isFeatures");
            const access = formData.get("access");

            if (!(file instanceof File)) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Bad Request: File not found"
                    },
                    { status: StatusCodes.BAD_REQUEST }
                );
            }

            if (typeof title !== "string" || !title) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Bad Request: title is required"
                    },
                    { status: StatusCodes.BAD_REQUEST }
                );
            }

            if (typeof category !== "string" || !category) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Bad Request: category is required"
                    },
                    { status: StatusCodes.BAD_REQUEST }
                );
            }

            if (!allowedTypes.includes(file.type)) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `File type not allowed: ${file.type}`
                    },
                    { status: StatusCodes.BAD_REQUEST }
                );
            }

            const blob = await put(
                `${category.toLocaleLowerCase()}/${title.toLocaleLowerCase()}.${file.type}`,
                file,
                {
                    access: access as BlobAccessType,
                    addRandomSuffix: true,
                    token: BLOB_READ_WRITE_TOKEN,
                }
            );

            return NextResponse.json(
                { success: true, data: blob },
                { status: StatusCodes.CREATED }
            );
        } catch (error: unknown) {
            return NextResponse.json(
                { success: false, message: (error as Error).message },
                { status: StatusCodes.BAD_REQUEST },
            );
        }
    }

    @RequestMapping("/delete", "DELETE")
    async deleteImage(req: NextRequest): Promise<NextResponse<ApiResponse>> {
        try {

            const { url } = await req.json();

            if (!url) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Bad Request: Blob URL is required"
                    },
                    { status: StatusCodes.BAD_REQUEST }
                );
            }

            await del(url, {
                token: BLOB_READ_WRITE_TOKEN
            })

            return NextResponse.json(
                { success: true },
                { status: StatusCodes.OK }
            );
        } catch (error: unknown) {
            return NextResponse.json(
                { success: false, message: (error as Error).message },
                { status: StatusCodes.BAD_REQUEST },
            );
        }
    }
}