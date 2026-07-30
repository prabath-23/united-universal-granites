<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['done'])
const drawn = ref(false)
const leaving = ref(false)

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    emit('done')
    return
  }
  requestAnimationFrame(() => {
    drawn.value = true
  })
  const total = window.setTimeout(() => {
    leaving.value = true
    window.setTimeout(() => emit('done'), 700)
  }, 1500)
  return () => window.clearTimeout(total)
})
</script>

<template>
  <div class="preloader" :class="{ 'is-leaving': leaving }">
    <div class="preloader-mark">
      <span class="preloader-initials">UUG</span>
      <span class="preloader-line" :class="{ 'is-drawn': drawn }"></span>
    </div>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--charcoal);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.7s var(--ease-slab);
}
.preloader.is-leaving {
  opacity: 0;
}

.preloader-mark {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
}

.preloader-initials {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  letter-spacing: 0.3em;
  color: var(--stone-100);
  opacity: 0.85;
}

.preloader-line {
  width: 64px;
  height: 1px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.1s var(--ease-slab);
}
.preloader-line.is-drawn {
  transform: scaleX(1);
}
</style>
