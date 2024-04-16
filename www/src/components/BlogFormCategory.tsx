import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { BlogApi } from 'lib/api';

interface Props {
  value: string;
  setValue: (newValue: string) => void;
}

const BlogFormCategorySelect: React.FC<Props> = ({ value, setValue }) => {
  const [categories, setCategories] = useState([]);

  const handleLoad = async () => {
    const api = new BlogApi();
    const res = await api.getCategories();

    setCategories(res);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={categories}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} placeholder="Category" />}
    />
  );
};

export default BlogFormCategorySelect;
