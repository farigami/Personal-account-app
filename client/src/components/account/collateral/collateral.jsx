import Container from "react-bootstrap/esm/Container"
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useState } from "react";
import './collateral.scss'
import { createCollateralHandle } from "../../../http/collateralAPI";



const CollateralSuccess = ({ items }) => {
    return (
        <Container className="collateral mb-4 mt-2" fluid='fluid'>
            <div className="collateral__success">
                <i className="collateral__success__check bi bi-check-circle-fill"></i>
                <div className="collateral__success__title">Заявка обеспечения сформирована</div>
                <Table striped bordered hover className="mt-2 mb-2">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Название</th>
                            <th>Тип</th>
                            <th>Кол-во</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.type}</td>
                                        <td>{item.value}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <Button className="collateral__success__new mt-2 mb-2" onClick={() => { window.location.reload(); }} variant="success">Создать новую заявку обеспечения <i class="bi bi-plus-square"></i></Button>
            </div>

        </Container>
    )
}

export const CollateralApplication = () => {
    const items = require('./data.json')
    const [success, setSuccess] = useState(false)
    const [building, setBuilding] = useState('')
    const [variants, setVariants] = useState([])
    const [selected, setSelected] = useState([])
    const ItemsSearchHandler = (value) => {
        const correct_variants = items.filter((item) => !value.toLowerCase() !== item.title.toLowerCase().startsWith(value))
        setVariants(correct_variants)
    }
    const addSelectHandler = (item) => {
        if (selected.filter(select => select.title === item.title).length) { return }
        setSelected([...selected, item])
    }

    const addValueSelectHandler = (indexE, valueE) => {
        setSelected(selected.map((select, index) => {
            return (
                index === indexE
                    ? { ...select, value: valueE }
                    : select)
        }))
    }

    const deleteSelectHandler = (item) => {
        const correct_selected = selected.filter(select => select.title !== item.title)
        setSelected(correct_selected)
    }

    const sendCollateral = () => {
        var today = new Date();
        var time = String(today.getTime())
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = dd + '.' + mm + '.' + yyyy;
        const current_data = { items: selected, building: building, created_date: today}
        createCollateralHandle(current_data).then(data => { 
            setSuccess(true) 
        })

    }

    if (success) { return <CollateralSuccess items={selected} /> }

    return (
        <Container className="collateral " fluid='fluid'>
            {selected.length ?
                <div className="collateral-selected">
                    {selected.map((select, index) => {
                        return (
                            <div className="collateral-selected__item" key={index}>
                                <div className="collateral-selected__item__title">{select.title}</div>
                                <div className="collateral-selected__item__type">{select.type}</div>
                                <input type="number" onChange={(e) => { addValueSelectHandler(index, e.target.value) }} placeholder={`Введите кол-во ${select.type}`} />
                                <span onClick={() => deleteSelectHandler(select)}><i className="bi bi-trash-fill"></i></span>
                            </div>
                        )

                    })
                    }
                    <Dropdown className="collateral-selected__building" >
                        <Dropdown.Toggle variant='secondary'>{!building ? "Выберите Объект" : `Выбран объект: ${building}`}</Dropdown.Toggle>
                        <Dropdown.Menu>

                            <Dropdown.Item
                                onClick={() => setBuilding('Патрушево')}

                            >
                                Патрушево
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                    <button className="collateral-selected__send" onClick={() => sendCollateral()}>Отправить заявку</button>
                </div>
                : null
            }
            <input
                className="collateral__search"
                type="text"
                placeholder="Поиск"
                onChange={e => ItemsSearchHandler(e.target.value)}>

            </input>
            {
                variants.length ?
                    variants.map((variant, index) => {
                        return (<button key={index} className="collateral__button" onClick={() => addSelectHandler(variant)}>{variant.title}</button>)
                    })
                    : items.map((item, index) => {
                        return (<button key={index} className="collateral__button" onClick={() => addSelectHandler(item)}>{item.title}</button>)
                    })
            }
        </Container>
    )
}