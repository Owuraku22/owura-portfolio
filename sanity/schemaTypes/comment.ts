import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'comment',
  title: 'Comments',
  type: 'document',
  fields: [
    defineField({
      name: 'work',
      title: 'Case Study',
      type: 'reference',
      to: [{ type: 'works' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      description: 'Rating from 1 (Poor) to 5 (Excellent)',
    }),
    defineField({
      name: 'commentText',
      title: 'Comment',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(1000),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isApproved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Approve this comment to display it publicly',
    }),
  ],
  preview: {
    select: {
      title: 'commentText',
      subtitle: 'work.title',
      rating: 'rating',
    },
    prepare(selection) {
      const { title, subtitle, rating } = selection;
      const stars = '⭐'.repeat(rating || 0);
      return {
        title: title ? title.substring(0, 50) + '...' : 'No comment',
        subtitle: `${subtitle || 'Unknown'} - ${stars}`,
      };
    },
  },
  orderings: [
    {
      title: 'Created Date, New',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Rating, High to Low',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
});
