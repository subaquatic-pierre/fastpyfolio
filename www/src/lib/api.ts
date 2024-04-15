import { defaultSiteSettings } from 'models/settings';
import { SiteSettings, reduceSiteSettings } from 'models/settings';
import { GET_BLOG, GET_PROJECT, GET_SITE_SETTINGS, LIST_BLOG, LIST_PROJECT, UPLOAD, LIST_TAGS } from 'lib/endpoints';
import { Project, reduceProject, reduceProjects } from 'models/project';
import { Blog, reduceBlog, reduceBlogs } from 'models/blog';
import { blankBlog, blankProject } from 'utils/blankData';

import axios from 'axios';
import { DropzoneFileUpload } from 'types/dropzone';

const apiHost = process.env.NEXT_PUBLIC_API_URL;
const isProdEnv = process.env.NODE_ENV === 'production';
const isBuild = process.env.IS_BUILD_ENV ?? false;

type Object = Record<string, number | string | null>;

export type ApiMethod = 'POST' | 'PUT' | 'GET' | 'DELETE';
export type ApiResponse<Model = Object> = {
  data: Model;
  error?: Partial<Object & { message: string }>;
};

export type ApiUploadResponse = {
  success: number;
  file: {
    filename: string;
    url: string;
  };
};

export type ApiRequest = {
  endpoint: string;
  method?: ApiMethod;
  data?: object;
  headers?: object;
  requestOrigin?: boolean;
};

export const apiReq = async <Model = object>({ endpoint, method = 'GET', data, headers }: ApiRequest): Promise<ApiResponse<Model>> => {
  return axios.request<any, ApiResponse<Model>>({
    method: method,
    url: `${apiHost}${endpoint}`,
    data,
    headers
  });
};

// Simple wrapper around apiReq, adds JWT token to headers
export const apiReqWithAuth = async <Model = object>({
  endpoint,
  method = 'GET',
  data,
  headers
}: ApiRequest): Promise<ApiResponse<Model>> => {
  const token = window.localStorage.getItem('token');

  if (!token) {
    return { data: {} as Model, error: { message: 'No auth token in client' } };
  }

  const _headers = {
    ...headers,
    Authorization: `Bearer ${token}`
  };

  return apiReq({ endpoint, method, data, headers: _headers });
};

export enum RequestOrigin {
  Browser,
  NextBackend
}

class BaseRemoteApi {
  apiHost: string;
  mockApi: boolean;
  constructor(requestOrigin: RequestOrigin, mockApi = false) {
    let apiHost = process.env.NEXT_PUBLIC_API_URL;

    if (requestOrigin === RequestOrigin.NextBackend) {
      if ((isProdEnv && !isBuild) || !isProdEnv) {
        apiHost = process.env.BACKEND_API_URL;
      }
    }

    this.apiHost = apiHost;
    this.mockApi = mockApi;
  }

  apiReq = async <Model = object>({ endpoint, method = 'GET', data, headers }: ApiRequest): Promise<ApiResponse<Model>> => {
    return axios.request<any, ApiResponse<Model>>({
      method: method,
      url: `${this.apiHost}${endpoint}`,
      data,
      headers
    });
  };

  // Simple wrapper around apiReq, adds JWT token to headers
  apiReqWithAuth = async <Model = object>({ endpoint, method = 'GET', data, headers }: ApiRequest): Promise<ApiResponse<Model>> => {
    const token = window.localStorage.getItem('token');

    if (!token) {
      return { data: {} as Model, error: { message: 'No auth token in client' } };
    }

    const _headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    };

    return apiReq({ endpoint, method, data, headers: _headers });
  };
}

export class RemoteApi extends BaseRemoteApi {
  constructor(requestOrigin: RequestOrigin = RequestOrigin.Browser, mockApi = false) {
    super(requestOrigin, mockApi);
  }

