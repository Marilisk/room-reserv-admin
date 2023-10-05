import { Box, Tab, Tabs } from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { pages } from './router/pages';


function App() {

  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Box sx={{ margin: '50px auto', background: 'background.paper', display: 'flex', flexDirection: 'column', alignItems: 'center' }}  >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: '50px' }} >
        <Tabs value={location.pathname} centered >
          {
            pages.map((page, i) => (
              <Tab key={i} label={page.value} value={page.link}
                onClick={() => navigate(page.link)} />
            ))
          }
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  )
}

export default App
