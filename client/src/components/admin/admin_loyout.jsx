import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Container from "react-bootstrap/esm/Container"
import './admin.scss'
import { AdminUsersList } from './admin-users/users-list';
import { CollatealList } from './admin-collateral/collateral-list';
import { BuildingList } from './admin-building/building-list';
import { useState } from 'react';

export const AdminLoyout = () => {
    const [activity, setActivity] = useState('users')
    return (
        <Container className="admin">
            <Tabs
                defaultActiveKey={activity}
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="users" onClick={() => setActivity('users')} title="Пользователи">
                    <AdminUsersList />
                </Tab>
                <Tab eventKey="objects" onClick={() => setActivity('objects')} title="Объекты">
                    <BuildingList />
                </Tab>
                <Tab eventKey="collateral" onClick={() => setActivity('collateral')} title="Заявки обеспечения">
                    <CollatealList />
                </Tab>
            </Tabs>
        </Container>
    )
}