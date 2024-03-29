// Auth endpoints
export const GET_USERS = `/api/profiles`;
export const GET_ADMINS = `/api/profiles/admins`;
export const PROFILE = '/api/profiles/me';
export const PROFILES = '/api/profiles?populate[0]=user.role';
export const REGISTER = '/api/auth/register';
export const LOGIN = '/api/auth/login';
export const FORGOT_PASSWORD = '/api/auth/forgot-password';
export const RESET_PASSWORD = '/api/auth/reset-password';
export const USER = '/api/auth/me';
export const EMAIL_CONFIRMATION = '/api/auth/send-email-confirmation';

// Settings
export const GET_SITE_SETTINGS = '/api/site-settings';

// Blogs
export const LIST_BLOG = (pageNumber = 0, pageSize = 25) =>
  `/api/blogs?populate[0]=seo.metaTags&pagination[pageSize]=${pageSize}&pagination[page]=${pageNumber}`;
export const GET_BLOG_BY_SLUG = (slug: string) => `/cms/blogs?filters[slug][$eq]=${slug}&populate[0]=seo.metaTags`;
export const GET_BLOG_BY_ID = (id: string | number) => `/cms/blogs/${id}?populate[0]=seo.metaTags`;

// Projects
export const LIST_PROJECT = (pageNumber = 0, pageSize = 25) => `/api/`;
export const GET_PROJECT_BY_SLUG = (slug: string) => `/cms/blogs?filters[slug][$eq]=${slug}&populate[0]=seo.metaTags`;
export const GET_PROJECT_BY_ID = (id: string | number) => `/cms/blogs/${id}?populate[0]=seo.metaTags`;
