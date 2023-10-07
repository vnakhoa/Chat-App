import React from 'react'
import SidebarHeader from './SidebarHeader'
import SidebarListUser from './SidebarListUser'

import { Row, Col } from 'antd'

function Sidebar() {
    return (
        <>
            <Row style={{ padding: ' 20px 0', borderBottom: '1px solid #fff', height: '10vh' }}>
                <SidebarHeader />
            </Row>
            <Row style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px', height: '90vh' }}>
                <SidebarListUser />
            </Row>


        </>
    )
}

export default Sidebar