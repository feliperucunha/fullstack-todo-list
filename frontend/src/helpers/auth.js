import cookie from "js-cookie"

//Usar cookie
export const setCookie = (key, value) => {
    if(window !== 'undefined') {
        cookie.set(key, value, {
            //1 dia
            expires: 1
        })
    }
}

//Apagar cookie
export const removeCookie = key => {
    if(window !== 'undefined') {
        cookie.remove(key, {
            //1 dia
            expires: 1
        })
    }
}

//Cookie token
export const getCookie = key => {
    if(window !== 'undefined') {
        return cookie.get(key)
    }
}

//Armazenar localmente
export const setLocalStorage = (key, value) => {
    if(window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//Apagar localmente
export const removeLocalStorage = key => {
    if(window !== 'undefined') {
        localStorage.removeItem(key)
    }
}

//Autenticar após login
export const authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

//Sair
export const signout = next => {
    removeCookie('token')
    removeLocalStorage('user')
}

//GET informações locais
export const isAuth = () => {
    if(window !== 'undefined') {
        const cookieChecked = getCookie('token')
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}

//Atualizar dados locais
export const updateUser = (response, next) => {
    if (window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data
        localStorage.setItem('user', JSON.stringify(auth))
    }
    next()
}