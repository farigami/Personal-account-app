import Container from "react-bootstrap/esm/Container"
import logo from '../../static/logo_2.svg'

import './footer.scss'

export const Footer = () => {
    return (
        <>
        <Container className="footer mt-auto" fluid='xl'>
            <div className="footer__title">
                <img className="footer__title__logo" src={logo} alt="" />
            </div>
            <hr />
            <div className="footer__description">
                <span>Проект компании Леском © 2025</span>
                <span>Разработано в Леском</span>
            </div>
        </Container>
        </>
    )
}