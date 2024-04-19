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
export const REFRESH_TOKEN = '/api/auth/refresh-token';
export const EMAIL_CONFIRMATION = '/api/auth/send-email-confirmation';

// Settings
export const GET_SITE_SETTINGS = '/api/site-settings';

// Blogs
export const BLOG_SEARCH = (searchString: string) => `/api/blog/search?term=${searchString}`;
export const LIST_BLOG = (pageNumber = 0, pageSize = 25) => `/api/blog`;
export const GET_BLOG = (slugOrId: string) => `/api/blog/${slugOrId}`;
export const LIST_CATEGORIES = '/api/blog/categories';

// Projects
export const LIST_TAGS = '/api/project/tags';
export const LIST_PROJECT = (pageNumber = 0, pageSize = 25) => `/api/project`;
export const GET_PROJECT = (slugOrId: string) => `/api/project/${slugOrId}`;
export const UPLOAD = '/api/upload';
