<script setup>
import LogoMark from './LogoMark.vue'
import Wordmark from './Wordmark.vue'
import { config } from '../config'

const year = new Date().getFullYear()

function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="col brand-col">
        <a class="brand" href="#top" @click.prevent="go('top')">
          <LogoMark :size="30" />
          <Wordmark variant="inline" tone="light" />
        </a>
        <p>Manufacturer &amp; exporter of monument and memorial granite.</p>
      </div>

      <div class="col">
        <span class="col-label">Site</span>
        <button @click="go('materials')">Materials</button>
        <button @click="go('process')">Process</button>
        <button @click="go('reach')">Global Reach</button>
        <button @click="go('contact')">Contact</button>
      </div>

      <div class="col">
        <span class="col-label">Contact</span>
        <span>{{ config.email }}</span>
        <span>{{ config.phoneDisplay }}</span>
        <span>{{ config.address }}</span>
      </div>
    </div>

    <div class="footer-bottom">
      <span>&copy; {{ year }} United Universal Granites. All rights reserved.</span>
      <span class="placeholder-tag">Demo site — content and imagery are placeholders.</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--charcoal);
  border-top: 1px solid var(--charcoal-border);
  padding: clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 5rem) 1.8rem;
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 2.5rem;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.4rem;
}

.brand-col p {
  color: var(--muted-on-dark);
  font-size: 0.88rem;
  max-width: 32ch;
}

.col-label {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold-deep);
  margin-bottom: 0.4rem;
}

.col button {
  background: none;
  border: none;
  text-align: left;
  color: var(--muted-on-dark);
  font-size: 0.88rem;
  padding: 0;
  transition: color 0.4s var(--ease-slab);
}
.col button:hover {
  color: var(--gold-light);
}

.col span {
  color: var(--muted-on-dark);
  font-size: 0.88rem;
}

.footer-bottom {
  max-width: 1280px;
  margin: 3rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid var(--charcoal-border);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.6rem;
  color: var(--muted-on-dark);
  font-size: 0.78rem;
}

@media (max-width: 700px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .footer-bottom {
    flex-direction: column;
  }
}
</style>
