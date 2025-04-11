import Container from "react-bootstrap/esm/Container"
import './documents.scss'
import { useState } from "react"

const Document = () => {
    return (
        <div className="documents__section__document">
            <div className="documents__section__document__icon"><i class="bi bi-file-earmark"></i></div>
            <div className="documents__section__document__data">
                <div className="documents__section__document__data__title">Договор подряда</div>
                <div className="documents__section__document__data__date">24.03.2024</div>
            </div>
        </div>

    )
}

export const AccountDocuments = () => {
    const [documents, setDocuments] = useState([])
    return (
        <Container className="documents">
            <div className="documents__title">Документы</div>
            {documents.length ?
                <div className="documents__section">
                    <Document></Document>
                    <Document></Document>
                    <Document></Document>
                </div>
                :
                <div className="documents__empty">
                    <i className="bi bi-files"></i>
                    <div className="documents__empty__title">Загруженных документов не найдено</div>
                </div>
            }


        </Container>
    )
}