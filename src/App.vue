<script setup>
import { nextTick, onMounted, ref } from 'vue'
import Preloader from './components/Preloader.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import MaterialsCatalog from './components/MaterialsCatalog.vue'
import Process from './components/Process.vue'
import GlobalReach from './components/GlobalReach.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import { initReveal } from './utils/useReveal'

const loading = ref(true)

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

function onPreloaderDone() {
  loading.value = false
  document.body.style.overflow = ''
  nextTick(() => initReveal())
}
</script>

<template>
  <Preloader v-if="loading" @done="onPreloaderDone" />

  <Navbar />
  <main>
    <Hero />
    <MaterialsCatalog />
    <Process />
    <GlobalReach />
    <Contact />
  </main>
  <Footer />
</template>
