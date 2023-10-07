import { FC, useState } from 'react'
import { IBooking } from '../../../types/types'
import { Button, List } from '@mui/material'
import ModalWindow from './ModalWindow/ModalWindow'
import { useModal } from './Table.hooks'
import { useAppDispatch } from '../../../redux-store/hooks'
import { fetchDeleteBooking } from '../../../redux-store/bookingsSlice'
import { HeadBox } from './Table.styled'
import TableLine from './TableLine/TableLine'


interface ITableProps {
  items: IBooking[]
  clickable?: boolean
}

const Table: FC<ITableProps> = ({ items, clickable = true }: ITableProps) => {

  const dispatch = useAppDispatch()
  const [chosen, setChosen] = useState<string[]>([])

  const { modalOpened, bookingInViewId, handleClose, handleOpen } = useModal()

  const handleDelete = () => {
    dispatch(fetchDeleteBooking({ ids: chosen }))
    setChosen([])
  }

  return <>
    <HeadBox>
      <Button variant='outlined' color='error' onClick={handleDelete} disabled={!chosen.length}>удалить ({chosen.length})</Button>
    </HeadBox>

    <List>

      {bookingInViewId &&
        <ModalWindow modalOpened={modalOpened} handleClose={handleClose} bookingInViewId={bookingInViewId} />
      }

      {
        items.map((booking) => (
          <TableLine key={booking._id}
            booking={booking}
            checked={chosen.includes(booking._id)}
            handleCheck={() => chosen.includes(booking._id) ? setChosen(chosen.filter(el => el !== booking._id)) : setChosen([...chosen, booking._id])}
            handleOpen={() => clickable && handleOpen(booking._id)}
          />
        ))
      }

    </List>
  </>
}

export default Table