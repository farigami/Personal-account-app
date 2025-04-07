import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createBuildingHandle } from "../../../http/adminAPI";
import { useState } from "react";

export const CreateBuildingModal = ({ show, onHide }) => {
    const [success, setSuccess] = useState(false)
    const [objectForm, setObjectForm] = useState({
        value: ''
    })
    const createBuildingModalHandle = () => {
        createBuildingHandle(objectForm.value).then(data => {
            setSuccess(true)
        })
    }
    const changeHandler = (event) => {
        setObjectForm({ ...objectForm, [event.target.name]: event.target.value })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление объекта
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!success ?
                    <Form>
                        <Form.Control
                            name='value'
                            placeholder="Введите название объекта"
                            onChange={(e) => {changeHandler(e)}}
                        />
                    </Form>
                    :
                    <div style={{'text-align': 'center'}}>
                        <p><i class="m-auto bi bi-check-circle-fill" style={{ 'font-size': '4rem', 'color': '#294e47' }}></i></p>
                        <p className="h4">Объект успешно создан</p>
                    </div>
                }


            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={() => onHide(true)}>Закрыть</Button>
                {!success && <Button variant="success" onClick={() => createBuildingModalHandle()}>Добавить</Button>}
            </Modal.Footer>
        </Modal >
    )

}