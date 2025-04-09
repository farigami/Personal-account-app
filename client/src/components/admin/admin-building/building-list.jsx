import { useEffect, useState } from "react"
import { Button, Spinner, Table } from "react-bootstrap"
import { CreateBuildingModal } from "../admin-modals/create-building-modal"
import { getBuildingListHandle } from "../../../http/adminAPI"
import { Link } from "react-router"

export const BuildingList = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [buildingVisible, setBuildingVisible] = useState(false)
    useEffect(() => {
        getBuildingListHandle().then(data => {
            setItems(data)
            setLoading(false)
        })
    }, [buildingVisible])
    if (loading) { return (<Spinner className="m-4" animation="border" variant="success"></Spinner>) }
    return (
        <>
            <Button className="mt-1 mb-1" onClick={() => setBuildingVisible(true)}>Создать объект</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>№ Объекта</th>
                        <th>Название</th>
                        <th>Ссылка</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        return(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.value}</td>
                                <td><Link to={`/admin/building/${item.id}`}>Ссылка</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <CreateBuildingModal show={buildingVisible} onHide={() => setBuildingVisible(false)} />
        </>
    )
}