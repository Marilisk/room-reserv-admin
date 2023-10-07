import { FC } from 'react'
import { Tab, Tabs, Typography } from '@mui/material'
import { TabBox, TabsBox } from '../../App.styled'
import { pages } from '../../router/pages'
import { useLocation, useNavigate } from 'react-router-dom';


const TabsComponent: FC = () => {

    const location = useLocation()
    const navigate = useNavigate()

    return (
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
    )
}

export default TabsComponent