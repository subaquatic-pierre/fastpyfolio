/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Tags from '../Tags';

const mock = [
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img13.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    title: 'Lorem ipsum dolor sit amet',
    author: {
      name: 'Clara Bertoletti'
    },
    date: '04 Aug'
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img14.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    title: 'Consectetur adipiscing elit',
    author: {
      name: 'Jhon Anderson'
    },
    date: '12 Sep'
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img15.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    title: 'Lorem ipsum dolor sit amet',
    author: {
      name: 'Clara Bertoletti'
    },
    date: '04 Aug'
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img16.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    title: 'Consectetur adipiscing elit',
    author: {
      name: 'Jhon Anderson'
    },
    date: '12 Sep'
  }
];

const SidebarArticles = (): JSX.Element => {
  const theme = useTheme();
  return <></>;
};

export default SidebarArticles;
