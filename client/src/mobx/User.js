import {makeAutoObservable} from "mobx"

export default class User {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    getIsAuth() {
        return this._isAuth
    }



    SetIsAuth(bool) {
        this._isAuth = bool
    }

    getUser() {
        return this._user
    }

    setUser(user){
        this._user = user
    }
}