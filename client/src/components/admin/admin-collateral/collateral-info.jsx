import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useParams } from "react-router";
import Spreadsheet from "react-spreadsheet";
import { getCollateralHandle } from "../../../http/collateralAPI";

export const CollateralInfo = () => {
    const param = useParams()
    const [sheet, setSheet] = useState([])
    const columnLabels = ["Номер заявки", "Объект", "Этап/Часть", "Наименование", "Ед", "Кол-во"];
    useEffect(() => {
        getCollateralHandle(param.id).then(data=> {
            let res = data.items.map(item => {
                return [{value: parseInt(param.id) + 1}, {value: data.building},{value: ''}, {value: item.title}, {value: item.type}, {value: item.value},]
            })
            setSheet(res)
        })
    }, [param.id])
    return (
        <Container>
            <Spreadsheet
                data={sheet}
                columnLabels={columnLabels}
            />
        </Container>
    )
}