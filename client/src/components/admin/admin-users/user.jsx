import { useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import Spinner from "react-bootstrap/esm/Spinner"
import { useNavigate, useParams } from "react-router"
import { getUserHandle } from "../../../http/adminAPI"
import Button from "react-bootstrap/esm/Button"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ADMIN_PAGE } from "../../../utils/consts"



export const AdminUserProfile = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState([])
    useEffect(() => {
        getUserHandle(params.id).then(data => {
            console.log(data)
            setProfile(data)
            setLoading(false)
        })
    }, [])
    if (loading) { return <Spinner className="m-4" variant="success"></Spinner> }
    return (
        <>
            <Container >
                <Button onClick={() => { navigate(ADMIN_PAGE) }} variant="secondary"><i class="bi bi-arrow-bar-left"></i>Назад</Button>
                <InputGroup className="mt-2">
                    <InputGroup.Text id="basic-addon1">Фамилия:</InputGroup.Text>
                    <Form.Control
                        value={profile.last_name}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                    <InputGroup.Text id="basic-addon1">Имя:</InputGroup.Text>
                    <Form.Control
                        value={profile.first_name}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                    <InputGroup.Text id="basic-addon1">Отчество:</InputGroup.Text>
                    <Form.Control
                    value={profile.patronymic}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="">
                    <InputGroup.Text id="basic-addon1">Номер телефона:</InputGroup.Text>
                    <Form.Control
                        value={profile.phone}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                    <InputGroup.Text id="basic-addon1">Логин:</InputGroup.Text>
                    <Form.Control
                        value={profile.login}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Container>
        </>
    )
}