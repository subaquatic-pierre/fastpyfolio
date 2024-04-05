import { defaultSiteSettings } from 'models/settings';
import { SiteSettings, reduceSiteSettings } from 'models/settings';
import { ApiRequest, ApiResponse } from './api';
import axios from 'axios';
import { GET_BLOG, GET_SITE_SETTINGS, LIST_BLOG, LIST_PROJECT } from 'lib/endpoints';
import { Project, reduceProjects } from 'models/project';
import { Blog, reduceBlogs } from 'models/blog';
import { blankBlog, blankProject } from 'utils/blankData';

const env = process.env.NODE_ENV;

export enum RequestOrigin {
  Browser,
  NextBackend
}

export class RemoteApi {
  serverSide: RequestOrigin;
  constructor(serverSide: RequestOrigin = RequestOrigin.Browser) {
    this.serverSide = serverSide;
  }

  apiRequest = async <Model = object>({ endpoint, method = 'GET', data, headers }: ApiRequest): Promise<ApiResponse<Model>> => {
    let apiHost = process.env.NEXT_PUBLIC_API_URL;

    if (env === 'development' && this.serverSide === RequestOrigin.NextBackend) {
      apiHost = process.env.BACKEND_API_URL;
    }

    return axios.request<any, ApiResponse<Model>>({
      method: method,
      url: `${apiHost}${endpoint}`,
      data,
      headers
    });
  };

  getSiteSettings = async (): Promise<SiteSettings> => {
    const res = await this.apiRequest<{ data: any }>({ endpoint: GET_SITE_SETTINGS });

    const siteSettings = reduceSiteSettings(res);

    return {
      ...siteSettings
    };
  };

  getProjects = async (): Promise<Project[]> => {
    const res = await this.apiRequest<any[]>({ endpoint: LIST_PROJECT() });

    const projects = reduceProjects(res.data);

    return projects;
  };

  getProject = async (slugOrId: string): Promise<Project> => {
    // const res = await apiRequest<any[]>({ endpoint: LIST_PROJECT() });

    // const projects = reduceProjects(res.data);

    return blankProject;
  };

  getBlogs = async (): Promise<Blog[]> => {
    const res = await this.apiRequest<any[]>({ endpoint: LIST_BLOG() });

    const blogs = reduceBlogs(res.data);

    return blogs;
  };

  getBlog = async (slugOrId: string): Promise<Blog> => {
    const res = await this.apiRequest<any>({ endpoint: GET_BLOG(slugOrId) });

    // return projects;
    return res.data;
  };
}
