import Container from "react-bootstrap/esm/Container"
import './documents.scss'

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
    return (
        <Container className="documents">
            <div className="documents__title">Документы</div>
            <div className="documents__section">
                <Document></Document>
                <Document></Document>
                <Document></Document>
            </div>
        </Container>
    )
}