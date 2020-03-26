<template>
  <div>
    <div class="absolute w-16 vertical-align-sidenav">
      <div class="bg-gray-transparent-60 text-white py-4 rounded-r-xl w-full">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icons/browser.svg" alt="browser">
        <img @click="systemWindow = true" class="ml-5 py-3 w-8 menu-icon" src="/icons/noticias.svg" alt="noticias">
        <img @click="systemWindow = true" class="ml-5 py-3 w-8 menu-icon" src="/icons/fotos.svg" alt="fotos">
        <img @click="systemWindow = true" class="ml-5 py-3 w-8 menu-icon" src="/icons/reciclagem.svg" alt="reciclagem">
        <img @click="systemWindow = true" class="ml-5 py-3 w-8 menu-icon" src="/icons/email.svg" alt="email">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icons/chamadas.svg" alt="chamadas">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icons/settings.svg" alt="settings">
      </div>
    </div>
    <transition name="slide-fade">
      <div v-if="systemWindow" class="system-window rounded-lg">
        <div class="h-8 bg-gray-900 w-full p-2 rounded-t-lg">
          <div class="font-bold h-4 w-4 text-xs text-yellow-500 bg-yellow-500 hover:text-black cursor-pointer rounded-full text-center float-right" @click="systemWindow = false">
            X
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="videoWindow" class="video-window rounded-lg">
        <div class="h-8 bg-gray-900 w-full p-2 rounded-t-lg">
          <div class="font-bold h-4 w-4 text-xs text-yellow-500 bg-yellow-500 hover:text-black cursor-pointer rounded-full text-center float-right" @click="videoWindow = false">
            X
          </div>
        </div>
        <div class="w-full h-full">
          <video width="100%" autoplay>
            <source src="/video/placeholder.mp4" type="video/mp4">
            <!-- <source src="movie.ogg" type="video/ogg"> legendas -->
          Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </transition>
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
    <transition name="slide-fade">
      <div v-if="day == 2 && month == 2 && year == 2002" class="absolute w-6/12 py-20 ml-64 h-full mx-auto">
        <div class="w-7/12 float-right h-full mr-3">
          <div class="w-full min-h-full date-folder pt-12 pl-10" @click.prevent="resetDate">
            <div class="w-6/12">
              <div @click="videoWindow = true" class="video-file inline-block cursor-pointer" />
              <div class="image-file inline-block" />
              <div @click="videoWindow = true" class="video-file inline-block cursor-pointer" />
              <div class="audio-file inline-block" />
              <div class="doc-file inline-block" />
              <div class="image-file inline-block" />
              <div class="id-file inline-block" />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="absolute w-32 h-32 mt-12 mr-56 right-0 postit text-left pt-10 pl-10 pr-5 text-xxs">
      19/09- entregar os papéis assinados da custódia partilhada.
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
      systemWindow: false,
      videoWindow: false,
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
    },
    resetDate () {
      this.day = 1
      this.month = 1
      this.year = 2000
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
.date-folder {
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 1rem;
}

.video-file, .image-file,
.doc-file, .audio-file {
  width: 4rem;
  height: 4rem;
  border: 1px solid white;
  margin-bottom: 1rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 1.5rem;
  background-color: #222;
  border-radius: 0.5rem;
}

.video-file {
  background-image: url('/icons/play.svg');
}
.image-file {
  background-image: url('/icons/image.svg');
}
.id-file {
  width: 100%;
  background-color: #222;
  border-radius: 0.5rem;
  height: 5rem;
}
.doc-file {
  background-image: url('/icons/doc.svg');
}
.audio-file {
  background-image: url('/icons/sound-file.svg');
}
.system-window {
  width: 25%;
  height: 60%;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 9% 0% 0% 10%;
  position: absolute;
  z-index: 10;
  content: ' '
}
.video-window {
  width: 50%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  margin: 5% 0% 0% 20%;
  position: absolute;
  z-index: 10;
  content: ' '
}
.system-window:hover, .video-window:hover  {
  content: 'x'
}
.postit {
  background-image: url('/icons/postit.svg')
}
</style>
