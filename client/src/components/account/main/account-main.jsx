import Container from "react-bootstrap/esm/Container"
import { Link, } from 'react-router';
import './main.scss'
import { ACCOUNT_PROFILE_PAGE, ACCOUNT_NOTIFICATION_PAGE, ACCOUNT_COLLATERAL_PAGE, ACCOUNT_PHOTO_REPORT, ACCOUNT_BUILDING_PAGE, MAIN_PAGE, ADMIN_PAGE, ACCOUNT_DOCUMENTS_PAGE } from "../../../utils/consts";

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from "react";
import { getRolesHandle } from "../../../http/userAPI";
import Spinner from "react-bootstrap/esm/Spinner";
export const AccountMain = observer(() => {
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getRolesHandle().then(data => {
            setRoles(data)
            setLoading(false)
        })
    }, [])
    if (loading) { return (<Spinner className="m-4" animation="border" variant="success"></Spinner>) }
    return (
        <Container className="account-choose">
            <Link className="account-choose__section" to={ACCOUNT_PROFILE_PAGE}>
                <i class="account-choose__section__icon bi bi-person"></i>
                <div className="account-choose__section__title">
                    Личные данные
                    <div className="account-choose__section__title__description">Данные пользователя</div>
                </div>

            </Link>
            {
                (roles.includes(3) || roles.includes(4)) &&
                <Link className="account-choose__section" to={ACCOUNT_COLLATERAL_PAGE}>
                    <i class="account-choose__section__icon bi bi-box-seam"></i>
                    <div className="account-choose__section__title">
                        Заявки обеспечения
                    </div>
                </Link>
            }
            {
                (roles.includes(1) || roles.includes(2)) &&
                <Link className="account-choose__section" to={ACCOUNT_PHOTO_REPORT}>
                    <i class="account-choose__section__icon bi bi-camera"></i>
                    <div className="account-choose__section__title">
                        Фотоотчёт строительства
                        <div className="account-choose__section__title__description">Следите за ходом стройки</div>
                    </div>
                </Link>
            }

            {
                roles.includes(4) &&
                <Link className="account-choose__section" to={ACCOUNT_BUILDING_PAGE}>
                    <i class="account-choose__section__icon bi bi-houses"></i>
                    <div className="account-choose__section__title">
                        Управление объектами
                    </div>
                </Link>
            }
            {
                (roles.includes(1) || roles.includes(2)) &&
                <Link className="account-choose__section" to={ACCOUNT_DOCUMENTS_PAGE}>
                    <i class="account-choose__section__icon bi bi-file-text"></i>
                    <div className="account-choose__section__title">
                        Документы
                        <div className="account-choose__section__title__description">Все документы в одном месте</div>
                    </div>
                </Link>
            }

            <Link className="account-choose__section" to={ACCOUNT_NOTIFICATION_PAGE}>
                <i class="account-choose__section__icon bi bi-card-checklist"></i>
                <div className="account-choose__section__title">
                    Подписки
                    <div className="account-choose__section__title__description">Настройте ваши уведомления</div>
                </div>
            </Link>
            {
                roles.includes(4) &&
                <Link className="account-choose__section" to={ADMIN_PAGE}>
                    <i class="account-choose__section__icon bi bi-menu-app"></i>
                    <div className="account-choose__section__title">
                        Админ панель
                    </div>
                </Link>
            }

        </Container>
    )
})