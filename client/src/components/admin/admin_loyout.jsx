import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Container from "react-bootstrap/esm/Container"
import './admin.scss'
import { AdminUsersList } from './admin-users/users-list';
import { CollatealList } from './admin-collateral/collateral-list';

export const AdminLoyout = () => {
    return (
        <Container className="admin">
            <Tabs
                defaultActiveKey="users"
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="users" title="Пользователи">
                    <AdminUsersList />
                </Tab>
                <Tab eventKey="objects" title="Объекты">
                    Tab content for Profile
                </Tab>
                <Tab eventKey="collateral" title="Заявки обеспечения">
                    <CollatealList />
                </Tab>
            </Tabs>
        </Container>
    )
}