import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { ProjectApi } from 'lib/api';

const mock = ['...', '...', '...', '...', '...', '...', '...', '...'];

interface Props {
  handleTagClick: (tag: string) => void;
  activeTags: string[];
}

const Tags: React.FC<Props> = ({ handleTagClick, activeTags }): JSX.Element => {
  const [tags, setTags] = useState(mock);

  const handleLoad = async () => {
    const api = new ProjectApi();
    const tags = await api.getTags();
    setTags(tags);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        align={'center'}
        sx={{
          fontWeight: 700,
          marginBottom: 2
        }}
      >
        Filter By Tags
      </Typography>
      <Box display={'flex'} flexWrap={'wrap'} justifyContent={'center'}>
        {tags.map((item, idx) => (
          <Chip
            key={idx}
            color={activeTags.indexOf(item) !== -1 ? 'primary' : 'default'}
            onClick={() => handleTagClick(item)}
            label={item}
            clickable
            sx={{ margin: 0.5 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Tags;
