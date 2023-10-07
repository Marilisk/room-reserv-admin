import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { fetchGetBooking } from '../../redux-store/bookingsSlice'
import { Button, CircularProgress, Typography } from '@mui/material'
import Table from './Table/Table'
import { LoaderBox, TablePaper } from './Table/Table.styled'
import TableHeader from './TableHeader/TableHeader'


const TableContainer = () => {

  const dispatch = useAppDispatch()
  const bookings = useAppSelector(s => s.contracts.items)
  const isLoading = useAppSelector(s => s.contracts.loadingStatus === 'loading')
  const isError = useAppSelector(s => s.contracts.loadingStatus === 'error')
  const errMsg = useAppSelector(s => s.contracts.serverMsg)
  const areMoreBookings = useAppSelector(s => s.contracts.bookingsCount > s.contracts.items.length)

  const [count, setCount] = useState(5)
  const [skip, setSkip] = useState(0)

  const loadMore = (rewrite: boolean) => {
    dispatch(fetchGetBooking({ count, skip, rewrite }))
    setSkip(rewrite ? 0 : skip + count)
  }

  useEffect(() => {
    loadMore(true)
  }, [dispatch, count])

  if (isError) return <Typography>{errMsg}</Typography>

  return <>
    <TableHeader count={count} setCount={setCount} setSkip={setSkip} />

    <TablePaper>

      <Table items={bookings} areMoreBookings={areMoreBookings}  />
      {areMoreBookings &&
        <LoaderBox>
          {
            isLoading ? <CircularProgress size={80} /> :
              <Button type='button' variant='contained' onClick={() => loadMore(false)} >загрузить следующие</Button>
          }
        </LoaderBox>
      }
    </TablePaper>
  </>
}

export default TableContainer