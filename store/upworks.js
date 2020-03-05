export const state = () => ({
    _Data: []
})

export const mutations = {
    update: (state, data) => state._Data = data,
    add: (state, data) => state._Data.push(data),
    delete: (state, _id) => {
        state._Data = state._Data.filter(data => data._id !== _id)
    }
}

export const getters = {
    getData: state => state._Data,
    getOne: state => _id => {
        const data = state._Data.filter(data => data._id === _id)
        return {...data[0]}
    }
}