import { $host, $authHost } from "./index"
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export const loginHandler = async ({ login, password }) => {
    const { data } = await $host.post('users/authorize', { 'login': login, 'password': password })
    Cookies.set('token', data.access_token, { expires: 7 });
    return jwtDecode(data.access_token)
}
export const checkHandler = async () => {
    try {
        const { data } = await $authHost.get('/users/check')
        Cookies.set('token', data[0], { expires: 7 });
        return jwtDecode(data[0])
    } catch (e) {
        return 401
    }
}

export const profileHandler = async () => {
    const { data } = await $authHost.get('/users/profile')
    return data.user
}

export const getRolesHandle = async () => {
    const { data } = await $authHost.get(`/users/role/`)
    return data
}

export const changePasswordHandle = async (password) => {
    const {data} = await $authHost.post('/users/update_password', {password: password})
    return data
}

export const getPhotoReport = async() => {
    const {data} = await $authHost.get('/building/get-photo-reports')
    return data
}