'use client';

import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ja');

interface FormattedDateProps {
  date: string;
}

export default function FormattedDate({ date }: FormattedDateProps) {
  return (
    <Typography variant="caption" color="text.secondary">
      {dayjs(date).fromNow()}
    </Typography>
  );
} 