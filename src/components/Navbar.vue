<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import LogoMark from './LogoMark.vue'
import Wordmark from './Wordmark.vue'

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function go(id) {
  menuOpen.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header class="nav" :class="{ scrolled: scrolled || menuOpen }">
    <div class="nav-inner">
      <a class="brand" href="#" @click.prevent="go('top')">
        <LogoMark :size="30" />
        <Wordmark variant="inline" tone="light" />
      </a>

      <nav class="links">
        <button @click="go('materials')">Materials</button>
        <button @click="go('process')">Process</button>
        <button @click="go('reach')">Global Reach</button>
        <button @click="go('contact')">Contact</button>
      </nav>

      <button class="btn btn-gold cta" @click="go('contact')">Request a Quote</button>

      <button class="burger" aria-label="Toggle menu" @click="menuOpen = !menuOpen">
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>

    <div class="mobile-menu" v-if="menuOpen">
      <button @click="go('materials')">Materials</button>
      <button @click="go('process')">Process</button>
      <button @click="go('reach')">Global Reach</button>
      <button @click="go('contact')">Contact</button>
      <button class="btn btn-gold" @click="go('contact')">Request a Quote</button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  transition: background 0.6s var(--ease-slab), border-color 0.6s var(--ease-slab);
  border-bottom: 1px solid transparent;
}
.nav.scrolled {
  background: rgba(26, 26, 25, 0.92);
  backdrop-filter: blur(10px);
  border-color: var(--charcoal-border);
}

.nav-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.1rem clamp(1.5rem, 5vw, 3rem);
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-right: auto;
}

.links {
  display: flex;
  gap: 2.1rem;
}
.links button {
  background: none;
  border: none;
  color: var(--muted-on-dark);
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0;
  transition: color 0.4s var(--ease-slab);
}
.links button:hover {
  color: var(--gold-light);
}

.cta {
  padding: 0.75rem 1.6rem;
}

.burger {
  display: none;
  background: none;
  border: none;
  width: 28px;
  height: 20px;
  position: relative;
}
.burger span,
.burger span::before,
.burger span::after {
  content: '';
  position: absolute;
  left: 0;
  width: 28px;
  height: 1px;
  background: var(--stone-50);
  transition: transform 0.4s var(--ease-slab), opacity 0.3s;
}
.burger span { top: 9px; }
.burger span::before { top: -8px; }
.burger span::after { top: 8px; }
.burger span.open { background: transparent; }
.burger span.open::before { transform: translateY(8px) rotate(45deg); }
.burger span.open::after { transform: translateY(-8px) rotate(-45deg); }

.mobile-menu {
  display: none;
}

@media (max-width: 880px) {
  .links, .cta { display: none; }
  .burger { display: block; }
  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 0 1.5rem 2rem;
    background: rgba(26, 26, 25, 0.98);
  }
  .mobile-menu button {
    background: none;
    border: none;
    text-align: left;
    color: var(--stone-100);
    font-size: 0.95rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.4rem 0;
  }
  .mobile-menu .btn {
    margin-top: 0.5rem;
    width: fit-content;
  }
}
</style>
