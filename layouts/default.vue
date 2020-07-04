<template>
  <div>
    <div v-if="trailer === false && play === true" style="background: url('/images/start.png'); background-repeat: no-repeat; background-size: cover" class="absolute z-30 w-full h-full bg-white">
      <div class="absolute w-4/12 right-0 h-full mr-20" style="padding-top: 17%">
        <div class="h-64 flex justify-center items-center" style="background: url('/images/consola.png'); background-repeat: no-repeat">
          <div class="pt-20 text-xl">
            <button class="console-button" @click="playController">
              play
            </button>
            <!-- <button class="console-button" @click="playController">
              options
            </button>
            <button class="console-button" @click="playController">
              exit
            </button> -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="trailer === true" class="absolute z-20 w-full h-full bg-black">
      <video ref="video" class="h-full w-full" loop autoplay="true" @ended="endTrailer">
        <source :src="intro" type="video/mp4">
        Browser not supported
      </video>
      <button class="absolute text-white border border-white bottom-0 right-0 mr-10 mb-10 px-5 py-2" @click="trailer = false">
        skip intro
      </button>
    </div>
    <nuxt v-if="trailer === false && play === false && getBattery !== 0 && getScore === 0" />
    <div v-if="getScore !== 0" class="w-full h-screen flex justify-center items-center text-center bg-yellow-500 text-xl">
      <div>
        <h2 class="text-2xl">Congratulations!<br> You have scored&nbsp;</h2>
        <span class="font-bold">{{ getScore }}</span>&nbsp;points<br><br>
        <a class="text-center cursor-pointer" @click="forceReload()">Play again?</a>
      </div>
    </div>
    <div v-if="getBattery === 0" class="absolute z-20 w-full h-full h-full w-full flex items-center justify-center bg-black">
      <div class="text-yellow-500 text-2xl">
        <span class="game-over">GAME OVER</span>
        <br>
        <p class="restart text-white text-3xl text-left w-full">
          Restart?
        </p>
        <p class="restart child text-white text-2xl text-left w-full leading-tight" @click.prevent="forceReload()">
          Yes
        </p>
        <p class="restart child text-white text-2xl text-left w-full leading-tight">
          No
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      trailer: false,
      play: true,
      intro: '/videos/trailer1.mp4'
    }
  },
  computed: {
    ...mapGetters('battery', [
      'getBattery'
    ]),
    ...mapGetters('scoreboard', [
      'getScore'
    ])
  },
  mounted () {
    const me = this
    console.log(this.getScore)
    window.addEventListener('keypress', function (e) {
      if (e.keyCode === 13) {
        me.intro = '/videos/trailer2.mp4'
        const vid = me.$refs.video
        vid.loop = false
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
    },
    forceReload () {
      console.log('force reload')
      this.$router.go(0)
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
    @apply text-white text-2xl;
  }
}
</style>

<style lang="scss">
/* vietnamese */
@font-face {
  font-family: 'VT323';
  font-style: normal;
  font-weight: 400;
  src: local('VT323 Regular'), local('VT323-Regular'), url(https://fonts.gstatic.com/s/vt323/v11/pxiKyp0ihIEF2isQFJXGdg.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'VT323';
  font-style: normal;
  font-weight: 400;
  src: local('VT323 Regular'), local('VT323-Regular'), url(https://fonts.gstatic.com/s/vt323/v11/pxiKyp0ihIEF2isRFJXGdg.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'VT323';
  font-style: normal;
  font-weight: 400;
  src: local('VT323 Regular'), local('VT323-Regular'), url(https://fonts.gstatic.com/s/vt323/v11/pxiKyp0ihIEF2isfFJU.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@mixin anim($name, $dur, $iterate) {
  animation-name: $name;
  animation-duration: $dur;
  animation-iteration-count:$iterate;
}

.game-over {
  font-family: 'VT323';
  font-size: 10rem;
  text-align: center;
  @include anim(game-over-anim, 1s, infinite);
}

.restart {
  font-family: 'VT323';
  &.child:hover {
    color: lime;
    cursor: pointer;
    &::before{
      content:">";
      width:10px;
      height:10px;
      color: lime;
      display:inline-block;
    }
  }
}

@keyframes game-over-anim {
  0%{color:lime; text-shadow:0 0 20px green}
  25%{color:green; text-shadow:2px 2px 2px lime; transform: translate(-2px,1px)}
  40%{color:lime; text-shadow:none; transform: translate(0,0)}
  50%{color:green; text-shadow:5px 5px 2px blue, -5px -5px 2px red; transform: translate(0px,5px)}
  70%{color:lime; text-shadow:none; transform: translate(0,0)}
  80%{color:lime; text-shadow:0 0 20px green; transform: translate(-2px,1px)}
  100%{color:lime; text-shadow:none;}
}
</style>
