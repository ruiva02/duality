<template>
  <div :class="{'rotate': rotationTrap}">
    <div :class="{'blur': choosing || choice !== '' || blurTrap}">
      <div v-show="sidenav" class="absolute w-16 vertical-align-sidenav z-10">
        <div class="bg-gray-transparent-60 text-white py-4 rounded-r-xl w-full">
          <img class="ml-5 py-3 w-8 menu-icon" src="/icones/browser.svg" alt="browser">
          <img class="ml-5 py-3 w-8 menu-icon" src="/icones/noticias.svg" alt="noticias" @click="systemWindow = true, window = 'newswindow'">
          <img class="ml-5 py-3 w-8 menu-icon" src="/icones/fotos.svg" alt="fotos" @click="systemWindow = true, window = 'gallery'">
          <img class="ml-5 py-3 w-8 menu-icon" :src="reciclagem" alt="reciclagem" @click="systemWindow = true, window = 'reciclagem'">
          <img class="ml-5 py-3 w-8 menu-icon" :src="mail" alt="email" @click="systemWindow = true, window = 'email'">
          <img class="ml-5 py-3 w-8 menu-icon" :src="chamadas" alt="chamadas" @click.prevent="skypeController">
          <img class="ml-5 py-3 w-8 menu-icon" src="/icones/settings.svg" alt="settings">
        </div>
      </div>
      <div v-if="!contentTrap" class="calendario" />
      <transition name="slide-fade">
        <div v-if="systemWindow" class="system-window rounded-lg">
          <div class="p-1 h-8 bg-gray-900 w-full rounded-t-lg">
            <span class="text-white text-xs ml-2">C:/Users/Suspect/{{ window }}</span>
            <div class="m-1 font-bold h-4 w-4 text-xs text-yellow-500 bg-yellow-500 hover:text-black cursor-pointer rounded-full text-center float-right" @click="systemWindow = false">
              X
            </div>
          </div>
          <div v-if="window === 'skype'" class="windowContent skype flex text-xxs">
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
            <div v-if="unlocked && contacting" class="bg-gray-600 h-full w-full rounded-br-lg skype-video relative">
              <div>
                <video autoplay="true" class="absolute z-0" @ended="chooseEnding">
                  <source src="/videos/trailer2.mp4" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
                <div class="w-full h-3 mt-3 px-5 relative z-10 flex flex-wrap justify-between">
                  <img src="/icones/back.svg" class="h-3 cursor-pointer" alt="back" @click="contacting = false">
                  <img src="/icones/expand.svg" class="h-3" alt="expand">
                </div>
                <div class="h-8 bottom-0 absolute z-20 ml-16 mb-4 w-full pr-32">
                  <img src="/icones/skype-controls.svg" class="h-8 mx-auto" alt="controls">
                </div>
              </div>
            </div>
            <div v-else-if="unlocked === false && contacting === true" class="bg-gray-600 h-full w-full rounded-br-lg p-2">
              <div class="flex">
                <div class="mx-auto pt-10">
                  <p class="text-yellow-500 mb-3 text-xs">
                    Para reportar à PJ indique:
                  </p>
                  <p class="text-white">
                    Nº de telefone do centro da PJ
                  </p>
                  <input v-model="lockNumber" :class="{'border-green-500': lockNumber === '234376000'}" class="border-2 border-red-500 text-base my-3 px-2" type="tel" placeholder="exemplo: 913331123">
                  <p class="text-white">
                    O nome do suspeito
                  </p>
                  <input v-model="lockSuspect" :class="{'border-green-500': lockSuspect === 'Luciano Pereira'}" class="border-2 border-red-500 text-base my-3 px-2" type="tel" placeholder="exemplo: Malaquias">
                  <p class="text-white">
                    A localização do suspeito
                  </p>
                  <input v-model="lockLocation" :class="{'border-green-500': lockLocation === 'Rua Da Gândara'}" class="border-2 border-red-500 text-base my-3 px-2" type="tel" placeholder="exemplo: Rua do Paraíso">
                </div>
              </div>
            </div>
            <div v-else class="bg-gray-600 h-full w-full rounded-br-lg p-2 skype-video" style="background-image: url('/images/placeholder-1.png')" />
          </div>
          <div v-if="window === 'gallery'" class="windowContent w-full">
            <div v-for="(img, key) in arrayGaleria" :key="key" class="inline-block">
              <img
                v-if="img.locked"
                class="w-24 p-3 object-contain image-locked"
                :src="img.url"
                :alt="img.alt"
                style="max-height: 5rem"
              >
              <img
                v-else
                class="w-24 p-3 object-contain cursor-pointer"
                :src="img.url"
                :alt="img.alt"
                style="max-height: 5rem"
                @click="mediaWindow = img"
              >
            <!-- <img class="w-24 p-3 object-contain" :class="{ 'image-locked' : img.locked }" :src="img.url" :alt="img.alt" style="max-height: 5rem"> -->
            </div>
          </div>
          <div v-if="window === 'email'" class="windowContent w-full">
            <div v-for="(item, key) in mailData" :key="key" class="inline-block">
              <div v-if="item.type === 'video'" class="inline-block cursor-pointer video-file m-3" @click="mediaWindow = item">
                <span class="absolute mt-16 text-xs text-center">{{ item.alt }}</span>
              </div>
              <div v-if="item.type === 'audio'" class="inline-block cursor-pointer audio-file" @click="mediaWindow = item" />
              <div v-if="item.type === 'doc'" class="inline-block cursor-pointer doc-file" @click="mediaWindow = item" />
            </div>
          </div>
          <div v-if="window === 'newswindow'" class="windowContent w-full">
            <div v-for="(item, key) in noticias" :key="key" class="inline-block">
              <div v-if="item.type === 'video'" class="inline-block cursor-pointer doc-file m-3" @click="mediaWindow = item">
                <span class="absolute mt-16 text-xs text-center">{{ item.alt }}</span>
              </div>
              <div v-if="item.type === 'image' || item.type === 'image-art'" class="inline-block cursor-pointer image-file" @click="mediaWindow = item" />
            </div>
          </div>
          <div v-if="window === 'reciclagem'" class="windowContent w-full">
            <div v-for="(item, key) in reciclagemData" :key="key" class="inline-block">
              <div v-if="item.type === 'video'" class="inline-block cursor-pointer doc-file m-3" @click="mediaWindow = item">
                <span class="absolute mt-16 text-xs text-center">{{ item.alt }}</span>
              </div>
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
          <div v-if="mediaWindow.type === 'doc'" class="w-full h-full">
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
        <div v-if="cloud" class="cloud" :style="cloudItem" />
      </transition>
      <transition name="slide-fade">
        <div v-if="dateFolder" class="absolute py-20 h-full w-full">
          <div class="folder">
            <div class="h-8 bg-gray-900 w-full p-2 rounded-t-lg text-xs pl-3 text-white">
              C:/Users/Suspect/Images/Albums/{{ moment }}
              <div class="font-bold h-4 w-4 text-xs text-yellow-500 bg-yellow-500 hover:text-black cursor-pointer rounded-full text-center float-right" @click="dateFolder = false">
                X
              </div>
            </div>
            <div v-if="moment === '2019-12-13' && policeLocked" class="w-full min-h-full date-corrupted" />
            <div v-else class="w-full min-h-full date-folder pt-10 pl-10">
              <div class="w-8/12">
                <div v-for="(item, key) in media" :key="key" class="inline-block">
                  <div v-if="item.data === moment" class="px-2">
                    <div v-if="item.type === 'image' || item.type === 'image-art'" class="inline-block cursor-pointer image-file" @click="mediaWindow = item" />
                    <div v-if="item.type === 'video'" class="inline-block cursor-pointer video-file" @click="mediaWindow = item" />
                    <div v-if="item.type === 'audio'" class="inline-block cursor-pointer audio-file" @click="mediaWindow = item" />
                    <div v-if="item.type === 'doc'" class="inline-block cursor-pointer doc-file" @click="mediaWindow = item" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="trap" class="absolute py-20 h-full w-full">
          <div class="folder">
            <div class="h-8 bg-gray-900 w-full p-2 rounded-t-lg text-xs pl-3 text-white">
              C:/Users/Luciano/Images/Albums/{{ moment }}
              <div class="font-bold h-4 w-4 text-xs text-yellow-500 bg-yellow-500 hover:text-black cursor-pointer rounded-full text-center float-right" @click="trap = false">
                X
              </div>
            </div>
            <div class="w-full min-h-full date-folder pt-10 pl-10">
              <div class="w-8/12">
                <div class="inline-block px-2">
                  <div>
                    <div v-for="n in random" :key="n" class="inline-block cursor-pointer image-file mx-2" @click="trapTriggered = true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div v-if="!contentTrap" class="absolute w-32 h-32 mt-20 mr-56 right-0 postit text-left pt-10 pl-10 pr-5 text-xxs">
        Setembro: <br> entregar os papéis assinados da custódia partilhada.
      </div>
      <div v-if="trapTriggered" class="absolute z-50 justify-center h-screen w-screen pb-8 pt-48">
        <div class="flex items-center justify-center">
          <img v-if="moment === '2006-06-22' || moment === '2011-08-19' || moment === '2011-02-17' || moment === '2019-12-15'" class="h-48" src="/images/errors/battery.png">
          <img v-if="moment === '2020-01-06' || moment === '2013-05-12'" class="h-48" src="/images/errors/blur.png">
          <img v-if="moment === '2019-03-27' || moment === '2019-02-10'" class="h-48" src="/images/errors/rotation.png">
          <img v-if="moment === '1984-04-23' || moment === '1983-10-01' || moment === '1984-06-18'" class="h-56" src="/images/errors/privacy.png">
          <img v-if="moment === '2001-12-05' || moment === '2019-12-10'" class="h-48" src="/images/errors/postit.png">
          <img v-if="moment === '2000-02-08' || moment === '2019-05-20'" class="h-48" src="/images/errors/warning.png">
        </div>
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
    <div v-if="choosing" class="choice-wrapper">
      <div class="choice shadow-2xl">
        <div class="text-center pt-32 text-xl rounded-t-lg h-64 w-full bg-yellow-500 text-white">
          How do you want to end this?
        </div>
        <hr class="bg-white h-2 shrink-line">
        <div class="h-48 w-full flex">
          <button class="w-full bg-transparent-white border-r border-dashed border-black hover:text-yellow-500 hover:shadow-2xl rounded-bl-lg transition-all duration-500" @click.prevent="endingController('free')">
            Let luciano free
          </button>
          <button class="w-full bg-transparent-white hover:text-yellow-500 hover:shadow-2xl rounded-br-lg transition-all duration-500" @click.prevent="endingController('police')">
            Call the police
          </button>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div v-if="choice === 'free'" class="choice-wrapper">
        <div class="choice h-full w-full">
          <video autoplay class="rounded-lg h-full w-full" src="/videos/example.mp4" />
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="choice === 'police'" class="choice-wrapper">
        <div class="choice h-64 w-64 shadow-2xl">
          <iframe class="rounded-lg h-full w-full" src="/noticias/opcaoB.png" frameborder="0" />
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="choice === 'timeout'" class="choice-wrapper">
        <div class="choice h-64 w-64 shadow-2xl">
          <iframe class="rounded-lg h-full w-full" src="/noticias/fimalternativo.png" frameborder="0" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      media: {},
      mailData: [],
      systemWindow: false,
      policeLocked: true,
      iterator: 0,
      mediaWindow: 'undefined',
      dateFolder: false,
      searching: false,
      choosing: false,
      choice: '',
      score: 7200,
      folder: false,
      moment: '2015-10-10',
      traps: [
        '2000-02-08',
        '2006-06-22',
        '2011-08-19',
        '2011-02-17',
        '2019-12-15',
        '2020-01-06',
        '2019-05-20',
        '2013-05-12',
        '2019-03-27',
        '2019-02-10',
        '1984-04-23',
        '1983-10-01',
        '1984-06-18',
        '2001-12-05',
        '2019-12-10'
      ],
      random: 1,
      blurTrap: false,
      contentTrap: false,
      rotationTrap: false,
      trapTriggered: false,
      sidenav: true,
      day: 10,
      month: 10,
      year: 2015,
      cloud: false,
      cloudItem: "background-image: url('/noticias/nuvem1.png');",
      noticias: [],
      news: [
        { url: '/noticias/noticia1.png', alt: 'noticia1', type: 'video' },
        { url: '/noticias/noticia2.png', alt: 'noticia2', type: 'video' },
        { url: '/noticias/noticia3.png', alt: 'noticia3', type: 'video' },
        { url: '/noticias/noticia4.png', alt: 'noticia4', type: 'video' },
        { url: '/noticias/noticia5.png', alt: 'noticia5', type: 'video' }
      ],
      lockNumber: null,
      lockSuspect: null,
      lockLocation: null,
      bateria: '/icones/bateria.svg',
      chamadas: '/icones/chamadas-off.svg',
      reciclagem: '/icones/reciclagem.svg',
      reciclagemData: [
        { url: '/reciclagem/divorcio.png', alt: 'divorcio', type: 'video' },
        { url: '/reciclagem/testamento.png', alt: 'testamento', type: 'video' }
      ],
      mail: '/icones/email.svg',
      window: '',
      arrayGaleria: [],
      unlocked: false,
      contacting: false,
      skypeVideo: "background-image: url('/images/placeholder-1.png')"
    }
  },
  computed: {
    trap () {
      if (this.traps.includes(this.moment)) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    trapTriggered () {
      if (this.trapTriggered === true) {
        if (this.moment === '1984-04-23' || this.moment === '1983-10-01' || this.moment === '1984-06-18') {
          this.sidenav = false
          setTimeout(() => { this.sidenav = true }, 300000)
        }
        if (this.moment === '2020-01-06' || this.moment === '2013-05-12') {
          setTimeout(() => { this.blurTrap = true }, 6000)
          setTimeout(() => { this.blurTrap = false }, 120000)
        }
        if (this.moment === '2019-03-27' || this.moment === '2019-02-10') {
          setTimeout(() => { this.rotationTrap = true }, 6000)
          setTimeout(() => { this.rotationTrap = false }, 120000)
        }
        if (this.moment === '2001-12-05' || this.moment === '2019-12-10') {
          setTimeout(() => { this.contentTrap = true }, 6000)
          this.$store.commit('battery/loseBattery')
        }
        if (this.moment === '2006-06-22' || this.moment === '2011-08-19' || this.moment === '2011-02-17' || this.moment === '2019-12-15') {
          setTimeout(() => { this.$store.commit('battery/loseBattery') }, 6000)
        }
        setTimeout(() => { this.trapTriggered = false }, 6000)
      }
    },
    trap () {
      if (this.trap === true) {
        this.random = Math.floor(Math.random() * 10) + 1
      }
    },
    lockNumber () {
      if (this.lockNumber === '234376000' && this.lockSuspect === 'Luciano Pereira' && this.lockLocation === 'Rua Da Gândara') {
        this.unlocked = true
      } else {
        this.unlocked = false
      }
    },
    lockSuspect () {
      if (this.lockNumber === '234376000' && this.lockSuspect === 'Luciano Pereira' && this.lockLocation === 'Rua Da Gândara') {
        this.unlocked = true
      } else {
        this.unlocked = false
      }
    },
    lockLocation () {
      if (this.lockNumber === '234376000' && this.lockSuspect === 'Luciano Pereira' && this.lockLocation === 'Rua Da Gândara') {
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
    },
    choosing () {
      setTimeout(() => {
        if (this.choice === '') {
          this.endingController('timeout')
        }
      },
      14500)
    },
    choice () {
      if (this.choice !== '') {
        setTimeout(() => {
          this.$store.commit('scoreboard/calcScore', this.score)
          console.log('calculating score...')
        },
        15000)
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
    setTimeout(() => { this.scoreCounter() }, 1000)
    setTimeout(() => { this.cloud = true }, 900000)
    setTimeout(() => { this.cloudController() }, 900000)
    setTimeout(() => { this.insuranceMail() }, 2700000)
    setTimeout(() => { this.chamadas = '/icones/chamadas.svg' }, 2700000)
    setTimeout(() => { this.reciclagem = '/icones/reciclagem-full.svg' }, 1200)
    setTimeout(() => { this.mail = '/icones/email-open.svg' }, 2700000)
    setTimeout(() => { this.policeLocked = false }, 2700000)
    setTimeout(() => { this.reciclagemData.push({ url: '/reciclagem/recibo.png', alt: 'recibo', type: 'video' }) }, 1200000)
  },
  methods: {
    cloudController () {
      this.cloud = true
      setTimeout(() => { this.cloud = false }, 2500)
      if (this.news[this.iterator] !== undefined) {
        this.noticias.push(this.news[this.iterator])
        this.cloudItem = "background-image: url('/noticias/nuvem" + (this.iterator + 1) + ".png');"
        this.iterator += 1
      }
      if (this.news[this.iterator] !== undefined) {
        setTimeout(() => { this.cloudController() }, 900000)
      }
    },
    scoreCounter () {
      this.score = this.score - 1
      setTimeout(() => { this.scoreCounter() }, 1000)
    },
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
      if (this.chamadas === '/icones/chamadas.svg') {
        this.window = 'skype'
        this.systemWindow = true
      }
    },
    skypeContactController () {
      this.skypeVideo = 'background-image: url(' + '/icones/giphy.gif' + ')'
      this.contacting = true
      // setTimeout(() => { this.skypeVideo = 'background-image: url("")' }, 3000)
    },
    chooseEnding () {
      this.choosing = true
    },
    insuranceMail () {
      const mail = [
        { type: 'video', url: 'https://player.vimeo.com/video/427686849', alt: 'CCTV_interior' },
        { type: 'video', url: 'https://player.vimeo.com/video/421096610', alt: 'CCTV_exterior' }
      ]
      this.mailData = mail
    },
    endingController (choice) {
      switch (choice) {
        case 'free':
          console.log('chose freedom')
          this.choosing = false
          this.choice = 'free'
          break
        case 'police':
          console.log('chose police')
          this.choosing = false
          this.choice = 'police'
          break
        case 'timeout':
          console.log('chose timeout')
          this.choosing = false
          this.choice = 'timeout'
          break
      }
    }
  }
}
</script>

<style lang="scss">
.choice-wrapper{
  @apply w-full h-full flex justify-center items-center z-20 absolute;
  .choice{
    width: 35rem;
    height: 28rem;
  }
}
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
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

.date-corrupted {
    background-image: url('/images/glitch1.gif');
    background-color: red;
    opacity: 0.5;
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
  height: 20rem;
  margin: 9% 0% 0% 7%;
  position: absolute;
  z-index: 10;
  content: ' '
}
.windowContent {
  background-color: rgba(150, 150, 150, 0.8);
  height: 90%;
  padding: 1em;
  @apply rounded-b-lg
}
@media screen and (min-height: 930px) {
  .system-window {
    height: 25rem;
    margin: 16rem 0 0 15rem;
  }
}
.skype {
  height: 95%;
  padding: 0em;
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
.blur {
  filter: blur(0.15rem);
}
.rotate {
  transform: rotate(180deg);
}
.bg-transparent-white{
  background-color:rgba(255, 255, 255, 0.3)
}
.shrink-line {
  animation-name: shrink-line;
  animation-delay: 1s;
  animation-duration: 15s;
  animation-fill-mode: forwards;
  display: block;
}

@keyframes shrink-line {
  0% {
    transform: scaleX(1.0);
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
input:focus {
  outline: none;
}
</style>
