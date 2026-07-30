<script setup>
defineProps({
  variant: { type: String, default: 'inline' }, // 'inline' | 'stacked'
  tone: { type: String, default: 'light' }, // 'light' | 'dark'
})
</script>

<template>
  <span class="wordmark" :class="[variant, tone]">
    <template v-if="variant === 'stacked'">
      <span class="line"><span class="cap">U</span>nited</span>
      <span class="line"><span class="cap">U</span>niversal</span>
      <span class="line"><span class="cap">G</span>ranites</span>
    </template>
    <template v-else>
      <span class="cap">U</span>nited&nbsp;<span class="cap">U</span>niversal&nbsp;<span class="cap">G</span>ranites
    </template>
  </span>
</template>

<style scoped>
.wordmark {
  font-family: var(--font-serif);
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-size: 0.85em;
  line-height: 1.15;
}
.wordmark.light { color: var(--stone-50); }
.wordmark.dark { color: var(--ink); }

.wordmark .cap {
  font-size: 1.35em;
  line-height: 1;
}

.wordmark.stacked {
  display: flex;
  flex-direction: column;
}
.wordmark.stacked .line {
  display: block;
}
</style>
