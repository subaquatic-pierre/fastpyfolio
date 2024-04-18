import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

interface Props {
  date: string;
  setDate: (newData: string, key: string) => void;
  dateKey: string;
}

const DatePicker: React.FC<Props> = ({ date, setDate, dateKey }) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(date));

  useEffect(() => {
    setDate(value.toISOString(), dateKey);
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker format="DD/MM/YYYY" value={value} onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
  );
};

export default DatePicker;
