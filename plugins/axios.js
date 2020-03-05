export default ({ app, router, store, $axios, redirect }) => {
    const token = localStorage.getItem('token')
    console.log(token);
    
    if (token === null) {
        console.log(app.router);
        
        
        app.router.resolveHooks.push('/login')
    }else{
        $axios.setToken(token, 'Bearer')
        store.commit('auth/change', true)
    }
}

// export default ({ store }) => {
//     const token = localStorage.getItem('token')
//     if (token) return 
//     console.log('token: ', token);
    
// }