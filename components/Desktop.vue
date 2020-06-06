<template>
  <div>
    <div class="absolute w-16 vertical-align-sidenav z-10">
      <div class="bg-gray-transparent-60 text-white py-4 rounded-r-xl w-full">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icones/browser.svg" alt="browser">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icones/noticias.svg" alt="noticias" @click="systemWindow = true, window = ''">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icones/fotos.svg" alt="fotos" @click="systemWindow = true, window = 'gallery'">
        <img class="ml-5 py-3 w-8 menu-icon" :src="reciclagem" alt="reciclagem" @click="systemWindow = true, window = ''">
        <img class="ml-5 py-3 w-8 menu-icon" :src="mail" alt="email" @click="systemWindow = true, window = ''">
        <img class="ml-5 py-3 w-8 menu-icon" :src="chamadas" alt="chamadas" @click.prevent="skypeController">
        <img class="ml-5 py-3 w-8 menu-icon" src="/icones/settings.svg" alt="settings">
      </div>
    </div>
    <div class="calendario" />
    <transition name="slide-fade">
      <div v-if="systemWindow" class="system-window rounded-lg">
        <div class="h-8 bg-gray-900 w-full p-2 rounded-t-lg">
          <div class="font-bold h-4 w-4 text-xs text-yellow-500 bg-yellow-500 hover:text-black cursor-pointer rounded-full text-center float-right" @click="systemWindow = false">
            X
          </div>
        </div>
        <div v-if="window === 'skype'" class="skype flex text-xxs">
          <div class="bg-white h-full w-56 text-gray-200 rounded-bl-lg p-2 pt-4">
            <div class="text-xs font-bold text-black">
              Contactos
            </div>
            <div class="mt-8 rounded-full pb-2 transition-all duration-500">
              <div class="inline-block h-8 w-8 rounded-full skype-user" style="background-image: url('/icones/joana.svg');" />
              Joana Lima
              <div class="inline-block w-1 h-1 rounded-full bg-gray-200 ml-1" />
            </div>
            <div class="my-4 hover:shadow-xl hover:bg-yellow-400 rounded-full pb-2 transition-all duration-500 cursor-pointer" @click="skypeContactController">
              <div class="inline-block h-8 w-8 rounded-full skype-user" style="background-image: url('/icones/pj-icon.svg');" />
              <span class="text-black font-semibold">Polícia Judiciária</span>
              <div class="inline-block w-1 h-1 rounded-full bg-green-600 ml-1" />
            </div>
            <div class="my-4 rounded-full pb-2">
              <div class="inline-block h-8 w-8 rounded-full skype-user" style="background-image: url('/icones/rodrigo.svg');" />
              Rodrigo Pereira
              <div class="inline-block w-1 h-1 rounded-full bg-gray-200 ml-1" />
            </div>
            <div class="my-4 rounded-full pb-2">
              <div class="inline-block h-8 w-8 rounded-full skype-user" style="background-image: url('/icones/lurdes.svg');" />
              Lurdes Pereira
              <div class="inline-block w-1 h-1 rounded-full bg-gray-200 ml-1" />
            </div>
            <div class="my-4 rounded-full pb-2">
              <div class="inline-block h-8 w-8 rounded-full skype-user" style="background-image: url('/icones/paulo.svg');" />
              Paulo Carolino
              <div class="inline-block w-1 h-1 rounded-full bg-gray-200 ml-1" />
            </div>
          </div>
          <div v-if="unlocked && contacting" class="bg-gray-600 h-full w-full rounded-br-lg p-2 skype-video" :style="skypeVideo">
            <div>
              <div class="w-full h-3 mt-3 px-3 flex flex-wrap justify-between">
                <img src="/icones/back.svg" class="h-3 cursor-pointer" alt="back" @click="contacting = false">
                <img src="/icones/expand.svg" class="h-3" alt="expand">
              </div>
              <div class="h-8 bottom-0 absolute ml-10 mb-4 w-full pr-64">
                <img src="/icones/skype-controls.svg" class="h-8 mx-auto" alt="controls">
              </div>
            </div>
          </div>
          <div v-else-if="unlocked === false && contacting === true" class="bg-gray-600 h-full w-full rounded-br-lg p-2">
            <div class="flex">
              <div class="mx-auto pt-40">
                <p class="text-white">
                  Como medida de segurança, confirme o nº deste contacto
                </p>
                <input v-model="lockNumber" class="text-lg ml-4 mt-3" type="tel" placeholder="exemplo: 913331123">
              </div>
            </div>
          </div>
          <div v-else class="bg-gray-600 h-full w-full rounded-br-lg p-2 skype-video" style="background-image: url('/images/placeholder-1.png')" />
        </div>
        <div v-if="window === 'gallery'" class="w-full">
          <div v-for="(img, key) in arrayGaleria" :key="key" class="inline-block">
            <img class="w-24 p-3 object-contain" :class="{ 'image-locked' : img.locked }" :src="img.url" :alt="img.alt" style="max-height: 5rem">
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="mediaWindow !== 'undefined'" class="video-window rounded-lg pb-8">
        <div class="h-8 bg-gray-900 w-full p-2 rounded-t-lg">
          <div class="font-bold h-4 w-4 text-xs text-yellow-500 bg-yellow-500 hover:text-black cursor-pointer rounded-full text-center float-right" @click.prevent="mediaWindow = 'undefined'">
            X
          </div>
        </div>
        <div v-if="mediaWindow.type === 'video'" class="w-full h-full">
          <iframe
            width="100%"
            height="100%"
            :src="mediaWindow.url"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
        <div v-if="mediaWindow.type === 'image' || mediaWindow.type === 'image-art'" class="w-full h-full">
          <img class="mx-auto h-full" :src="mediaWindow.url">
        </div>
      </div>
    </transition>
    <transition name="cloud-fade">
      <div v-if="cloud" class="cloud">
        <div class="absolute h-6 w-6 mt-5 ml-4 bg-yellow-500 rounded-full">
          <img src="/icones/alerta.svg" alt="alerta" class="h-6 w-6 mx-auto py-1">
        </div>
        <div class="pt-8 mt-2 px-10 mx-1 mb-2 w-full h-full">
          <div class="flex flex-wrap justify-between leading-4">
            <span class="uppercase font-bold text-black text-xs">
              <span>Noticias</span>
              <span class="text-yellow-500">JN</span>
            </span>
            <img class="w-2 mr-2" src="/icones/fechar.svg" alt="fechar">
          </div>
          <p class="news-text">
            Despejo de moradora exalta ânimos na Ribeira.  A ordem de despejo de Joana Pacheco da casa na Ribeira onde mora com os dois filhos, de oito e 12 anos, foi executada esta sexta-feira de manhã.
          </p>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="dateFolder" class="absolute py-20 h-full w-full">
        <div class="folder">
          <div class="h-8 bg-gray-900 w-full p-2 rounded-t-lg text-xs pl-3 text-white">
            C:/Users/Luciano/Images/Albums/{{ moment }}
            <div class="font-bold h-4 w-4 text-xs text-yellow-500 bg-yellow-500 hover:text-black cursor-pointer rounded-full text-center float-right" @click="dateFolder = false">
              X
            </div>
          </div>
          <div class="w-full min-h-full date-folder pt-10 pl-10">
            <div class="w-8/12">
              <div class="inline-block px-2" v-for="(item, key) in media" :key="key">
                <div v-if="item.data === moment">
                    <div v-if="item.type === 'image' || item.type === 'image-art'" class="inline-block cursor-pointer image-file" @click="mediaWindow = item" />
                    <div class="inline-block cursor-pointer video-file" v-if="item.type === 'video'" @click="mediaWindow = item" />
                    <div class="inline-block cursor-pointer audio-file" v-if="item.type === 'audio'" @click="mediaWindow = item" />
                    <div class="inline-block cursor-pointer doc-file" v-if="item.type === 'doc'" @click="mediaWindow = item" />
                </div>
              </div>
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
        <img class="menu-icon px-4 py-6" src="/icones/lupa.svg" alt="lupa" @click="searching = !searching">
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
      media: {},
      systemWindow: false,
      mediaWindow: 'undefined',
      dateFolder: false,
      searching: false,
      folder: false,
      moment: '2018-04-23',
      day: 23,
      month: 4,
      year: 2018,
      cloud: false,
      lockNumber: null,
      bateria: '/icones/bateria.svg',
      chamadas: '/icones/chamadas-off.svg',
      reciclagem: '/icones/reciclagem.svg',
      mail: '/icones/email.svg',
      window: '',
      arrayGaleria: [],
      unlocked: false,
      contacting: false,
      skypeVideo: "background-image: url('/images/placeholder-1.png')"
    }
  },
  watch: {
    lockNumber () {
      if (this.lockNumber === '913331123') {
        this.unlocked = true
      } else {
        this.unlocked = false
      }
    },
    moment () {
      const a = this.media.some(item => item.data === this.moment)
      if (a) {
        this.dateFolder = true
      } else {
        this.dateFolder = false
      }
      for (const i in this.arrayGaleria) {
        if (this.arrayGaleria[i].data === this.moment) {
          this.arrayGaleria[i].locked = false
        }
      }
    }
  },
  mounted () {
    this.$axios.get('http://duality.web.ua.pt/backend/').then((response) => {
      this.media = response.data
      for (const i in this.media) {
        if (this.media[i].type === 'image-art') {
          const a = this.media[i]
          a.locked = true
          this.arrayGaleria.push(a)
        }
      }
    }).catch((error) => {
      alert(error)
    })
    this.cloud = true
    setTimeout(() => { this.cloud = false }, 2500)
    setTimeout(() => { this.chamadas = '/icones/chamadas.svg' }, 12000)
    setTimeout(() => { this.reciclagem = '/icones/reciclagem-full.svg' }, 1200)
    setTimeout(() => { this.mail = '/icones/email-open.svg' }, 2400)
  },
  methods: {
    incrementDay () {
      if (this.day < 31) {
        this.day = this.day + 1
        const a = this.moment.split('-')
        let b = ''
        if (this.day < 10) {
          b = a[0] + '-' + a[1] + '-0' + this.day
        } else {
          b = a[0] + '-' + a[1] + '-' + this.day
        }
        this.moment = b
      }
    },
    decreaseDay () {
      if (this.day > 1) {
        this.day = this.day - 1
        const a = this.moment.split('-')
        let b = ''
        if (this.day < 10) {
          b = a[0] + '-' + a[1] + '-0' + this.day
        } else {
          b = a[0] + '-' + a[1] + '-' + this.day
        }
        this.moment = b
      }
    },
    incrementMonth () {
      if (this.month < 12) {
        this.month = this.month + 1
        const a = this.moment.split('-')
        let b = ''
        if (this.month < 10) {
          b = a[0] + '-0' + this.month + '-' + a[2]
        } else {
          b = a[0] + '-' + this.month + '-' + a[2]
        }
        this.moment = b
      }
    },
    decreaseMonth () {
      if (this.month > 1) {
        this.month = this.month - 1
        const a = this.moment.split('-')
        let b = ''
        if (this.month < 10) {
          b = a[0] + '-0' + this.month + '-' + a[2]
        } else {
          b = a[0] + '-' + this.month + '-' + a[2]
        }
        this.moment = b
      }
    },
    incrementYear () {
      if (this.year < 2020) {
        this.year = this.year + 1
        const a = this.moment.split('-')
        let b = ''
        b = this.year + '-' + a[1] + '-' + a[2]
        this.moment = b
      }
    },
    decreaseYear () {
      if (this.year > 1980) {
        this.year = this.year - 1
        const a = this.moment.split('-')
        let b = ''
        b = this.year + '-' + a[1] + '-' + a[2]
        this.moment = b
      }
    },
    resetDate () {
      this.day = 1
      this.month = 1
      this.year = 2000
    },
    skypeController () {
      this.window = 'skype'
      this.systemWindow = true
    },
    skypeContactController () {
      this.skypeVideo = 'background-image: url(' + '/icones/giphy.gif' + ')'
      this.contacting = true
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
    background: url('/icones/nuvem.svg');
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
.calendario {
  position: absolute;
  height: 8rem;
  width: 8rem;
  background-image: url('/icones/calendario.svg');
  background-repeat: no-repeat;
  background-position: center center;
  left: 22rem;
  top: 22rem;
}
.folder {
  width: 25rem;
  height: 24rem;
  float: right;
  margin-right: 25rem;
}
@media screen and (min-height: 930px) {
  .folder {
    width: 29rem;
    height: 37rem;
    margin-right: 32rem;
  }
}

.date-folder {
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 0rem 0rem 1rem 1rem;
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
  background-image: url('/icones/play.svg');
}
.image-file {
  background-image: url('/icones/image.svg');
}
.id-file {
  width: 100%;
  background-color: #222;
  border-radius: 0.5rem;
  height: 5rem;
}
.doc-file {
  background-image: url('/icones/doc.svg');
}
.audio-file {
  background-image: url('/icones/sound-file.svg');
}
.system-window {
  width: 32%;
  height: 60%;
  background-color: rgba(150, 150, 150, 0.8);
  margin: 9% 0% 0% 7%;
  position: absolute;
  z-index: 10;
  content: ' '
}
@media screen and (min-height: 930px) {
  .system-window {
    height: 25rem;
    margin: 16rem 0 0 15rem;
  }
}
.skype {
  height: 95%;
}
.skype-user {
  margin-bottom: -0.75rem;
  background-repeat: no-repeat;
}
.skype-video {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.image-locked{
  filter: blur(0.5rem);
}
.video-window {
  width: 45%;
  height: 70%;
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
  background-image: url('/icones/postit.svg')
}
</style>
