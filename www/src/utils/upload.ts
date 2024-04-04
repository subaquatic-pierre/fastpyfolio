import axios from 'axios';
import { WWW_HOST } from 'config';
import { DashboardApiResponse } from 'types/api';
import { DropzoneFileUpload } from 'types/dropzone';

export const uploadByFile = async (file: File) => {
  const endpoint = `${WWW_HOST}/api/upload`;

  var formData = new FormData();
  formData.append('file', file);
  formData.append('filename', file.name);

  const res = await axios.request<any, DashboardApiResponse>({
    method: 'POST',
    url: endpoint,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return {
    success: 1,
    file: {
      url: res.data.data.url
    }
  };
};

export const uploadByUrl = (url: string) => {
  return {
    success: 1,
    file: {
      url: 'https://codex.so/upload/redactor_images/o_80beea670e49f04931ce9e3b2122ac70.jpg'
      // any other image data you want to store, such as width, height, color, extension, etc
    }
  };
};

export const getInitialFile = async (filename: string, url: string): Promise<DropzoneFileUpload> => {
  const blob = await fetch(url, { mode: 'no-cors' }).then((r) => r.blob());
  const file = new File([blob], filename);

  Object.assign(file, {
    preview: URL.createObjectURL(file),
    url: url
  });

  return { files: [file], error: '' };
};
