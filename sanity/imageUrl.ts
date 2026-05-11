import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

export const urlBuilder = createImageUrlBuilder(client);
