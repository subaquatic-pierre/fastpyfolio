import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  FeaturedArticles,
  FooterNewsletter,
  Hero,
  LatestStories,
  MostViewedArticles,
  PopularNews,
  SidebarArticles,
  SidebarNewsletter,
  Tags,
  SearchBox
} from './components';
import { Blog } from 'models/blog';
import { Button, Chip } from '@mui/material';
import { BlogApi } from 'lib/api';

const mock = ['...', '...', '...'];

interface Props {
  data: Blog[];
}

const defaultCount = 4;
const incAmount = 2;

const BlogNewsroom: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const [blogCount, setBlogCount] = useState(defaultCount);
  const [blogs, setBlogs] = useState<Blog[]>(data.slice(0, defaultCount));
  const [filteredCount, setFilteredCount] = useState(data.length);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);

  const handleLoad = async () => {
    const api = new BlogApi();
    const cats = await api.getCategories();
    setCategories(cats);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const handleMoreClick = () => {
    setBlogCount((old) => old + incAmount);
  };

  const handleCategoryClick = (name: string) => {
    if (name === activeCategory) {
      setActiveCategory(null);
    } else {
      setActiveCategory(name);
    }
  };

  const handleFilterBlogs = (activeCategories: string, projectCount: number) => {
    if (activeCategory) {
      const filtered = data.filter((item) => item.category === activeCategory);
      setFilteredCount(filtered.length);
      setBlogs(filtered.slice(0, blogCount));
    } else {
      setBlogs(data.slice(0, blogCount));
    }
  };

  useEffect(() => {
    handleFilterBlogs(activeCategory, blogCount);
  }, [activeCategory, blogCount]);

  return (
    <>
      <Hero />
      <Container
        sx={{
          marginTop: '-1rem',
          position: 'relative',
          zIndex: 3,
          paddingY: '0 !important'
        }}
      >
        {/* <SearchBox clearActiveCategory={() => setActiveCategory(null)} setData={setBlogs} /> */}
        <Box>
          {categories.map((item) => (
            <Chip
              key={item}
              label={item}
              color={activeCategory === item ? 'primary' : 'default'}
              onClick={() => handleCategoryClick(item)}
              sx={{ margin: 0.5 }}
            />
          ))}
        </Box>
      </Container>
      <Container>
        <PopularNews blogs={blogs} />
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={{ xs: 'center', sm: 'center' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
          my={4}
        >
          <Box display="flex" marginTop={{ xs: 2, md: 0 }}>
            {filteredCount > blogCount && (
              <Box component={Button} onClick={handleMoreClick} variant="outlined" color="primary" size="large" marginLeft={2}>
                Load More
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      <Container maxWidth={800} paddingY={'0 !important'}>
        <Divider />
      </Container>
    </>
  );
};

export default BlogNewsroom;
