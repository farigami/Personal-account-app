import { $authHost } from "."

export const getUsersListHandle = () => {
    const {data} = $authHost.get('/users/get')
    console.log(data)
}