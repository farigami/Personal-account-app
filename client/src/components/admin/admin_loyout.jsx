import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Container from "react-bootstrap/esm/Container"
import './admin.scss'
import { UsersList } from './admin-users/users-list';

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
                    <UsersList />
                </Tab>
                <Tab eventKey="objects" title="Объекты">
                    Tab content for Profile
                </Tab>
                <Tab eventKey="collateral" title="Заявки обеспечения">
                    Tab content for Loooonger Tab
                </Tab>
            </Tabs>
        </Container>
    )
}