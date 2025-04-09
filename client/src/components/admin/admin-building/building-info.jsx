import { useNavigate, useParams } from "react-router"
import { ADMIN_PAGE } from "../../../utils/consts"
import { Button, Container, Dropdown, Spinner } from "react-bootstrap"
import './building.scss'
import { useEffect, useState } from "react"
import { getBuildingHandle, getCustomersHandle } from "../../../http/adminAPI"

export const BuildingInfo = () => {
    const navigate = useNavigate()
    const param = useParams()
    const [loading, setLoading] = useState(true)
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [building, setBuilding] = useState()
    const [newCustomer, setNewCustomer] = useState()
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        getBuildingHandle(param.id).then(data => {
            setBuilding(data)
            setLoading(false)
        })
        getCustomersHandle().then(data => {
            setCustomers(data)
        })
    }, [param.id])


    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Создание превью для изображений
        const filePreviews = selectedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setFiles((prev) => [...prev, ...selectedFiles]);
        setPreviews((prev) => [...prev, ...filePreviews]);
    };

    const handleRemove = (index) => {
        const updatedFiles = [...files];
        const updatedPreviews = [...previews];

        updatedFiles.splice(index, 1);
        URL.revokeObjectURL(updatedPreviews[index].preview); // очистка памяти
        updatedPreviews.splice(index, 1);

        setFiles(updatedFiles);
        setPreviews(updatedPreviews);
    };

    if (loading) { return (<Spinner className="m-4" animation="border" variant="success"></Spinner>) }
    return (
        <Container>
            <Button className="m-1" onClick={() => { navigate(ADMIN_PAGE) }} variant="secondary"><i class="bi bi-arrow-bar-left"></i>Назад</Button>
            <div className="building">
                <div className="building__title">Объект: {building.value} <span>{building.parent_id === 1 ? 'Леском' : 'Элитсрой'}</span></div>
                <div className="building__content">
                    <div className="building__content__section">
                        <div className="building__content__choose m-1">
                            <div className="d-flex">
                                Заказчик:
                                {
                                    <Dropdown className="ms-2" >
                                        <Dropdown.Toggle variant='variant'>{building.meta_data == null && !newCustomer ? "Выберете клиента" : `${newCustomer.last_name} ${newCustomer.first_name} ${newCustomer.patronymic}`}</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {
                                                customers.map(customer => {
                                                    return (
                                                        <Dropdown.Item
                                                            onClick={() => setNewCustomer(customer)}
                                                        >
                                                            {`${customer.last_name} ${customer.first_name} ${customer.patronymic}`}
                                                        </Dropdown.Item>
                                                    )
                                                })
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }
                            </div>
                            <Button className="m-1 " variant="success">Сохранить изменения</Button>
                        </div>

                    </div>
                    <div className="building__content__estimate m-1">
                        <span>Смета не загружена</span>
                        <input type="file" />
                    </div>
                    <div className="building__content__photo m-1">
                        <p>Загрузка фотоотчёта</p>
                        <Dropdown className="ms-2" >
                            <Dropdown.Toggle variant='variant'>Выбор этапа</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    Фундамент
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    Сборка комплекта
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    Отделка
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    Кровля
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <hr />
                        <div className="building__content__photo__items">
                            {previews.map((item, index) => (
                                <div key={index} className="">
                                    <img
                                        className="m-1"
                                        src={item.preview}
                                        alt="preview"
                                        width="280"
                                        height="250"
                                        style={{ objectFit: "cover", borderRadius: "8px" }}
                                    />
                                    <button
                                        className="building__content__photo__cross"
                                        onClick={() => handleRemove(index)}
                                    >
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <label for="files" class="btn">Перенесите изображения<i style={{'position':'absolute', 'transform': 'translateY(10px) rotate(90deg)' }} class="bi bi-arrow-90deg-right"></i></label>
                        <input
                            id="files" style={{"opacity":"0", "width": "100%"}}
                            type="file"
                            onChange={handleFileChange}
                            multiple
                        />
                    </div>
                </div>

            </div>
        </Container>
    )
}