<template>
  <div>
    <div class="absolute w-16 vertical-align-sidenav">
      <div class="bg-gray-transparent-60 text-white py-4 rounded-r-xl w-full">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icons/browser.svg" alt="browser">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icons/noticias.svg" alt="noticias">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icons/fotos.svg" alt="fotos">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icons/reciclagem.svg" alt="reciclagem">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icons/email.svg" alt="email">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icons/chamadas.svg" alt="chamadas">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icons/settings.svg" alt="settings">
      </div>
    </div>
    <transition name="cloud-fade">
      <div v-if="cloud" class="cloud">
        <div class="absolute h-6 w-6 mt-5 ml-4 bg-yellow-500 rounded-full">
          <img src="/icons/alerta.svg" alt="alerta" class="h-6 w-6 mx-auto py-1">
        </div>
        <div class="pt-8 mt-2 px-10 mx-1 mb-2 w-full h-full">
          <div class="flex flex-wrap justify-between leading-4">
            <span class="uppercase font-bold text-black text-xs">
              <span>Noticias</span>
              <span class="text-yellow-500">JN</span>
            </span>
            <img class="w-2 mr-2" src="/icons/fechar.svg" alt="fechar">
          </div>
          <p class="news-text">
            Despejo de moradora exalta ânimos na Ribeira.  A ordem de despejo de Joana Pacheco da casa na Ribeira onde mora com os dois filhos, de oito e 12 anos, foi executada esta sexta-feira de manhã.
          </p>
        </div>
      </div>
    </transition>
    <div v-if="day == 2 && month == 2 && year == 2002" class="relative w-6/12 py-48 h-full mx-auto">
      <div class="w-8/12 float-right bg-gray-transparent-50 h-full">
        a
      </div>
    </div>
    <div class="absolute text-white w-24 h-40 right-0 vertical-align-absolute">
      <div class="bg-gray-transparent-80 pl-2 py-6 h-full w-full rounded-l-full">
        <img class="menu-icon px-4 py-6" src="/icons/lupa.svg" alt="lupa" @click="searching = !searching">
        <transition name="slide-fade">
          <div v-if="searching" class="absolute flex w-56 calendar-container text-2xl">
            <div class="py-5 w-full">
              <div class="w-full cursor-pointer triangle-up" @click="incrementDay" />
              <p class="leading-10 pt-1 text-center bg-black rounded-l-lg">
                {{ day }}
              </p>
              <div class="w-full cursor-pointer triangle-down" @click="decreaseDay" />
            </div>
            <div class="py-5 w-full">
              <div class="w-full cursor-pointer triangle-up" @click="incrementMonth" />
              <p class="leading-10 pt-1 text-center bg-black">
                {{ month }}
              </p>
              <div class="w-full cursor-pointer triangle-down" @click="decreaseMonth" />
            </div>
            <div class="py-5 w-full">
              <div class="w-full cursor-pointer triangle-up" @click="incrementYear" />
              <p class="leading-10 pt-1 text-center bg-black rounded-r-lg">
                {{ year }}
              </p>
              <div class="w-full cursor-pointer triangle-down" @click="decreaseYear" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searching: false,
      folder: false,
      day: 1,
      month: 1,
      year: 2000,
      cloud: false,
      bateria: '/icons/bateria.svg'
    }
  },
  mounted () {
    this.cloud = true
    setTimeout(() => { this.cloud = false }, 2500)
  },
  methods: {
    incrementDay () {
      if (this.day < 31) {
        this.day = this.day + 1
      }
    },
    decreaseDay () {
      if (this.day > 1) {
        this.day = this.day - 1
      }
    },
    incrementMonth () {
      if (this.month < 12) {
        this.month = this.month + 1
      }
    },
    decreaseMonth () {
      if (this.month > 1) {
        this.month = this.month - 1
      }
    },
    incrementYear () {
      if (this.year < 2020) {
        this.year = this.year + 1
      }
    },
    decreaseYear () {
      if (this.year > 1980) {
        this.year = this.year - 1
      }
    }
  }
}
</script>

<style lang="css">
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.cloud-fade-enter-active {
  transition: all 3s ease;
}
.cloud-fade-leave-active {
  transition: all 3s ease;
}
.cloud-fade-enter {
  transform: translate(10rem, 4rem);
  opacity: 0;
}
.cloud-fade-leave-to {
  transform: translate(-6rem, -2rem);
  opacity: 0;
}
.rounded-r-xl {
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
}
.vertical-align-absolute {
    top: calc(50vh - 6rem);
}
.vertical-align-sidenav {
    height: 25rem;
    top: calc(50vh - 13.5rem);
}
.menu-icon:hover {
    transform: scale(1.1);
    transition: all 0.5s;
    cursor: pointer;
}
.calendar-container {
    margin-top: -6.3rem;
    right: 10rem;
}
.triangle-up {
    margin: auto;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid black;
}
.triangle-down {
    margin: auto;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid black;
}
.cloud {
    background: url('/icons/nuvem.svg');
    background-repeat: no-repeat;
    background-size: contain;
    height: 7rem;
    width: 11.5rem;
    position: absolute;
    color: #fafafa;
    margin-bottom: 5rem;
    margin-left: 20rem;
    bottom: 0;
}
.news-text {
    font-size: 0.35rem;
    line-height: 0.4rem;
}
</style>
