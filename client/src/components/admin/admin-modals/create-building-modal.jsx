import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import { createBuildingHandle } from "../../../http/adminAPI";

export const CreateBuildingModal = ({ show, onHide }) => {
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
                <Form>
                    <Form.Control
                        name='value'
                        placeholder="Введите название объекта"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => createBuildingHandle().then(data=> {console.log(data)})}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )

}