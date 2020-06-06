<template>
  <div>
    <div v-if="trailer === false && play === true" style="background: url('/images/start.png'); background-repeat: no-repeat; background-size: cover" class="absolute z-30 w-full h-full bg-white">
      <div class="absolute w-4/12 right-0 h-full mr-20" style="padding-top: 17%">
        <div class="h-64 flex justify-center items-center" style="background: url('/images/consola.png'); background-repeat: no-repeat">
          <div class="pt-20 text-sm">
            <button class="console-button" @click="playController">
              play
            </button>
            <button class="console-button" @click="playController">
              options
            </button>
            <button class="console-button" @click="playController">
              exit
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="trailer === true" class="absolute z-20 w-full h-full bg-black" @keyup.enter="handleEnter">
      <video @ended="endTrailer" ref="video" class="h-full w-full" autoplay="true">
        <source :src="intro" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <button class="absolute text-white border border-white bottom-0 right-0 mr-10 mb-10 px-5 py-2" @click="trailer = false">
        skip intro
      </button>
    </div>
    <nuxt v-if="trailer === false && play === false && end === false" />
    <div v-if="end === true" class="absolute z-20 w-full h-full h-full w-full flex" style="background-color: #757575">
      <div class="relative h-full w-full border-r border-white flex items-center">
        <div class="absolute right-0 w-48 h-48 rounded-full bg-black text-white mr-20 flex items-center justify-center">
          a
        </div>
      </div>
      <div class="h-full w-full flex items-center">
        <div class="w-48 h-48 rounded-full bg-white ml-20 flex items-center justify-center">
          b
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      trailer: false,
      play: true,
      end: false,
      intro: '/videos/trailer1.mp4'
    }
  },
  mounted () {
    const me = this
    window.addEventListener('keypress', function (e) {
      if (e.keyCode === 13) {
        me.intro = '/videos/trailer2.mp4'
        const vid = me.$refs.video
        vid.load()
      }
    })
  },
  methods: {
    playController () {
      this.trailer = true
      this.play = false
    },
    endTrailer () {
      this.trailer = false
    }
  }
}
</script>

<style>
@font-face {
  font-family: "NeueMontreal";
  src: url("/fontes/montreal-regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "NeueMontreal";
  src: url("/fontes/montreal-bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}
html {
  font-family: 'NeueMontreal';
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
button:focus {outline:0;}
.console-button {
  @apply relative w-full text-gray-200 py-1 transition-all duration-300 ease-in-out;
  &:hover {
    text-shadow: 0px 0px 15px rgb(41, 152, 255);
    @apply text-white text-base;
  }
}
</style>
