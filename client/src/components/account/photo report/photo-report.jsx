import Container from "react-bootstrap/esm/Container"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import './photo-report.scss'
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import { getPhotoReport } from "../../../http/userAPI";
import { Spinner } from "react-bootstrap";

export const PhotoReport = observer(() => {
    const { user } = useContext(Context)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getPhotoReport().then(data => {
            setItems(data)
            setLoading(false)
        })
    }, [])
    if (loading) return <Spinner className="m-4" animation="border" variant="success"></Spinner>
    return (
        <Container className="photo-report">
            {items.length ?
                <>
                    <div className="photo-report__title">Фотоотчёты</div>
                    <div className="photo-report__filter">
                        <button className="selected">Всё</button>
                        <button>Фундаментные работы</button>
                        <button>Сборка дома</button>
                    </div>
                    <PhotoProvider>
                        <div className="foo">
                            {items.map(item => (
                                <div className="photo-report__content">
                                    <span>Этап: {item.stage}</span>
                                    {item.meta_data.photo.map((photo, index) => {
                                        return (
                                            <PhotoView key={index} src={process.env.REACT_APP_API_URL + photo}>
                                                <img src={process.env.REACT_APP_API_URL + photo} alt="" />
                                            </PhotoView>
                                        )
                                    })}
                                </div>
                            ))
                            }
                        </div>
                    </PhotoProvider>
                </>
                :
                <div className="photo-report__empty">
                    <i class="bi bi-images"></i>
                    <div className="photo-report__empty__title">Загруженных фотоотчётов не найдено</div>
                </div>
                
    }
        </Container>
    )
})