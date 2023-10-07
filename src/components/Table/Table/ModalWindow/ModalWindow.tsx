import { FC } from 'react'
import { Backdrop, Box, Divider, Fade, Modal, Typography, Button } from '@mui/material'
import { useAppSelector } from '../../../../redux-store/hooks'
import { selectBooking } from '../../../../redux-store/bookingsSlice'
import { priceFormatter } from '../../../../utils/priceFromatter'
import { LineBox, modalStyles } from '../Table.styled'
import Table from '../Table'
import { useOverlaps } from './ModalWindow.hooks'


interface IModalProps {
  modalOpened: boolean
  handleClose: () => void
  bookingInViewId: string
  areMoreBookings: boolean
}

const ModalWindow: FC<IModalProps> = ({ modalOpened, handleClose, bookingInViewId, areMoreBookings }: IModalProps) => {

  const bookings = useAppSelector(selectBooking)

  const {
    overlaps,
    findOverLaps,
    showOverLaps,
  } = useOverlaps(bookingInViewId, bookings)

  const currentItem = bookings.find(el => el._id === bookingInViewId)

  if (!bookingInViewId || !currentItem) return null

  return <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={modalOpened}
    onClose={handleClose}
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
    }}
  >
    <Fade in={modalOpened}>
      <Box sx={modalStyles}>

        <LineBox>
          <Typography variant="h6" component="h2" fontWeight='600' >
            Гость: &nbsp;
          </Typography>
          <Typography variant="h6" component="h2" >
            {currentItem?.guest}
          </Typography>
        </LineBox>
        <Divider />
        <LineBox>
          <Typography fontWeight='600' >
            Информация: &nbsp;
          </Typography>
          <Typography>
            {currentItem.note}
          </Typography>
        </LineBox>

        <Divider />
        <LineBox>
          <Typography fontWeight='600' >
            Общая стоимость проживания: &nbsp;
          </Typography>
          <Typography >
            {priceFormatter(currentItem.price)}
          </Typography>
        </LineBox>

        {!areMoreBookings &&
          <LineBox>
            <Button type='button' variant='contained' sx={{ m: '0 auto' }} onClick={() => findOverLaps()}>
              найти конфликты
            </Button>
          </LineBox>
        }


        {
          showOverLaps &&
          <>
            {
              !!overlaps.length ?
                <>
                  <Typography variant='h5' mt={4} textAlign='center'>Пересекающиеся бронирования:</Typography>
                  <Table items={overlaps} clickable={false} />
                </>
                :
                <Typography variant='h5' mt={4} textAlign='center'>Пересечений не найдено</Typography>
            }
          </>
        }
      </Box>
    </Fade>
  </Modal>
}

export default ModalWindow