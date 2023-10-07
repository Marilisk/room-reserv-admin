import { Box, styled, Paper } from "@mui/material";


export const HeadBox = styled(Box)({
    margin: '16px',
    marginBottom: '0',
    display: 'flex',
    justifyContent: 'flex-end',
}) as typeof Box


export const LineBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    margin: '10px'
}) as typeof Box

export const LoaderBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
    height: '80px',
    width: '100%',
}) as typeof Box

export const TablePaper = styled(Paper)({
    width: '68%',
    '@media (max-width: 990px)': {
        width: '90%',
    }
}) as typeof Box

export const HeaderPaper = styled(Paper)({
    width: '68%',
    margin: '20px 0',
    padding: '30px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 990px)': {
        width: '90%',
    },
    '@media (max-width: 750px)': {
        display: 'block',
    },
}) as typeof Box




