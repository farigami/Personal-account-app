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

export const getBuildingHandle = async (object_id) => {
    const {data} = await $authHost.get(`/building/get/${object_id}`)
    return data
}

export const getCustomersHandle = async () => {
    const {data} = await $authHost.get('/users/customers')
    return data
}

export const setCustomerHandle = async (customer_id, object_id) => {
    const {data} = await $authHost.post('/building/customer', {customer_id: customer_id, object_id: object_id})
    return data
}

export const createBuildingHandle = async (value) => {
    const { data } = await $authHost.post('/building/create', { value: value })
    return data
}

export const getBuildingListHandle = async () => {
    const { data } = await $authHost.get('/building/get_all')
    return data
}

export const getBuildingStages = async (object_id) => {
    const {data} = await $authHost.post('/building/get-stages', {object_id: object_id})
    return data
}

export const sendPhotoReport = async (formData) => {
    const {data} = await $authHost.post('/building/photo-report', formData)
    return data
}

export const getPhotoReport = async (object_id) => {
    const {data} = await $authHost.post('/building/get-photo-reports', {object_id: object_id})
    return data
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