<template>
  <!-- external div to contain the absolute black game over -->
  <div class="text-white w-full bg-gray-transparent-90">
    <div class="px-5 flex flex-row leading-10 pt-1">
      <div class="w-full flex hidden md:block">
        <img class="h-4 my-3 bell" src="/icones/notifications-on.svg" alt="browser">
      </div>
      <div class="w-full flex">
        <p class="md:mx-auto text-sm">
          Quinta | 29/02/2020
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
export default {
  data () {
    return {
      bateria: '/icones/bateria.svg',
      som: '/icones/sound2.svg',
      bluetooth: '/icones/bluetooth.svg',
      time: {
        hours: '03',
        minutes: '00'
      }
    }
  },
  mounted () {
    setInterval(() => {
      let minutes = Number(this.time.minutes)
      let hours = Number(this.time.hours)
      if (minutes < 60) {
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
    setTimeout(() => { this.bateria = '/icones/bateria-3pau.svg' }, 2500)
    setTimeout(() => { this.bateria = '/icones/bateria-2pau.svg' }, 5000)
    setTimeout(() => { this.bateria = '/icones/bateria-1pau.svg' }, 7500)
    setTimeout(() => { this.bateria = '/icones/bateria-morta.svg' }, 10000)
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
