export const state = () => ({
  battery: 4
})

export const mutations = {
  loseBattery (state) {
    if (state.battery > 0) {
      state.battery--
    }
  }
}

export const getters = {
  getBattery (state) {
    return state.battery
  }
}
