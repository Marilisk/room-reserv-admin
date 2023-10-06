import { FC } from 'react'
import { Box, Typography } from '@mui/material'

interface IDatesBlockProps {
    daysOfReservation: string
    startDate: number
}


const DatesBlock: FC<IDatesBlockProps> = ({ daysOfReservation, startDate }: IDatesBlockProps) => {
    return (
        <Box sx={{display: 'flex'}}>
            <Typography variant='body2'>{daysOfReservation} дней:&nbsp; </Typography>
            <Typography variant='body2'>{new Date(startDate).toLocaleDateString()}</Typography> -
            <Typography variant='body2'>{new Date(startDate + (Number(daysOfReservation) * 86400000)).toLocaleDateString()}</Typography>
        </Box>
    )
}

export default DatesBlock
