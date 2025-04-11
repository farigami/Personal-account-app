import { useNavigate, useParams } from "react-router"
import { ADMIN_PAGE } from "../../../utils/consts"
import { Button, Container, Dropdown, Spinner } from "react-bootstrap"
import './building.scss'
import { useContext, useEffect, useState } from "react"
import { getBuildingHandle, getBuildingStages, getCustomersHandle, getPhotoReport, sendPhotoReport, setCustomerHandle } from "../../../http/adminAPI"
import { Alert } from 'react-bootstrap';
import { Context } from "../../.."
import { observer } from "mobx-react-lite"




export const BuildingInfo = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const param = useParams()
    const [loading, setLoading] = useState(true)
    const [userLoading, setUserLoading] = useState(true)
    const [photoReportsLoading, setPhotoReportsLoading] = useState(true)
    const [buildingStagesLoading, setBuildingStagesLoading] = useState(true)

    const [buildingStage, setBuildingStage] = useState('')
    const [buildingStages, setBuildingStages] = useState([])
    const [photoReports, setPhotoReports] = useState([])
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    const [notificationCustomer, setNotificationCustomer] = useState(false)
    const [building, setBuilding] = useState()
    const [newCustomer, setNewCustomer] = useState(false)
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        getBuildingHandle(param.id).then(data => {
            setBuilding(data)
            getBuildingStages(data.id).then(data => {
                setBuildingStages(data)
                setLoading(false)
                setBuildingStagesLoading(false)

            })
            getPhotoReport(data.id).then(data => {
                setPhotoReports(data)
                setPhotoReportsLoading(false)
            }
            )


        })
        getCustomersHandle().then(data => {
            setCustomers(data)
            setUserLoading(false)
        })
    }, [param.id, files])


    const addCustomerHandle = () => {
        setCustomerHandle(newCustomer.id, building.id).then(data => {
            setNotificationCustomer(
                <Alert variant='success' style={{ fontSize: '14px' }}>
                    Клиент успешно изменен
                </Alert>
            )
        })

    }

    const addPhotoReport = () => {
        if (!buildingStage) {
            alert('Выберете этап')
            return
        }
        const formData = new FormData()
        files.forEach(file => {
            formData.append('files', file)
        })
        formData.append('task_id', buildingStage.id)
        sendPhotoReport(formData).then(data => {
            setFiles([])
            setPreviews([])
        }
        )
    }

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

    const getCustomer = (customer_id) => {
        const currrent_customer = customers.filter(customer => customer.id === customer_id)[0]
        return `${currrent_customer.first_name} ${currrent_customer.last_name} ${currrent_customer.patronymic}`
    }

    if (loading) { return (<Spinner className="m-4" animation="border" variant="success"></Spinner>) }
    return (
        <Container className="mb-2">
            <Button className="m-1" onClick={() => { navigate(ADMIN_PAGE) }} variant="secondary"><i className="bi bi-arrow-bar-left"></i>Назад</Button>
            <div className="building">
                <div className="building__title">Объект: {building.value} <span>{building.parent_id === 1 ? 'Леском' : 'Элитсрой'}</span></div>
                <div className="building__content">
                    <div className="building__content__section">
                        <div className="building__content__choose m-1">
                            {!userLoading ?
                                <>
                                    <div className="d-flex">
                                        <div>Заказчик:</div>
                                        <Dropdown className="ms-2" >
                                            <Dropdown.Toggle variant='variant'>
                                                {building.meta_data === null && !newCustomer && 'Выберете пользователя'}
                                                {building.meta_data && !newCustomer && getCustomer(building.meta_data.customer)}
                                                {newCustomer && newCustomer.first_name}
                                            </Dropdown.Toggle>
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


                                    </div>

                                    {notificationCustomer && notificationCustomer}
                                    <Button
                                        className="m-1"
                                        variant="success"
                                        onClick={() => addCustomerHandle()}
                                    >Сохранить изменения</Button>
                                </>
                                :
                                <Spinner className="m-4" animation="border" variant="success"></Spinner>

                            }
                        </div>

                    </div>
                    <div className="building__content__estimate m-1">
                        <span>Смета не загружена</span>
                        <input type="file" />
                    </div>
                    <div className="building__content__photo m-1">
                        <p>Загрузка фотоотчёта</p>
                        {files.length ?
                            <Dropdown className="ms-2" >
                                <Dropdown.Toggle variant='variant'>{!buildingStage ? 'Выбор этапа' : buildingStage.value}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {buildingStages.map((stage, index) => {
                                        return (
                                            <Dropdown.Item key={index} onClick={() => { setBuildingStage(stage) }}>
                                                {stage.value}
                                            </Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                            : null}
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
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                        {files.length ? <hr /> : null}
                        <label for="files" className="btn">Перенесите изображения<i style={{ 'position': 'absolute', 'transform': 'translateY(10px) rotate(90deg)' }} className="bi bi-arrow-90deg-right"></i></label>
                        <input
                            id="files" style={{ "opacity": "0", "width": "100%" }}
                            type="file"
                            onChange={handleFileChange}
                            multiple
                        />
                        {files.length ? <Button onClick={() => { addPhotoReport() }}>Загрузить Фотоотчёт</Button> : null}
                    </div>
                    <div className="building__content__loaded">
                        <div className="building__content__loaded__title">Загруженные фотоотчёты</div>
                        <hr />
                        {photoReportsLoading ?
                            <Spinner className="m-4" key={1} animation="border" variant="success"></Spinner> :
                            <div className="building__content__loaded__images" key={photoReports.length}>
                                {photoReports.map((item) => {
                                    return (
                                        <div className="m-1 p-1" style={{ border: '2px dashed #294e47' }}>
                                            <div
                                                key={item.id}
                                                className="building__content__loaded__images__stages"
                                            >
                                                {buildingStagesLoading ?
                                                    <Spinner size="sm" animation="border" variant="success"></Spinner> :
                                                    buildingStages.filter(stage => stage.id === item.task_id)[0].value
                                                }
                                            </div>
                                            {item.meta_data && item.meta_data.photo.map((photo, index) => {
                                                return (
                                                    <img
                                                        key={index}
                                                        className="m-1"
                                                        src={process.env.REACT_APP_API_URL + photo}
                                                        alt="preview"
                                                        width="200"
                                                        height="200"
                                                        style={{ borderRadius: "6px" }}
                                                    />
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>

            </div>
        </Container>
    )
})