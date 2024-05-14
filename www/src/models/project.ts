export type Project = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  githubUrl?: string;
  wwwUrl?: string;
  content?: string;
  tags?: string[];
  featuredImageUrl?: string;
  videoUrl?: string;
};

export const reduceProject = (data: any): Project | null => {
  try {
    let blog: Project = {
      ...data
    };

    return blog;
  } catch (e) {
    console.debug('Error reducing project', e.message);
    return null;
  }
};

export const reduceProjects = (data: any[]): Project[] | null => {
  const blogs: Project[] = [];
  for (const item of data) {
    try {
      const blog = reduceProject(item);

      if (blog) blogs.push(blog);
    } catch (e) {
      console.debug('Error reducing project', e.message);
    }
  }
  return blogs;
};
