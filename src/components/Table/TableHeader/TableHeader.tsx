import { FC } from 'react'
import { HeaderPaper } from '../Table/Table.styled'
import { Typography, Stack, Chip } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../redux-store/hooks'
import { sortList } from '../../../redux-store/bookingsSlice'
import { SortParamType } from '../../../types/types'
import { sortTags } from '../../../redux-store/initial'

interface ITableHeaderProps {
    count: number
    setCount: (arg: number) => void
    setSkip: (arg: number) => void
    setViewChanged: () => void
}

const TableHeader: FC<ITableHeaderProps> = ({ count, setCount, setSkip, setViewChanged }: ITableHeaderProps) => {

    const dispatch = useAppDispatch()
    const bookingsCount = useAppSelector(s => s.contracts.bookingsCount)

    const sortBy = useAppSelector(s => s.contracts.sortBy)

    const changeView = (value: number) => {
        setCount(value)
        setSkip(0)
        setViewChanged()
    }

    const handleSort = (param: SortParamType) => {
        dispatch(sortList({ param }))
    }

    return (
        <HeaderPaper>

            <Stack direction="row" spacing={1} alignItems='center' mr={3}>
                <Typography fontSize='small' color='GrayText'>показывать: </Typography>
                <Chip label="Все" onClick={() => changeView(bookingsCount)} variant={count === bookingsCount ? 'filled' : "outlined"} />
                <Chip label="По 5 элементов" variant={count === 5 ? 'filled' : "outlined"} onClick={() => changeView(5)} />
            </Stack>

            <Stack direction="row" spacing={1} alignItems='center' >
                <Typography fontSize='small' color='GrayText'>сортировка: </Typography>
                {sortTags.map((elem, i) => (
                    <Chip key={i}
                        label={elem.label}
                        color={sortBy === elem.value ? 'primary' : 'default'}
                        variant='outlined'
                        onClick={() => handleSort(elem.value)} />
                ))}
            </Stack>

        </HeaderPaper>
    )
}

export default TableHeader