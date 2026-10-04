import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "static",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "md",
        defaultItem: () => ({
          date: new Date().toISOString(),
          draft: true,
          author: "Ujjwal Srivastava",
        }),
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return (
                values?.title
                  ?.toLowerCase()
                  .replace(/ /g, "-")
                  .replace(/[^\w-]+/g, "") ?? ""
              );
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Meta Description",
            ui: { component: "textarea" },
            description:
              "Keep under 160 characters. Shown in Google search results.",
          },
          {
            type: "string",
            name: "canonicalURL",
            label: "Canonical URL",
            description:
              "Optional. Set only if this article is republished from another URL.",
          },
          {
            type: "object",
            name: "cover",
            label: "Cover Image",
            fields: [
              {
                type: "image",
                name: "image",
                label: "Image",
                description: "Upload or choose a cover image.",
              },
              {
                type: "string",
                name: "alt",
                label: "Alt Text",
              },
              {
                type: "string",
                name: "caption",
                label: "Caption",
              },
            ],
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: { component: "tags" },
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            description: "Drafts won't appear on the live site.",
          },
          {
            type: "boolean",
            name: "showToc",
            label: "Show Table of Contents",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Article Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
