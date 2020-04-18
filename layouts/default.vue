<template>
  <div>
    <nuxt />
  </div>
</template>

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
</style>
