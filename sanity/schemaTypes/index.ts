import { defineArrayMember, defineField, defineType } from "sanity";

const textSizeOptions = [
  { title: "Caption", value: "caption" },
  { title: "Body", value: "body" },
  { title: "Lede", value: "lede" },
  { title: "Heading", value: "heading" },
  { title: "Display", value: "display" },
];

const alignmentOptions = [
  { title: "Left", value: "left" },
  { title: "Center", value: "center" },
];

const emphasisOptions = [
  { title: "Normal", value: "normal" },
  { title: "Sticker", value: "sticker" },
  { title: "Label", value: "label" },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const textPresetFields = [
  defineField({
    name: "sizePreset",
    title: "Text size preset",
    type: "string",
    initialValue: "body",
    options: { list: textSizeOptions, layout: "radio" },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "alignment",
    type: "string",
    initialValue: "left",
    options: { list: alignmentOptions, layout: "radio" },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "emphasis",
    type: "string",
    initialValue: "normal",
    options: { list: emphasisOptions, layout: "radio" },
    validation: (Rule) => Rule.required(),
  }),
];

const richText = defineField({
  name: "body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bulleted", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({ scheme: ["http", "https", "mailto"] }).required(),
              }),
            ],
          },
        ],
      },
    }),
  ],
});

export const accessibleImage = defineType({
  name: "accessibleImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the image for screen readers.",
      validation: (Rule) => Rule.required().min(8),
    }),
    defineField({
      name: "caption",
      type: "string",
    }),
  ],
});

export const navigationItem = defineType({
  name: "navigationItem",
  title: "Navigation item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "href",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true;
          return value.startsWith("#") || value.startsWith("/")
            ? true
            : "Use a section anchor like #work or an internal path like /projects/example.";
        }),
    }),
  ],
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "url",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }).required(),
    }),
  ],
});

