import Container from "react-bootstrap/esm/Container"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import example from '../../../static/image.png'
import './photo-report.scss'
export const PhotoReport = () => {
    const images = [example, example, example]
    return (
        <Container className="photo-report">
            <div className="photo-report__title">Фотоотчёты</div>
            <div className="photo-report__filter">
                <button className="selected">Всё</button>
                <button>Фундаментные работы</button>
                <button>Сборка дома</button>
            </div>
            <PhotoProvider>
            <div className="foo">
                {images.map((item, index) => (
                <PhotoView key={index} src={item}>
                    <img src={item} alt="" />
                </PhotoView>
                ))}
            </div>
            </PhotoProvider>
        </Container>
    )
}