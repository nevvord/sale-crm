export default async function({ store, $axios }){
    await $axios
        .get('crm/upworks/get')
        .then(res => {
            store.commit('upworks/update', res.data)
        })
        .catch(err => {
            console.log(err)
        })
}