import { useNavigate } from "react-router"
import { ACCOUNT_MAIN_PAGE, SIGNIN_PAGE } from "../../utils/consts"
import { useContext, useEffect, useState } from "react"
import { Context } from "../.."
import { observer } from "mobx-react-lite"

export const NotFound = observer(() => {
    const {user} = useContext(Context) 
    const [time, setTime] = useState(3)
    const navigate = useNavigate()
    const tick = () => {
        setTime(time - 1)
        if (time === 0 && user.getIsAuth()){
            navigate(ACCOUNT_MAIN_PAGE)
        }else if(time <= 0 && !user.getIsAuth()){
            navigate(SIGNIN_PAGE)
        }
    }
    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000)
        return () => clearInterval(timerId)
    })
    return (
        <div className="m-auto text-center">
            <div className="h1">Что то пошло не так😅</div>
            <div className="h3">Вы будете перенаправлены на другую страницу через {time} или обновите страницу</div>
        </div>
    )
})