import { FC } from 'react'
import { Backdrop, Box, Divider, Fade, Modal, Typography } from '@mui/material'
import { useAppSelector } from '../../../../redux-store/hooks'
import { selectBooking } from '../../../../redux-store/bookingsSlice'
import { priceFormatter } from '../../../../utils/priceFromatter'
import { LineBox } from '../Table.styled'
import Table from '../Table'
import { useOverlaps } from './ModalWindow.hooks'
import { LeftBox, modalStyles } from './ModalWindow.styled'


interface IModalProps {
  modalOpened: boolean
  handleClose: () => void
  bookingInViewId: string
}

const ModalWindow: FC<IModalProps> = ({ modalOpened, handleClose, bookingInViewId }: IModalProps) => {

  const bookings = useAppSelector(selectBooking)

  const {
    overlaps,
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
          <LeftBox>
            <Typography component="h2" fontWeight='600' >
              Гость: &nbsp;
            </Typography>
          </LeftBox>
          <Typography component="h2" >
            {currentItem?.guest}
          </Typography>
        </LineBox>
        <Divider />
        <LineBox>
          <LeftBox>
            <Typography fontWeight='600' >
              Информация: &nbsp;
            </Typography>
          </LeftBox>
          <Typography>
            {currentItem.note}
          </Typography>
        </LineBox>
        <Divider />
        <LineBox>
          <LeftBox>
            <Typography fontWeight='600' >
              Общая стоимость проживания: &nbsp;
            </Typography>
          </LeftBox>
          <Typography >
            {priceFormatter(currentItem.price)}
          </Typography>
        </LineBox>

        {
          !!overlaps.length &&
          <>
            {
              !!overlaps.length ?
                <>
                  <Divider />
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