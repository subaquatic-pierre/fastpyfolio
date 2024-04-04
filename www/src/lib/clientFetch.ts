import { defaultSiteSettings } from 'models/settings';
import { SiteSettings, reduceSiteSettings } from 'models/settings';
import { ApiRequest, ApiResponse } from './api';
import axios from 'axios';
import { GET_SITE_SETTINGS, LIST_BLOG, LIST_PROJECT } from 'lib/endpoints';
import { Project, reduceProjects } from 'models/project';
import { Blog, reduceBlogs } from 'models/blog';
import { blankBlog } from 'utils/blankData';

let severSiteApiHost = process.env.NEXT_PUBLIC_API_URL;

export const clientApiRequest = async <Model = object>({
  endpoint,
  method = 'GET',
  data,
  headers
}: ApiRequest): Promise<ApiResponse<Model>> => {
  return axios.request<any, ApiResponse<Model>>({
    method: method,
    url: `${severSiteApiHost}${endpoint}`,
    data,
    headers
  });
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const res = await clientApiRequest<{ data: any }>({ endpoint: GET_SITE_SETTINGS });

  const siteSettings = reduceSiteSettings(res);

  return {
    ...siteSettings
  };
};

export const getProjects = async (): Promise<Project[]> => {
  const res = await clientApiRequest<any[]>({ endpoint: LIST_PROJECT() });

  const projects = reduceProjects(res.data);

  return projects;
};

export const getBlogs = async (): Promise<Blog[]> => {
  // const res = await clientApiRequest<any[]>({ endpoint: LIST_BLOG() });

  // const projects = reduceBlogs(res.data);

  // return projects;
  return [];
};
export const getBlogBySlug = async (slug: string): Promise<Blog> => {
  // const res = await clientApiRequest<any[]>({ endpoint: LIST_BLOG() });

  // const projects = reduceBlogs(res.data);

  // return projects;
  return blankBlog;
};
