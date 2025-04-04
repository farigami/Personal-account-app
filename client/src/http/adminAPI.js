import { $authHost } from "."

export const registerUserHandle = async (user) => {
    try {
        const data = await $authHost.post('/users/register', user)
        if (data.status === 201) {
            return data.data, data.status
        }
        console.log(data)
        return data
    } catch (e) {
        if (e.status === 409) {
            return { message: 'Пользователь с таким логином уже существует' }
        }
    }

}

export const createBuildingHandle = async () => {
    const {data} = await $authHost.post('/users/building/create', {value: 'Советский'})
}

export const getUsersListHandle = async () => {
    const { data } = await $authHost.get('/users/get')
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