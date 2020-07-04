<template>
  <div class="text-white w-full bg-gray-transparent-90">
    <div class="px-5 flex flex-row leading-10 pt-1">
      <div class="w-full flex hidden md:block">
        <img class="h-4 my-3 bell" src="/icones/notifications-on.svg" alt="browser">
      </div>
      <div class="w-full flex">
        <p class="md:mx-auto text-sm">
          Quinta | 13/12/2020
        </p>
      </div>
      <div class="w-full">
        <div class="absolute flex pr-5 right-0">
          <img class="h-4 mt-2 mx-1 cursor-pointer" :src="bluetooth" alt="bluetooth" @click="bluetoothController">
          <img class="h-4 mt-2 mx-1" src="/icones/wi-fi.svg" alt="wifi">
          <img class="h-4 mt-2 mx-1 cursor-pointer" :src="som" alt="som" @click="soundController">
          <img class="h-4 mt-2 mx-1" :src="bateria" alt="bateria">
          <span class="ml-1 leading-9">{{ time.hours }}:{{ time.minutes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      som: '/icones/sound2.svg',
      bluetooth: '/icones/bluetooth.svg',
      time: {
        hours: '03',
        minutes: '00'
      }
    }
  },
  computed: {
    ...mapGetters('battery', [
      'getBattery'
    ]),
    bateria () {
      switch (this.getBattery) {
        case 4:
          return '/icones/bateria.svg'
        case 3:
          return '/icones/bateria4.svg'
        case 2:
          return '/icones/bateria3.svg'
        case 1:
          return '/icones/bateria2.svg'
        case 0:
          return '/icones/bateria1.svg'
      } return '/icones/bateria1.svg'
    }
  },
  watch: {
    // time: {
    //   handler (val, oldVal) {
    //     console.log('time has changed')
    //     this.$store.commit('setTime', val)
    //   },
    //   deep: true
    // }
  },
  mounted () {
    setInterval(() => {
      let minutes = Number(this.time.minutes)
      let hours = Number(this.time.hours)
      if (minutes < 59) {
        minutes += 1
        if (minutes < 10) {
          this.time.minutes = '0' + minutes.toString()
        } else {
          this.time.minutes = minutes.toString()
        }
      } else {
        minutes = 0
        hours += 1
        this.time.minutes = '0' + minutes.toString()
        this.time.hours = '0' + hours.toString()
      }
    }, 60000)
    setInterval(() => {
      this.$store.commit('battery/loseBattery')
    }, 1200000)
    setTimeout(() => { this.bateria = '/icones/bateria4.svg' }, 500000)
    setTimeout(() => { this.bateria = '/icones/bateria3.svg' }, 1000000)
    setTimeout(() => { this.bateria = '/icones/bateria2.svg' }, 1500000)
    setTimeout(() => { this.bateria = '/icones/bateria1.svg' }, 2000000)
    // absolute black div saying game over or route.push to main menu
  },
  methods: {
    soundController () {
      if (this.som === '/icones/sound2.svg') {
        this.som = '/icones/sound1.svg'
      } else if (this.som === '/icones/sound1.svg') {
        this.som = '/icones/muted.svg'
      } else {
        this.som = '/icones/sound2.svg'
      }
    },
    bluetoothController () {
      if (this.bluetooth === '/icones/bluetooth.svg') {
        this.bluetooth = '/icones/bluetoothOff.svg'
      } else {
        this.bluetooth = '/icones/bluetooth.svg'
      }
    }
  }
}
</script>

<style lang="css">
.bell:hover {
    animation: bellshake .5s cubic-bezier(.36,.07,.19,.97) both;
    cursor: pointer;
}

@keyframes bellshake {
  0% { transform: rotate(0); }
  15% { transform: rotate(5deg); }
  30% { transform: rotate(-5deg); }
  45% { transform: rotate(4deg); }
  60% { transform: rotate(-4deg); }
  75% { transform: rotate(2deg); }
  85% { transform: rotate(-2deg); }
  92% { transform: rotate(1deg); }
  100% { transform: rotate(0); }
}
</style>
