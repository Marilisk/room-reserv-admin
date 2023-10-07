import { Outlet } from 'react-router-dom';
import { WrapBox } from './App.styled';
import TabsComponent from './components/Tabs/Tabs';


function App() {

  return (
    <WrapBox>
      <TabsComponent />
      <Outlet />
    </WrapBox>
  )
}

export default App
