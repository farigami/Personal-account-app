import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BuildingCard = () => {
    return (
        <Card style={{ width: '18rem' }} className="m-2">
            <Card.Img variant="top" src="https://belgorodproekt.ru/wp-content/uploads/2015/10/01-1.jpg" />
            <Card.Body>
                <Card.Title>Название объекта</Card.Title>
                <Card.Text>
                    <p style={{'color': 'orange'}}>Дедлайн:12.03.2025</p>
                    Клиент: Иванов Иван
                </Card.Text>
                <Button variant="success">Перейти к объекту</Button>
            </Card.Body>
        </Card>
    )
}

export const Building = () => {
    return (
        <div className="account-building">
            <BuildingCard></BuildingCard>
            <BuildingCard></BuildingCard>
            <BuildingCard></BuildingCard>
            <BuildingCard></BuildingCard>
            <BuildingCard></BuildingCard>
            <BuildingCard></BuildingCard>
        </div>
    )
}