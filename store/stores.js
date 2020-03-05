export const state = () => ({
    _Data: []
})

export const mutations = {
    update(state, data) {
        state._Data = data
    }
}

export const getters = {
    getData: state => {return state._Data},
    getOne: state => _id => {
        const data = state._Data.filter(data => data._id === _id)
        return {...data[0]}
    }
}