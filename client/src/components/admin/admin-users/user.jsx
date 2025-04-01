import { useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import Spinner from "react-bootstrap/esm/Spinner"
import { useNavigate, useParams } from "react-router"
import { getUserHandle } from "../../../http/adminAPI"
import Button from "react-bootstrap/esm/Button"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ADMIN_PAGE } from "../../../utils/consts"
import logo from '../../../static/logo_2.svg'



export const AdminUserProfile = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState([])
    useEffect(() => {
        getUserHandle(params.id).then(data => {
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
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Container>
        </>
    )
}