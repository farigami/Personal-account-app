import Container from "react-bootstrap/esm/Container"
import { useState } from "react";
import './collateral.scss'




export const CollateralApplication = () => {
    const items = require('./data.json')
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

    return (
        <Container className="collateral" fluid='fluid'>
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
                    <button className="collateral-selected__send">Отправить заявку</button>
                </div>
                : null
            }
            <input
                className="collateral__search"
                type="text"
                placeholder="Поиск"
                onChange={e => ItemsSearchHandler(e.target.value)}>

            </input>
            <button className="collateral__button__add" onClick={() => { }}>Добавить свой материал</button>
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