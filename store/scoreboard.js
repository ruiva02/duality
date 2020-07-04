export const state = () => ({
  score: 0
})

export const mutations = {
  calcScore (state, time) {
    state.score = time
  }
}

export const getters = {
  getScore (state) {
    return state.score
  }
}
