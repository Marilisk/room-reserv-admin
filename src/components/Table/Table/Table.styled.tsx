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

export const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    padding: 4,
}

export const LoaderBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
    height: '80px', 
    width: '100%',
}) as typeof Box

export const TablePaper = styled(Paper)({
    width: '68%'
}) as typeof Box

export const HeaderPaper = styled(Paper)({
    width: '68%',
    margin: '20px 0',
    padding: '30px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
}) as typeof Box




