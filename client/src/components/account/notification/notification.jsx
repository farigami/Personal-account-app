import Container from "react-bootstrap/esm/Container"
import Form from 'react-bootstrap/Form';

import './notification.scss'

export const Notification = () => {
    return (
        <Container className="notification">
            <div className="notification__title h1">Подписки</div>
            <div className="notification__description h3">Отправлять мне уведомления в Telegram при:</div>
            <Form className="notification__form">
                <Form.Check 
                    
                    type="switch"
                    id="custom-switch"
                    label="Добавление новых фотографий"
                />
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Изменения в документах"
                />
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Получение расчёта этапов строительства"
                />
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Окончание сроков ценовых предложений"
                />
            </Form>
        </Container>
    )
}