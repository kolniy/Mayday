const redirectUnAuthuser = () => {
    const userInfo = localStorage.getItem('userInfo')
    if(!userInfo){
        location.href = '/'
    }
}

export { redirectUnAuthuser as default }