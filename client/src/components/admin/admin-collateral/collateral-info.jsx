import { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import { useNavigate, useParams } from "react-router";
import Spreadsheet from "react-spreadsheet";
import { getCollateralHandle } from "../../../http/collateralAPI";
import { ADMIN_PAGE } from "../../../utils/consts";

export const CollateralInfo = () => {
    const navigate = useNavigate()
    const admin_price = require('./admin_price.json')
    const param = useParams()
    const [sheet, setSheet] = useState([])
    const [columnLabels, setColumnLabels] = useState(["Номер заявки", "Объект", "Этап/Часть", "Наименование", "Ед", "Кол-во", "Цена", "Цена бюджет", "Маржа за ед","Маржа общая"])
    useEffect(() => {
        getCollateralHandle(param.id).then(data => {
            let total_margin = 0.0
            let res = data.items.map(item => {
                let current_item = admin_price.filter(adm_price => item.title === adm_price.title)
                let item_margin = (parseFloat(replacer(current_item[0].sell_price)) - parseFloat(replacer(current_item[0].buy_price)))
                total_margin = total_margin + item_margin
                return [
                    { value: parseInt(param.id) + 1 },
                    { value: data.building }, { value: '' },
                    { value: item.title },
                    { value: item.type },
                    { value: item.value, },
                    { value: current_item[0].buy_price },
                    { value: current_item[0].sell_price },
                    {value: item_margin},
                    { value: item_margin *  parseFloat(item.value) },
                ]
            })
            res.push(
                [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '', className: 'date' }, { value: `Итого: ${total_margin}` }]
            )
            setSheet(res)
        })
    }, [param.id])

    const replacer = (str) => {
        let res = str.replace(',', '.')
        res = res.replace(/\s/g, '')
        console.log(res)
        return res
    }
    const addRowHandler = () => {
        setSheet([...sheet, [{ value: '' }]])
    }
    const addColumnHandler = () => {
        setColumnLabels([...columnLabels, 'Новая колонка'])
    }
    return (
        <Container className="" fluid='fluid'>
            <div>
                <Button className="m-1" onClick={() => { navigate(ADMIN_PAGE) }} variant="secondary"><i class="bi bi-arrow-bar-left"></i>Назад</Button>
                <Button className="m-1" onClick={() => addRowHandler()}>Добавить строку</Button>
                <Button className="m-1" onClick={() => addColumnHandler()}>Добавить колонку</Button>
            </div>

            <Spreadsheet
                data={sheet}
                onChange={setSheet}
                columnLabels={columnLabels}
            />
        </Container>
    )
}