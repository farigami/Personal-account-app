import { useState } from "react"
import { Button } from "react-bootstrap"
import { CreateBuildingModal } from "../admin-modals/create-building-modal"

export const BuildingList = () => {
    const [buildingVisible, setBuildingVisible] = useState(false)
    return (
        <>
            <Button onClick={() => setBuildingVisible(true)}>Создать объект</Button>
            <CreateBuildingModal show={buildingVisible} onHide={() => setBuildingVisible(false)} />
        </>
    )
}