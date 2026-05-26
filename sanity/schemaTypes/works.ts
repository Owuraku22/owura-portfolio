import { defineField, defineType } from 'sanity'

export const works = defineType({
  name: 'works',
  title: 'Works',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',  
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'workGif',
      title: 'Work Video URL',
      type: 'url',
    }),
    defineField({
      name: 'projectDetails',
      title: 'Project Details',
      type: 'object',
      fields: [
        defineField({
          name: 'role',
          title: 'Role',
          type: 'string',
        }),
        defineField({
          name: 'duration',
          title: 'Duration',
          type: 'string',
        }),
        defineField({
          name: 'projectField',
          title: 'Project Field',
          type: 'string',
        }),
        defineField({
          name: 'client',
          title: 'Client',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'workDone',
      title: 'What I Worked On',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'keyRoles',
      title: 'Key Roles',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Product & User Research', value: 'Product & User Research' },
          { title: 'User Interface Design', value: 'User Interface Design' },
          { title: 'User Experience Design', value: 'User Experience Design' },
          { title: 'User Interaction Design', value: 'User Interaction Design' },
        ],
      },
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
    }),
    defineField({
      name: 'challengeGif',
      title: 'Challenge Video URL',
      type: 'url',
    }),
    defineField({
      name: 'objectives',
      title: 'Objectives',
      type: 'array',
      of: [
        defineField({
          name: 'objective',
          title: 'Objective',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'researchProcess',
      title: 'Research Process',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'painPoints',
      title: 'Identified Pain Points',
      type: 'array',
      of: [
        defineField({
          name: 'painPoint',
          title: 'Pain Point',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'solutionDesign',
      title: 'Solution Design',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'solutions',
          title: 'Solutions',
          type: 'array',
          of: [
            defineField({
              name: 'solution',
              title: 'Solution',
              type: 'object',
              fields: [
                defineField({
                  name: 'problemBlock',
                  title: 'Problem Block',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                    }),
                  ],
                }),
                defineField({
                  name: 'solutionBlock',
                  title: 'Solution Block',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                    }),
                  ],
                }),
                defineField({
                  name: 'imagesBlock',
                  title: 'Images Block',
                  type: 'array',
                  of: [{ type: 'image' }],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'projectShots',
      title: 'Project Shots',
      type: 'array',
      of: [
        defineField({
          name: 'projectShot',
          title: 'Project Shot',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{ type: 'image' }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'impactResults',
      title: 'Impact & Results',
      type: 'array',
      of: [
        defineField({
          name: 'impactResult',
          title: 'Impact & Result',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
  ],
})
