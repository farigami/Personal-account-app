import { $authHost } from "."

export const createCollateralHandle = async (current_data) => {
    const { data } = await $authHost.post('/collateral/create', current_data)
    return data
}

export const getCollateralsHandle = async () => {
    const { data } = await $authHost.get('/collateral/get_all')
    return data
}

export const getCollateralHandle = async (collateral_id) => {
    const { data } = await $authHost.get(`/collateral/get/${collateral_id}`)
    return data
}