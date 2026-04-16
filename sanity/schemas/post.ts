import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      description: 'Mô tả ngắn (120-200 ký tự) hiển thị trên listing và dùng làm meta description mặc định',
      validation: (rule) =>
        rule.max(200).warning('Excerpt nên dưới 200 ký tự để hiển thị đẹp trên listing và Google SERP'),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines (noindex)',
      type: 'boolean',
      description: 'Bật khi muốn ẩn bài viết khỏi Google. Bài vẫn hiển thị công khai trên site.',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Tiêu đề SEO (30-65 ký tự). Nếu trống, dùng tiêu đề bài.',
          validation: (rule) =>
            rule
              .max(70)
              .warning('Meta title nên dưới 65 ký tự để không bị Google cắt'),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Mô tả SEO (120-165 ký tự). Nếu trống, dùng excerpt.',
          validation: (rule) =>
            rule
              .max(170)
              .warning('Meta description nên dưới 165 ký tự để không bị Google cắt'),
        },
        { name: 'ogImage', title: 'OG Image', type: 'image' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      date: 'publishedAt',
    },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString('vi-VN') : 'Chưa đặt ngày',
      }
    },
  },
})