  getSiteSettings = async (): Promise<SiteSettings> => {
    const res = await this.apiReq<{ data: any }>({ endpoint: GET_SITE_SETTINGS });

    const siteSettings = reduceSiteSettings(res);

    return {
      ...siteSettings
    };
  };
}

export class BlogApi extends BaseRemoteApi {
  constructor(requestOrigin: RequestOrigin = RequestOrigin.Browser, mockApi = false) {
    super(requestOrigin, mockApi);
  }

  getBlogs = async (): Promise<Blog[]> => {
    const res = await this.apiReq<any[]>({ endpoint: LIST_BLOG() });

    const blogs = reduceBlogs(res.data);

    return blogs;
  };

  getBlog = async (slugOrId: string): Promise<Blog> => {
    const res = await this.apiReq<any>({ endpoint: GET_BLOG(slugOrId) });

    const blog = reduceBlog(res.data);

    // return projects;
    return blog;
  };

  saveBlog = async (data: any, blogId: string): Promise<Blog> => {
    let endpoint = LIST_BLOG();
    let method: ApiMethod = 'POST';

    // update values if blog id is not empty, ie. is existing blog
    if (blogId !== '') {
      endpoint = GET_BLOG(blogId);
      method = 'PUT';
    }

    // ensure never send id with data
    delete data.id;

    // make request
    const res = await this.apiReqWithAuth<any>({ endpoint, method, data });

    return res.data;
  };

  deleteBlog = async (blogId: string): Promise<object> => {
    const res = await this.apiReqWithAuth<any>({ endpoint: GET_BLOG(blogId), method: 'DELETE' });

    return res.data;
  };
}

export class ProjectApi extends BaseRemoteApi {
  constructor(requestOrigin: RequestOrigin = RequestOrigin.Browser, mockApi = false) {
    super(requestOrigin, mockApi);
  }

  getProjects = async (): Promise<Project[]> => {
    const res = await this.apiReq<any[]>({ endpoint: LIST_PROJECT() });

    const projects = reduceProjects(res.data);

    return projects;
  };

  getProject = async (slugOrId: string): Promise<Project> => {
    const res = await apiReq<any[]>({ endpoint: GET_PROJECT(slugOrId) });

    const project = reduceProject(res.data);

    return project;
  };

  saveProject = async (data: any, projectId: string): Promise<Project> => {
    let endpoint = LIST_PROJECT();
    let method: ApiMethod = 'POST';

    // update values if project id is not empty, ie. is existing project
    if (projectId !== '') {
      endpoint = GET_PROJECT(projectId);
      method = 'PUT';
    }

    // ensure never send id with data
    delete data.id;

    // make request
    const res = await this.apiReqWithAuth<any>({ endpoint, method, data });

    return res.data;
  };

  deleteProject = async (projectId: string): Promise<object> => {
    const res = await this.apiReqWithAuth<any>({ endpoint: GET_PROJECT(projectId), method: 'DELETE' });

    return res.data;
  };

  getTags = async (): Promise<string[]> => {
    const res = await this.apiReq<{ tags: string[] }>({ endpoint: LIST_TAGS });

    return res.data.tags;
  };
}

export class UploadApi extends BaseRemoteApi {
  constructor(requestOrigin: RequestOrigin = RequestOrigin.Browser, mockApi = false) {
    super(requestOrigin, mockApi);
  }

  uploadFile = async (file: File): Promise<ApiUploadResponse> => {
    const endpoint = `/api/upload`;

    var formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);

    const res = await this.apiReq<{ filename: string; url: string }>({
      method: 'POST',
      endpoint,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return {
      success: 1,
      file: {
        filename: res.data.filename,
        url: res.data.url
      }
    };
  };

  getInitialFile = async (filename: string, url: string): Promise<DropzoneFileUpload> => {
    const blob = await fetch(url, { mode: 'no-cors' }).then((r) => r.blob());
    const file = new File([blob], filename);

    Object.assign(file, {
      preview: URL.createObjectURL(file),
      url: url
    });

    return { files: [file], error: '' };
  };
}
