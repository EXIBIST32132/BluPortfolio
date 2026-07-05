import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { getSanityClient } from "@/sanity/client";
import { sanityReadToken } from "@/sanity/env";

const previewClient = getSanityClient(true);
const draftModeHandler =
  previewClient && sanityReadToken
    ? defineEnableDraftMode({
        client: previewClient.withConfig({ token: sanityReadToken }),
      })
    : null;

export async function GET(request: Request) {
  if (!draftModeHandler) {
    return Response.json(
      { message: "Sanity preview is not configured. Add project, dataset, and read-token env vars." },
      { status: 503 },
    );
  }

  return draftModeHandler.GET(request);
}
