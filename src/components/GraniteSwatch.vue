<script setup>
import { ref } from 'vue'
import { graniteBackground } from '../utils/graniteTexture'
import { families } from '../data/materials'

const props = defineProps({
  material: { type: Object, required: true },
})

// `active` is only driven by click/keyboard — used as the reveal state on touch
// devices (and for keyboard focus). Devices with a real pointer get the same
// reveal purely from CSS `:hover` below, so a mouse click after hovering can't
// fight the hover state and flip it back off.
const active = ref(false)
const bg = graniteBackground(props.material.tone, props.material.fleck, props.material.slug)
const familyLabel = families.find((f) => f.id === props.material.family)?.label ?? ''

function toggle() {
  active.value = !active.value
}
</script>

<template>
  <article
    class="swatch"
    :class="{ active }"
    tabindex="0"
    @click="toggle"
    @keydown.enter="toggle"
  >
    <div class="texture" :style="{ backgroundImage: bg }"></div>
    <div class="scrim"></div>

    <span class="placeholder-tag swatch-tag">Placeholder texture</span>

    <div class="info">
      <span class="family">{{ familyLabel }}</span>
      <h3 class="name">{{ material.name }}</h3>
      <p class="desc">{{ material.description }}</p>
    </div>
  </article>
</template>

<style scoped>
.swatch {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--charcoal);
  cursor: pointer;
  outline: none;
}

.texture {
  position: absolute;
  inset: 0;
  background-size: 160% 160%;
  background-position: 30% 40%;
  transition: background-size 1.1s var(--ease-slab), background-position 1.1s var(--ease-slab), transform 1.1s var(--ease-slab);
}
.swatch.active .texture,
.swatch:hover .texture,
.swatch:focus-visible .texture {
  background-size: 240% 240%;
  background-position: 55% 60%;
}

.scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(20, 20, 19, 0) 30%, rgba(20, 20, 19, 0.55) 72%, rgba(20, 20, 19, 0.92) 100%);
  transition: opacity 0.6s var(--ease-slab);
}

.swatch-tag {
  position: absolute;
  top: 0.8rem;
  left: 0.9rem;
  color: rgba(245, 242, 236, 0.7);
}

.info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.15rem 1.25rem;
}

.family {
  display: block;
  font-size: 0.64rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold-light);
  margin-bottom: 0.35rem;
}

.name {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: var(--stone-50);
  font-weight: 400;
}

.desc {
  color: var(--muted-on-dark);
  font-size: 0.82rem;
  line-height: 1.55;
  margin-top: 0.6rem;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.7s var(--ease-slab), opacity 0.5s var(--ease-slab);
}
.swatch.active .desc,
.swatch:hover .desc,
.swatch:focus-visible .desc {
  max-height: 8em;
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .texture, .desc { transition: none; }
}
</style>
