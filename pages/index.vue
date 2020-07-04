<template>
  <main class="min-h-screen overflow-hidden">
    <Topbar />
    <Desktop class="desktop relative bg-gray-700" />
  </main>
</template>

<script>
export default {
  components: {
    Topbar: () => import('~/components/Topbar.vue'),
    Desktop: () => import('~/components/Desktop.vue')
  }
}
</script>

<style lang="css" scoped>
.desktop {
  height: calc(100vh - 2.75rem);
  background-image: url('/images/dark-wallpaper.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
