import { defineType, defineField } from 'sanity';

export const articleSchema = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    // ── Multilingual Title ──────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'zh', title: 'Chinese (中文)', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
      validation: (Rule) =>
        Rule.custom((value: { zh?: string; en?: string } | undefined) => {
          if (!value?.zh && !value?.en) {
            return 'At least one language title is required';
          }
          return true;
        }),
    }),

    // ── Slug ────────────────────────────────────────────────────────
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Multilingual Excerpt ────────────────────────────────────────
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'object',
      fields: [
        {
          name: 'zh',
          title: 'Chinese Excerpt (中文摘要)',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(200),
        },
        {
          name: 'en',
          title: 'English Excerpt',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(200),
        },
      ],
    }),

    // ── Rich Text Content ───────────────────────────────────────────
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),

    // ── Category ────────────────────────────────────────────────────
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '入门 / Beginner', value: 'beginner' },
          { title: '策略 / Strategy', value: 'strategy' },
          { title: '进阶 / Advanced', value: 'advanced' },
          { title: '心理 / Psychology', value: 'psychology' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Published At ────────────────────────────────────────────────
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    // ── Read Time (minutes) ─────────────────────────────────────────
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
      validation: (Rule) => Rule.required().min(1).max(120),
      initialValue: 5,
    }),

    // ── Cover Image ─────────────────────────────────────────────────
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),

    // ── SEO Meta ─────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitleZh', title: 'Meta Title (中文)', type: 'string' },
        { name: 'metaTitleEn', title: 'Meta Title (English)', type: 'string' },
        { name: 'metaDescriptionZh', title: 'Meta Description (中文)', type: 'text', rows: 2 },
        { name: 'metaDescriptionEn', title: 'Meta Description (English)', type: 'text', rows: 2 },
      ],
    }),
  ],

  orderings: [
    {
      title: 'Published Date, Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      titleZh: 'title.zh',
      titleEn: 'title.en',
      category: 'category',
      media: 'coverImage',
    },
    prepare({ titleZh, titleEn, category }: { titleZh?: string; titleEn?: string; category?: string }) {
      return {
        title: titleZh || titleEn || 'Untitled',
        subtitle: `${category ?? 'No category'} · ${titleEn ?? ''}`,
      };
    },
  },
});

export default articleSchema;
