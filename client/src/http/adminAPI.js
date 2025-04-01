import { $authHost } from "."

export const getUsersListHandle = async () => {
    const {data} = await $authHost.get('/users/get')
    return data
}

export const getRoleTypesHandle = async () => {
    const {data} = await $authHost.get('/users/roles')
    return data
}

export const getUserHandle = async (user_id) => {
    const {data} = await $authHost.get(`/users/get/${user_id}`)
    return data
}