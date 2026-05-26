import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
    // Bio Section
    defineField({
      name: "bio",
      title: "Bio Description",
      type: "text",
      description: "Your bio/introduction text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Your current location (e.g., Accra, Ghana)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isAvailable",
      title: "Available for Work",
      type: "boolean",
      description: "Toggle availability status",
      initialValue: true,
    }),

    // Profile Images
    defineField({
      name: "profileImages",
      title: "Profile Images",
      type: "array",
      description: "Array of profile/workspace images for the image stack",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // Library/Books Section
    defineField({
      name: "library",
      title: "Library Books",
      type: "array",
      description: "Books in your library",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Book Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "author",
              title: "Author",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "thumbnail",
              title: "Book Cover",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "textColor",
              title: "Text Color",
              type: "string",
              description: "Hex color for text (e.g., #FFFFFF or #000000)",
              validation: (Rule) =>
                Rule.required().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                  name: "hex color",
                  invert: false,
                }),
            }),
            defineField({
              name: "bgColor",
              title: "Background Color",
              type: "string",
              description: "Hex color for background (e.g., #BDAB87)",
              validation: (Rule) =>
                Rule.required().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                  name: "hex color",
                  invert: false,
                }),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "author",
              media: "thumbnail",
            },
          },
        },
      ],
    }),

    // Experience Section
    defineField({
      name: "experience",
      title: "Work Experience",
      type: "array",
      description: "Your work history",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "company",
              title: "Company Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Role/Position",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "startDate",
              title: "Start Date",
              type: "date",
              options: {
                dateFormat: "YYYY-MM",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "isCurrentJob",
              title: "Currently Working Here",
              type: "boolean",
              description: "Check if this is your current position",
              initialValue: false,
            }),
            defineField({
              name: "endDate",
              title: "End Date",
              type: "date",
              options: {
                dateFormat: "YYYY-MM",
              },
              hidden: ({ parent }) => parent?.isCurrentJob === true,
              validation: (Rule) =>
                Rule.custom((endDate, context) => {
                  const isCurrentJob = (context.parent as any)?.isCurrentJob;
                  if (!isCurrentJob && !endDate) {
                    return "End date is required unless this is your current job";
                  }
                  return true;
                }),
            }),
          ],
          preview: {
            select: {
              company: "company",
              role: "role",
              startDate: "startDate",
              endDate: "endDate",
              isCurrentJob: "isCurrentJob",
            },
            prepare({ company, role, startDate, endDate, isCurrentJob }) {
              const start = startDate ? new Date(startDate).getFullYear() : "";
              const end = isCurrentJob
                ? "Present"
                : endDate
                  ? new Date(endDate).getFullYear()
                  : "";
              return {
                title: company,
                subtitle: `${role} (${start} - ${end})`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page Content",
      };
    },
  },
});
