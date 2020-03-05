export default async function({ store, $axios }){
    await $axios
        .get('store/get')
        .then(res => {
            store.commit('stores/update', res.data.stores)
        })
        .catch(err => {
            console.log(err)
        })
}