export const sectionSetting = defineType({
  name: "sectionSetting",
  title: "Section setting",
  type: "object",
  fields: [
    defineField({
      name: "id",
      type: "string",
      options: {
        list: [
          { title: "Cover", value: "cover" },
          { title: "Contents", value: "contents" },
          { title: "Work", value: "work" },
          { title: "About", value: "about" },
          { title: "Contact", value: "contact" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "visible", type: "boolean", initialValue: true }),
    defineField({ name: "order", type: "number", validation: (Rule) => Rule.required().integer() }),
  ],
});

export const designSettings = defineType({
  name: "designSettings",
  title: "Design settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      initialValue: "Default design settings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentTheme",
      type: "string",
      initialValue: "mixed",
      options: {
        list: [
          { title: "Blue", value: "blue" },
          { title: "Purple", value: "purple" },
          { title: "Mixed", value: "mixed" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "textScale",
      type: "string",
      initialValue: "normal",
      options: {
        list: [
          { title: "Compact", value: "compact" },
          { title: "Normal", value: "normal" },
          { title: "Large", value: "large" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingStyle",
      type: "string",
      initialValue: "getai",
      options: {
        list: [
          { title: "DT Getai", value: "getai" },
          { title: "Editorial fallback", value: "fallback" },
          { title: "Simple", value: "simple" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cardDensity",
      type: "string",
      initialValue: "normal",
      options: {
        list: [
          { title: "Airy", value: "airy" },
          { title: "Normal", value: "normal" },
          { title: "Compact", value: "compact" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "motionIntensity",
      type: "string",
      initialValue: "normal",
      options: {
        list: [
          { title: "Reduced", value: "reduced" },
          { title: "Normal", value: "normal" },
          { title: "Expressive", value: "expressive" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "siteDescription",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "defaultSeoImage", type: "accessibleImage" }),
    defineField({
      name: "navigationItems",
      type: "array",
      of: [defineArrayMember({ type: "navigationItem" })],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          value && emailPattern.test(value) ? true : "Enter a valid email address.",
        ),
    }),
    defineField({ name: "cvFile", type: "file" }),
    defineField({
      name: "cvUrl",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [defineArrayMember({ type: "socialLink" })],
    }),
    defineField({ name: "designSettings", type: "reference", to: [{ type: "designSettings" }] }),
    defineField({
      name: "sections",
      type: "array",
      of: [defineArrayMember({ type: "sectionSetting" })],
    }),
  ],
});

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "shortTagline", type: "string" }),
    defineField({
      name: "portfolioTitle",
      title: "Portfolio title",
      type: "string",
      initialValue: "Design Portfolio.",
    }),
    defineField({
      name: "positioning",
      title: "Cover positioning line",
      type: "string",
      initialValue: "Project-led graphic design portfolio.",
    }),
    defineField({
      name: "sourcePortfolio",
      title: "Source portfolio URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "bio",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({ name: "profileImage", type: "accessibleImage" }),
    defineField({ name: "skills", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "availabilityStatus", type: "string" }),
    defineField({ name: "awards", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "roles", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "courses", type: "array", of: [defineArrayMember({ type: "string" })] }),
  ],
});

export const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Rich text block",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    richText,
    ...textPresetFields,
  ],
});

export const imageBlock = defineType({
  name: "imageBlock",
  title: "Image block",
  type: "object",
  fields: [defineField({ name: "image", type: "accessibleImage", validation: (Rule) => Rule.required() }), ...textPresetFields],
});

export const imageGalleryBlock = defineType({
  name: "imageGalleryBlock",
  title: "Image gallery block",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({
      name: "images",
      type: "array",
      of: [defineArrayMember({ type: "accessibleImage" })],
      validation: (Rule) => Rule.min(1).required(),
    }),
    ...textPresetFields,
  ],
});

export const quoteBlock = defineType({
  name: "quoteBlock",
  title: "Quote block",
  type: "object",
  fields: [
    defineField({ name: "quote", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "attribution", type: "string" }),
    ...textPresetFields,
  ],
});

export const processStepBlock = defineType({
  name: "processStepBlock",
  title: "Process step block",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({
      name: "steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "text", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
    ...textPresetFields,
  ],
});

export const outcomeBlock = defineType({
  name: "outcomeBlock",
  title: "Outcome block",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "body", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    ...textPresetFields,
  ],
});

export const twoColumnBlock = defineType({
  name: "twoColumnBlock",
  title: "Two-column block",
  type: "object",
  fields: [
    defineField({ ...richText, name: "left", title: "Left column" }),
    defineField({ ...richText, name: "right", title: "Right column" }),
    ...textPresetFields,
  ],
});

export const fullBleedImageBlock = defineType({
  name: "fullBleedImageBlock",
  title: "Full-bleed image block",
  type: "object",
  fields: [defineField({ name: "image", type: "accessibleImage", validation: (Rule) => Rule.required() }), ...textPresetFields],
});

export const spacerBlock = defineType({
  name: "spacerBlock",
  title: "Spacer block",
  type: "object",
  fields: [
    defineField({
      name: "size",
      type: "string",
      initialValue: "medium",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "subtitle", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "year", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "status", type: "string", initialValue: "Selected project" }),
    defineField({ name: "featured", type: "boolean", initialValue: true }),
    defineField({ name: "order", type: "number", validation: (Rule) => Rule.required().integer() }),
    defineField({
      name: "clockAngle",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(360),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: "thumbnail",
      type: "accessibleImage",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { featured?: boolean };
          const image = value as { asset?: unknown } | undefined;
          return parent.featured && !image?.asset
            ? "Featured projects need a thumbnail."
            : true;
        }),
    }),
    defineField({ name: "heroImage", type: "accessibleImage", validation: (Rule) => Rule.required() }),
    defineField({
      name: "accentColorPreset",
      type: "string",
      initialValue: "mixed",
      options: {
        list: [
          { title: "Blue", value: "blue" },
          { title: "Purple", value: "purple" },
          { title: "Mixed", value: "mixed" },
          { title: "Black", value: "black" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "tools", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "brief", type: "text", rows: 4 }),
    defineField({ name: "process", type: "text", rows: 4 }),
    defineField({ name: "outcome", type: "text", rows: 4 }),
    defineField({ name: "reflection", type: "text", rows: 4 }),
    defineField({ name: "contentNote", type: "text", rows: 3 }),
    defineField({
      name: "sourceUrl",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [defineArrayMember({ type: "accessibleImage" })],
    }),
    defineField({
      name: "sections",
      type: "array",
      of: [
        defineArrayMember({ type: "richTextBlock" }),
        defineArrayMember({ type: "imageBlock" }),
        defineArrayMember({ type: "imageGalleryBlock" }),
        defineArrayMember({ type: "quoteBlock" }),
        defineArrayMember({ type: "processStepBlock" }),
        defineArrayMember({ type: "outcomeBlock" }),
        defineArrayMember({ type: "twoColumnBlock" }),
        defineArrayMember({ type: "fullBleedImageBlock" }),
        defineArrayMember({ type: "spacerBlock" }),
      ],
    }),
  ],
});

export const schemaTypes = [
  accessibleImage,
  navigationItem,
  socialLink,
  sectionSetting,
  designSettings,
  siteSettings,
  profile,
  richTextBlock,
  imageBlock,
  imageGalleryBlock,
  quoteBlock,
  processStepBlock,
  outcomeBlock,
  twoColumnBlock,
  fullBleedImageBlock,
  spacerBlock,
  project,
];
