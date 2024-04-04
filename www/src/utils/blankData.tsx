import { User } from 'models/auth';
import { Box } from '@mui/material';
import { Seo } from 'models/settings';
import { Blog } from 'models/blog';

const defaultFileUrl = `/images/avatar-group.png`;

export const blankProfileFiles = {
  profilePic: {
    filename: 'defaultProfilePic',
    url: defaultFileUrl
  },
  passportPhoto: {
    filename: 'defaultProfilePic',
    url: defaultFileUrl
  },
  idImage: {
    filename: 'defaultIdImage',
    url: defaultFileUrl
  }
};

export const blankUser: User = {
  id: 0,
  username: 'user',
  email: 'email@email.com',
  verified: true,
  disabled: false,
  createdAt: '',
  updatedAt: '',
  role: 'admin'
};

export const blankSeo: Seo = {
  title: '',
  description: '',
  image: '',
  metaTags: []
};

export const blankBlog: Blog = {
  id: -1,
  title: '',
  slug: '',
  description: '',
  content: {},
  createdAt: '2024-02-29T09:07:33.919Z',
  updatedAt: '2024-02-29T09:07:33.919Z',
  author: blankUser,
  seo: blankSeo
};
