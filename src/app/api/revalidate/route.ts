import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { sanityRevalidateSecret } from "@/sanity/env";

type SanityWebhookBody = {
  _type?: string;
  slug?: { current?: string };
};

export async function POST(request: NextRequest) {
  if (!sanityRevalidateSecret) {
    return Response.json(
      { message: "Missing SANITY_REVALIDATE_SECRET environment variable." },
      { status: 500 },
    );
  }

  const { body, isValidSignature } = await parseBody<SanityWebhookBody>(
    request,
    sanityRevalidateSecret,
  );

  if (!isValidSignature) {
    return Response.json({ message: "Invalid webhook signature." }, { status: 401 });
  }

  revalidateTag("portfolio", "max");

  if (body?._type) {
    revalidateTag(body._type, "max");
  }

  if (body?._type === "project" && body.slug?.current) {
    revalidateTag(`project:${body.slug.current}`, "max");
    revalidatePath(`/projects/${body.slug.current}`);
  }

  revalidatePath("/");

  return Response.json({
    revalidated: true,
    tags: ["portfolio", body?._type, body?.slug?.current ? `project:${body.slug.current}` : null],
    now: Date.now(),
  });
}
