<script setup>
import { computed, ref } from 'vue'
import { families, materials } from '../data/materials'
import GraniteSwatch from './GraniteSwatch.vue'

const activeFamily = ref('all')

const filtered = computed(() => {
  if (activeFamily.value === 'all') return materials
  return materials.filter((m) => m.family === activeFamily.value)
})

const counts = computed(() => {
  const map = { all: materials.length }
  families.forEach((f) => {
    map[f.id] = materials.filter((m) => m.family === f.id).length
  })
  return map
})
</script>

<template>
  <section id="materials" class="section catalog">
    <div class="section-inner">
      <p class="eyebrow">The Catalogue</p>
      <h2 class="section-title">Twenty-four materials, six families.</h2>
      <p class="intro">
        Every material below is quarried, cut and finished under our own production
        oversight. Filter by colour family to browse, or get in touch for physical
        samples and slab-specific documentation.
      </p>

      <div class="filters" role="tablist">
        <button
          class="chip"
          :class="{ active: activeFamily === 'all' }"
          @click="activeFamily = 'all'"
        >
          All <span>{{ counts.all }}</span>
        </button>
        <button
          v-for="f in families"
          :key="f.id"
          class="chip"
          :class="{ active: activeFamily === f.id }"
          @click="activeFamily = f.id"
        >
          {{ f.label }} <span>{{ counts[f.id] }}</span>
        </button>
      </div>

      <div class="grid">
        <GraniteSwatch v-for="m in filtered" :key="m.slug" :material="m" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.catalog {
  background: var(--stone-50);
}

.intro {
  max-width: 58ch;
  margin-top: 1.4rem;
  color: var(--muted);
  font-size: 1rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 2.6rem;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid var(--paper-border);
}

.chip {
  background: transparent;
  border: 1px solid var(--paper-border);
  color: var(--muted);
  font-size: 0.76rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.55rem 1.05rem;
  transition: border-color 0.4s var(--ease-slab), color 0.4s var(--ease-slab), background 0.4s var(--ease-slab);
}
.chip span {
  color: var(--stone-300);
  margin-left: 0.4rem;
  font-size: 0.7em;
}
.chip:hover {
  border-color: var(--gold-deep);
  color: var(--ink);
}
.chip.active {
  background: var(--charcoal);
  border-color: var(--charcoal);
  color: var(--stone-50);
}
.chip.active span {
  color: var(--gold-light);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.1rem;
  margin-top: 2.4rem;
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.7rem;
  }
  .filters {
    gap: 0.5rem;
  }
  .chip {
    padding: 0.5rem 0.85rem;
    font-size: 0.7rem;
  }
}
</style>
