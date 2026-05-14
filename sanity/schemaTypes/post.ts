import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 2, description: "Used for meta description and card previews" }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({ name: "seoTitle", title: "SEO Title (optional)", type: "string", description: "Overrides the page <title> tag" }),
    defineField({ name: "seoDescription", title: "SEO Description (optional)", type: "string", description: "Overrides the meta description" }),
  ],
  preview: {
    select: { title: "title", media: "mainImage", publishedAt: "publishedAt" },
    prepare({ title, media, publishedAt }) {
      return {
        title,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : "Draft",
        media,
      };
    },
  },
});
