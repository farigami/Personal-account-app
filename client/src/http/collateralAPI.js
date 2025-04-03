import { $authHost } from "."

export const createCollateralHandle = async (current_data) => {
    console.log(current_data)
    const { data } = await $authHost.post('/users/collateral/create', current_data)
    return data
}


export const getCollateralsHandle = async () => {
    const { data } = await $authHost.get('/users/collateral/get_all')
    return data
}

export const getCollateralHandle = async (collateral_id) => {
    const { data } = await $authHost.get(`/users/collateral/get/${collateral_id}`)
    return data
}