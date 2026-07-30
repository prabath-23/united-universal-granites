<script setup>
import { onMounted, ref } from 'vue'
import { exportCountries, tierLabels } from '../data/exportCountries'

const mapHost = ref(null)
const tooltip = ref({ show: false, x: 0, y: 0, name: '', label: '' })

const byId = new Map(exportCountries.map((c) => [c.id, c]))

async function loadMap() {
  const res = await fetch(`${import.meta.env.BASE_URL}images/world-map.svg`)
  const svgText = await res.text()
  if (!mapHost.value) return
  mapHost.value.innerHTML = svgText

  const svg = mapHost.value.querySelector('svg')
  if (!svg) return
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')

  svg.querySelectorAll('path').forEach((el) => {
    const entry = byId.get(el.id)
    el.classList.add('country')
    if (entry) {
      el.classList.add(`tier-${entry.tier}`)
      el.dataset.name = entry.name
      el.dataset.tier = tierLabels[entry.tier]
    }
  })

  svg.addEventListener('mousemove', onMove)
  svg.addEventListener('mouseleave', () => (tooltip.value.show = false))
}

function onMove(e) {
  const el = e.target.closest('path.country')
  if (!el || !el.dataset.name) {
    tooltip.value.show = false
    return
  }
  const hostRect = mapHost.value.getBoundingClientRect()
  tooltip.value = {
    show: true,
    x: e.clientX - hostRect.left,
    y: e.clientY - hostRect.top,
    name: el.dataset.name,
    label: el.dataset.tier,
  }
}

onMounted(loadMap)
</script>

<template>
  <div class="world-map">
    <div class="map-host" ref="mapHost"></div>

    <div
      class="tooltip"
      v-if="tooltip.show"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
    >
      <strong>{{ tooltip.name }}</strong>
      <span>{{ tooltip.label }}</span>
    </div>

    <div class="legend">
      <span class="legend-item" v-for="tier in [4, 3, 2, 1]" :key="tier">
        <span class="swatch" :class="`tier-${tier}`"></span>
        {{ tierLabels[tier] }}
      </span>
      <span class="legend-item">
        <span class="swatch tier-0"></span>
        Not yet served
      </span>
    </div>
  </div>
</template>

<style scoped>
.world-map {
  position: relative;
}

.map-host {
  width: 100%;
  line-height: 0;
}

.map-host :deep(svg) {
  width: 100%;
  height: auto;
  display: block;
}

.map-host :deep(.country) {
  fill: var(--charcoal-3);
  stroke: var(--charcoal);
  stroke-width: 0.5;
  transition: fill 0.4s var(--ease-slab);
}

.map-host :deep(.tier-1) { fill: #5a4b2c; }
.map-host :deep(.tier-2) { fill: #8a6f34; }
.map-host :deep(.tier-3) { fill: #b58f3c; }
.map-host :deep(.tier-4) { fill: var(--gold); }

.map-host :deep(.country:hover) {
  fill: var(--gold-light);
}

.tooltip {
  position: absolute;
  transform: translate(-50%, -130%);
  background: var(--charcoal);
  border: 1px solid var(--charcoal-border);
  padding: 0.5rem 0.8rem;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  white-space: nowrap;
  z-index: 2;
}
.tooltip strong {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 0.95rem;
  color: var(--stone-50);
}
.tooltip span {
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--gold-light);
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.6rem;
  margin-top: 1.8rem;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.76rem;
  color: var(--muted-on-dark);
  letter-spacing: 0.02em;
}

.swatch {
  width: 12px;
  height: 12px;
  display: inline-block;
  flex: none;
}
.swatch.tier-0 { background: var(--charcoal-3); }
.swatch.tier-1 { background: #5a4b2c; }
.swatch.tier-2 { background: #8a6f34; }
.swatch.tier-3 { background: #b58f3c; }
.swatch.tier-4 { background: var(--gold); }
</style>
