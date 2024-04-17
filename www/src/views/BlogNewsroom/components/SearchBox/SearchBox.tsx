import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import { Blog } from 'models/blog';
import { BlogApi } from 'lib/api';

interface Props {
  clearActiveCategory: () => void;
  setData: (blogs: Blog[]) => void;
}

const SearchBox: React.FC<Props> = ({ clearActiveCategory, setData }): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchClick = () => {
    const blogApi = new BlogApi();
    // const res = blogApi.search(searchValue);
    clearActiveCategory();
  };

  return (
    <Box>
      <Box padding={2} width={1} component={Card} boxShadow={4} marginBottom={2}>
        <form noValidate autoComplete="off">
          <Box display="flex" alignItems={'center'}>
            <Box width={1} marginRight={1}>
              <TextField
                value={searchValue}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '0 !important'
                  }
                }}
                variant="outlined"
                onChange={(e) => setSearchValue(e.target.value)}
                color="primary"
                size="medium"
                placeholder="Search"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        component={'svg'}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width={24}
                        height={24}
                        color={'primary.main'}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </Box>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <Box>
              <Button
                onClick={handleSearchClick}
                sx={{ height: 54, minWidth: 100, whiteSpace: 'nowrap' }}
                variant="contained"
                color="primary"
                size="medium"
                fullWidth
              >
                Search
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SearchBox;
