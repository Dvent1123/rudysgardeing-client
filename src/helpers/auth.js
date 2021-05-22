import cookie from 'js-cookie'

//sets the cookie
export const setCookie = (key, value) => {
    if(window !== 'undefined'){
        cookie.set(key,value, {
            expires: 1
        })
    }
}

//removes the cookie
export const removeCookie = key => {
    cookie.remove(key, {
        expires: 1
    })
}

//gets value of the cookie
export const getCookie = (key) => {
    if(window !== 'undefined'){
        return cookie.get(key)
    }
}

//set local storage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//removing local storage
export const removeLocalStorage = (key) => {
    if(window !== 'undefined'){
        localStorage.removeItem(key)
    }
}

//authenticate user
export const authenticate = (res, next) => {
    setCookie('token', res.data.token)
    setLocalStorage('user', res.data.user)
    next()
}

//check if both the cookie and localstorage are set to authenticate user
export const isAuth = () => {
    if(window !== 'undefined') {
        const cookieChecked = getCookie('token')
        if(cookieChecked) {
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}

export const signout = next => {
    removeCookie('token')
    removeLocalStorage('user')
    next()
}

//for updating user
export const updateUser = (res, next) => {
    if(typeof window !== 'undefined'){
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = res.data
        localStorage.setItem('user', JSON.stringify(auth))
    }
    next()
}