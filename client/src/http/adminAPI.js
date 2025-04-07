import { $authHost } from "."

export const registerUserHandle = async (user) => {
    try {
        const data = await $authHost.post('/users/register', user)
        if (data.status === 201) {
            return data.data, data.status
        }
        return data
    } catch (e) {
        if (e.status === 409) {
            return { message: 'Пользователь с таким логином уже существует' }
        }
    }

}

export const createBuildingHandle = async (value) => {
    console.log(value)
    const { data } = await $authHost.post('/users/building/create', { value: value })
    return data
}

export const getUsersListHandle = async () => {
    const { data } = await $authHost.get('/users/get')
    return data
}

export const getBuildingListHandle = async () => {
    const { data } = await $authHost.get('users/building/get_all')
    return data
}

export const getRoleTypesHandle = async () => {
    const { data } = await $authHost.get('/users/roles')
    return data
}

export const getUserHandle = async (user_id) => {
    const { data } = await $authHost.get(`/users/get/${user_id}`)
    return data
}