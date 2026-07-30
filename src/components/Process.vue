<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { config } from '../config'

const steps = config.processSteps

// Crop focus per photo, so busy real-world shots (crane rigging, machinery
// signage) favour the part of the frame that best illustrates each stage.
const imagePosition = {
  quarry: 'center 40%',
  cut: 'center 100%',
  polished: 'center 55%',
  finished: 'center 95%',
  shipped: 'center 45%',
}

// A couple of source photos are close to the container's aspect ratio, so
// `cover` alone leaves little vertical overflow for backgroundPosition to
// crop with — zoom those in first so the position offset has room to work.
const imageZoom = {
  cut: '165% auto',
  finished: '145% auto',
}

const track = ref(null)
const activeIndex = ref(0)
let ticking = false

function computeActive() {
  ticking = false
  const el = track.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  const total = rect.height - vh
  if (total <= 0) return
  const progress = Math.min(1, Math.max(0, -rect.top / total))
  const idx = Math.min(steps.length - 1, Math.floor(progress * steps.length))
  activeIndex.value = idx
}

function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(computeActive)
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  computeActive()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <section id="process" class="section process">
    <div class="section-inner head">
      <p class="eyebrow">Quarry to Monument</p>
      <h2 class="section-title">A material's full journey.</h2>
    </div>

    <div class="track" ref="track" :style="{ height: `${steps.length * 90}vh` }">
      <div class="sticky-frame">
        <div class="panel">
          <div
            v-for="(step, i) in steps"
            :key="step.key"
            class="panel-layer"
            :class="{ show: i === activeIndex }"
          >
            <div
              class="panel-visual"
              :style="{
                backgroundImage: `url(${step.image})`,
                backgroundPosition: imagePosition[step.key],
                backgroundSize: imageZoom[step.key] || 'cover',
              }"
            >
              <span class="stage-index">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <div class="panel-scrim"></div>
          </div>
          <span class="placeholder-tag panel-tag">Stock photography — illustrative, not our own facility</span>
        </div>

        <div class="steps-rail">
          <div
            v-for="(step, i) in steps"
            :key="step.key"
            class="step-item"
            :class="{ active: i === activeIndex }"
          >
            <span class="step-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="step-copy">
              <h3>{{ step.title }}</h3>
              <p>{{ step.copy }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile/tablet: the pinned scroll-crossfade above doesn't translate to a
         short viewport, so each stage gets its own straightforward image+text
         card instead — same content, simpler presentation. -->
    <div class="mobile-journey section-inner">
      <div v-for="(step, i) in steps" :key="step.key" class="mobile-card reveal">
        <div
          class="mobile-visual"
          :style="{
            backgroundImage: `url(${step.image})`,
            backgroundPosition: imagePosition[step.key],
            backgroundSize: imageZoom[step.key] || 'cover',
          }"
        >
          <span class="stage-index">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="panel-scrim"></div>
        </div>
        <div class="step-copy">
          <h3>{{ step.title }}</h3>
          <p>{{ step.copy }}</p>
        </div>
      </div>
      <span class="placeholder-tag">Stock photography — illustrative, not our own facility</span>
    </div>
  </section>
</template>

<style scoped>
.process {
  background: var(--charcoal);
  padding-bottom: 0;
}
.process .eyebrow { color: var(--gold-light); }
.process .section-title { color: var(--stone-50); }

.head {
  padding-bottom: 3rem;
}

.track {
  position: relative;
}

.sticky-frame {
  position: sticky;
  top: 0;
  height: 100svh;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: clamp(2rem, 5vw, 5rem);
  padding: 0 clamp(1.5rem, 6vw, 5rem);
  max-width: 1400px;
  margin: 0 auto;
}

.panel {
  position: relative;
  aspect-ratio: 4 / 5;
  background: var(--charcoal-2);
  overflow: hidden;
  border: 1px solid var(--charcoal-border);
}

.panel-layer {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.4s var(--ease-slab);
}
.panel-layer.show {
  opacity: 1;
}

.panel-visual {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 1.6rem;
  background-size: cover;
  background-position: center;
  /* Colour-graded toward the brand's charcoal/gold register so real photography
     of varying tone reads as one cohesive system rather than a stock-photo grab-bag. */
  filter: grayscale(0.45) sepia(0.18) contrast(1.08) brightness(0.85) saturate(1.1);
}

.panel-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(20, 20, 19, 0) 45%, rgba(20, 20, 19, 0.75) 100%);
  pointer-events: none;
}

.stage-index {
  font-family: var(--font-serif);
  font-size: 5rem;
  color: rgba(245, 242, 236, 0.5);
  line-height: 1;
  position: relative;
  z-index: 1;
}

.panel-tag {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  color: rgba(245, 242, 236, 0.65);
}

.steps-rail {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-item {
  display: flex;
  gap: 1.4rem;
  padding: 1.1rem 0;
  border-top: 1px solid var(--charcoal-border);
  opacity: 0.4;
  transition: opacity 0.7s var(--ease-slab);
}
.step-item.active {
  opacity: 1;
}

.step-num {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  color: var(--gold);
  padding-top: 0.1rem;
}

.step-copy h3 {
  font-size: 1.3rem;
  color: var(--stone-50);
  font-weight: 400;
}
.step-copy p {
  color: var(--muted-on-dark);
  font-size: 0.9rem;
  margin-top: 0.5rem;
  max-width: 40ch;
}

.mobile-journey {
  display: none;
}

@media (max-width: 880px) {
  .track {
    display: none;
  }

  .mobile-journey {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding-top: 1rem;
  }

  .mobile-card {
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
  }

  .mobile-visual {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background-size: cover;
    border: 1px solid var(--charcoal-border);
    display: flex;
    align-items: flex-end;
    padding: 1.1rem;
    filter: grayscale(0.45) sepia(0.18) contrast(1.08) brightness(0.85) saturate(1.1);
  }

  .mobile-visual .stage-index {
    font-size: 3.2rem;
  }

  .mobile-journey > .placeholder-tag {
    align-self: flex-start;
    margin-top: -1.5rem;
  }

  .mobile-card .step-copy h3 {
    font-size: 1.25rem;
  }
}
</style>
