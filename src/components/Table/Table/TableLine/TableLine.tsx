import { FC } from 'react'
import { Box, Checkbox, Divider, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { IBooking } from '../../../../types/types'
import DatesBlock from '../DatesBlock/DatesBlock'

interface ITableLineProps {
    booking: IBooking
    checked: boolean
    handleCheck: () => void
    handleOpen?: (arg: string) => void
}

const TableLine: FC<ITableLineProps> = ({ booking, checked, handleCheck, handleOpen }: ITableLineProps) => {


    return <>
        <ListItem
            key={booking._id}
            secondaryAction={
                <Checkbox
                    edge="end"
                    onChange={handleCheck}
                    checked={checked}
                />
            }
            disablePadding
        >
            <ListItemButton sx={{ display: 'flex' }}
                onClick={() => handleOpen && handleOpen(booking._id)}>
                <ListItemText sx={{ flex: 2 }}
                    primary={<>
                        <Box sx={{ marginRight: '20px' }}>
                            <Typography color='GrayText' variant='subtitle1' fontWeight='600'>
                                комната {booking.roomNumber}</Typography>
                        </Box>
                        <Typography variant='body2'>бронь от {booking?.createdAt && new Date(booking?.createdAt).toLocaleDateString()}</Typography>
                        <Divider orientation='vertical' variant='fullWidth' />
                    </>}
                />
                <ListItemText sx={{ flex: 5 }}
                    primary={
                        <Box>
                            <Typography color='#1565C0' >{booking.guest}</Typography>
                        </Box>
                    }
                    secondary={<DatesBlock startDate={booking.startDate} daysOfReservation={booking.daysOfReservation} />} />
            </ListItemButton>
        </ListItem>
        <Divider variant="fullWidth" component="li" />
    </>
}

export default TableLine