<script setup>
// Flat, restrained reinterpretation of the client's existing gold engraved-letter
// mark (see brief) — the red/yellow field and glossy cube render are dropped in
// favour of a single gold line-mark on charcoal, consistent with the brand direction.
defineProps({
  size: { type: Number, default: 40 },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="1.5" y="1.5" width="45" height="45" transform="rotate(45 24 24)" stroke="var(--gold)" stroke-width="1" />
    <path
      d="M17 15v11.5c0 4 2.8 6.2 7 6.2s7-2.2 7-6.2V15"
      stroke="var(--gold)"
      stroke-width="2.1"
      stroke-linecap="square"
    />
  </svg>
</template>
