import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IPageTab } from '../types/pages';


export const pages:IPageTab[] = [
  {
    value: 'Список бронирований',
    link: '/',
    icon: <FormatListBulletedIcon />,
  },
  {
    value: 'Новое бронирование',
    link: '/newbooking',
    icon: <AddBoxIcon />,
  },
]