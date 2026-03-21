import { defineType, defineField } from 'sanity';

export const courseSchema = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    // ── Multilingual Title ──────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'zh',
          title: 'Chinese Title (中文标题)',
          type: 'string',
          validation: (Rule) => Rule.required().max(80),
        },
        {
          name: 'en',
          title: 'English Title',
          type: 'string',
          validation: (Rule) => Rule.required().max(80),
        },
      ],
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

    // ── Multilingual Description ────────────────────────────────────
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {
          name: 'zh',
          title: 'Chinese Description (中文简介)',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.max(500),
        },
        {
          name: 'en',
          title: 'English Description',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.max(500),
        },
      ],
    }),

    // ── Price ───────────────────────────────────────────────────────
    defineField({
      name: 'price',
      title: 'Price (CNY)',
      type: 'number',
      description: 'Set to 0 for a free course',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),

    // ── Level ───────────────────────────────────────────────────────
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: '入门 / Beginner', value: 'beginner' },
          { title: '进阶 / Intermediate', value: 'intermediate' },
          { title: '职业 / Professional', value: 'professional' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Chapters (array of objects) ─────────────────────────────────
    defineField({
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chapter',
          title: 'Chapter',
          fields: [
            {
              name: 'order',
              title: 'Order',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'title',
              title: 'Chapter Title',
              type: 'object',
              fields: [
                { name: 'zh', title: 'Chinese', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
              ],
            },
            {
              name: 'description',
              title: 'Chapter Description',
              type: 'object',
              fields: [
                { name: 'zh', title: 'Chinese', type: 'text', rows: 2 },
                { name: 'en', title: 'English', type: 'text', rows: 2 },
              ],
            },
            {
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              description: 'YouTube, Vimeo, or direct MP4 URL',
            },
            {
              name: 'duration',
              title: 'Duration',
              type: 'string',
              description: 'e.g. "35min" or "1h 20min"',
            },
            {
              name: 'isFree',
              title: 'Free Preview',
              type: 'boolean',
              description: 'Allow non-enrolled users to watch this chapter',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              order: 'order',
              titleZh: 'title.zh',
              titleEn: 'title.en',
              duration: 'duration',
              isFree: 'isFree',
            },
            prepare({ order, titleZh, titleEn, duration, isFree }: { order?: number; titleZh?: string; titleEn?: string; duration?: string; isFree?: boolean }) {
              return {
                title: `${order ?? '?'}. ${titleZh || titleEn || 'Untitled Chapter'}`,
                subtitle: `${duration ?? ''}${isFree ? ' · Free Preview' : ''}`,
              };
            },
          },
        },
      ],
    }),

    // ── Promo / Intro Video URL ──────────────────────────────────────
    defineField({
      name: 'videoUrl',
      title: 'Promo Video URL',
      type: 'url',
      description: 'Short promotional video shown on the course landing page',
    }),

    // ── Thumbnail ───────────────────────────────────────────────────
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),

    // ── Instructor ──────────────────────────────────────────────────
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'bio', title: 'Bio', type: 'text', rows: 3 },
        { name: 'avatar', title: 'Avatar', type: 'image', options: { hotspot: true } },
      ],
    }),

    // ── Tags ────────────────────────────────────────────────────────
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    // ── Published ───────────────────────────────────────────────────
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),

    // ── SEO ─────────────────────────────────────────────────────────
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
    {
      title: 'Price, Lowest First',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      titleZh: 'title.zh',
      titleEn: 'title.en',
      price: 'price',
      level: 'level',
      media: 'thumbnail',
    },
    prepare({ titleZh, titleEn, price, level }: { titleZh?: string; titleEn?: string; price?: number; level?: string }) {
      const priceLabel = price === 0 ? 'Free' : `¥${price}`;
      return {
        title: titleZh || titleEn || 'Untitled Course',
        subtitle: `${level ?? ''} · ${priceLabel}`,
      };
    },
  },
});

export default courseSchema;
