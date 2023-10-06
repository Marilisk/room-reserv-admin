import { FC, useState } from 'react'
import { IBooking } from '../../../types/types'
import { Box, Button, Checkbox, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
// import { Box, Button, Checkbox, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import ModalWindow from './ModalWindow/ModalWindow'
import { useModal } from './Table.hooks'
import { useAppDispatch } from '../../../redux-store/hooks'
import { fetchDeleteBooking } from '../../../redux-store/bookingsSlice'
import DatesBlock from './DatesBlock/DatesBlock'



interface ITableProps {
  items: IBooking[]

}



const Table: FC<ITableProps> = ({ items }: ITableProps) => {

  const dispatch = useAppDispatch()
  const [chosen, setChosen] = useState<string[]>([])

  const { modalOpened, bookingInViewId, handleClose, handleOpen } = useModal()

  const handleDelete = () => {
    dispatch(fetchDeleteBooking({ ids: chosen }))
  }


  return <>
      <Box mt={2} mr={2} display='flex' justifyContent='flex-end' >
        <Button variant='outlined' onClick={handleDelete} disabled={!chosen.length}>удалить ({chosen.length})</Button>
      </Box>

    <List>

      <ModalWindow modalOpened={modalOpened} handleClose={handleClose} bookingInViewId={bookingInViewId} />

      {
        items.map((booking) => <>

          <ListItem
            key={booking._id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={() => chosen.includes(booking._id) ? setChosen(chosen.filter(el => el !== booking._id )) : setChosen([...chosen, booking._id])}
                checked={chosen.includes(booking._id)}
              />
            }
            disablePadding
          >
            <ListItemButton sx={{ display: 'flex' }}
              onClick={() => handleOpen(booking._id)}>
              <ListItemText sx={{ flex: 2 }}
                primary={<>
                  <Box sx={{ marginRight: '20px' /* border: '1px solid red' */ }}>
                    <Typography color='GrayText' /* textAlign='center' */ variant='subtitle1' fontWeight='600'>
                      комната {booking.roomNumber}</Typography>
                  </Box>
                  <Typography variant='body2'>от {booking?.createdAt && new Date(booking?.createdAt).toLocaleDateString()}</Typography>
                  <Divider orientation='vertical' variant='fullWidth' />
                </>
                }
              />
              <ListItemText sx={{/* border: '1px solid pink', */ flex: 5 }}
                primary={
                  <Box>
                    <Typography /* variant='h6' */>{booking.guest}</Typography>
                  </Box>
                }
                secondary={ <DatesBlock startDate={booking.startDate} daysOfReservation={booking.daysOfReservation} /> } />
            </ListItemButton>
          </ListItem>
          <Divider variant="fullWidth" component="li" />

        </>
        )
      }
    </List>
  </>
}

export default Table