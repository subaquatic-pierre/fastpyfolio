import { User } from './auth';
import { Seo } from './settings';

export type Blog = {
  id: string;
  title: string;
  description: string;
  slug: string;
  content: object;
  featuredImageUrl?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  authorId: string;
  videoUrl?: string;
};

export const reduceBlog = (data: any): Blog | null => {
  let content = {};

  try {
    content = JSON.parse(data.content);
  } catch (e) {}
  try {
    let blog: Blog = {
      ...data,
      content
    };

    return blog;
  } catch (e) {
    console.debug('Error reducing blog', e.message);
    return null;
  }
};

export const reduceBlogs = (data: any): Blog[] | null => {
  const blogs = [];
  for (const item of data) {
    try {
      const blog = reduceBlog(item);

      if (blog) blogs.push(blog);
    } catch (e) {
      console.debug('Error reducing message', e.message);
    }
  }
  return blogs;
};
