import { Tab, Tabs, Typography } from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { pages } from './router/pages';
import { TabBox, TabsBox, WrapBox } from './App.styled';


function App() {

  const location = useLocation()
  const navigate = useNavigate()

  return (
    <WrapBox>
      <TabsBox>
        <Tabs value={location.pathname} centered >
          {
            pages.map((page, i) => (
              <Tab key={i}
                label={
                  <TabBox>
                    {page.icon}
                    <Typography ml={2} > {page.value}</Typography>
                  </TabBox>
                }
                value={page.link}
                onClick={() => navigate(page.link)} />
            ))
          }
        </Tabs>
      </TabsBox>
      <Outlet />
    </WrapBox>
  )
}

export default App
