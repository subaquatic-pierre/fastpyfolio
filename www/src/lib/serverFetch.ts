import { defaultSiteSettings } from 'models/settings';
import { SiteSettings, reduceSiteSettings } from 'models/settings';
import { ApiRequest, ApiResponse } from './api';
import axios from 'axios';
import { GET_SITE_SETTINGS, LIST_PROJECT } from 'lib/endpoints';
import { Project, reduceProjects } from 'models/project';

let severSiteApiHost = process.env.NEXT_PUBLIC_API_URL;

const env = process.env.NODE_ENV;

if (env === 'development') {
  severSiteApiHost = process.env.BACKEND_API_URL;
}

export const serverApiRequest = async <Model = object>({
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
  const res = await serverApiRequest<{ data: any }>({ endpoint: GET_SITE_SETTINGS });

  const siteSettings = reduceSiteSettings(res);

  return {
    ...siteSettings
  };
};

export const getProjects = async (): Promise<Project[]> => {
  const res = await serverApiRequest<any[]>({ endpoint: LIST_PROJECT() });

  const projects = reduceProjects(res.data);

  return projects;
};
