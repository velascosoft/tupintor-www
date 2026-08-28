import { GalleryController } from "@/backend/controllers/gallery";
import { createNextRoute } from "@velascosoftware/next-api-router";

export const galleryRouter = createNextRoute(new GalleryController(), "/gallery");