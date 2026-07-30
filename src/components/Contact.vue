<script setup>
import { reactive, ref } from 'vue'
import { config } from '../config'
import { materials } from '../data/materials'

const form = reactive({
  company: '',
  country: '',
  materials: [],
  volume: '',
  message: '',
})

const submitted = ref(false)
const error = ref('')

function toggleMaterial(slug) {
  const i = form.materials.indexOf(slug)
  if (i === -1) form.materials.push(slug)
  else form.materials.splice(i, 1)
}

function submit() {
  if (!form.company || !form.country || !form.message) {
    error.value = 'Please complete company name, country and a brief message before submitting.'
    return
  }
  error.value = ''
  // Demo only — no backend is wired up. In production this would post to a
  // CRM/mail endpoint; for now we confirm receipt locally.
  submitted.value = true
}
</script>

<template>
  <section id="contact" class="section contact">
    <div class="section-inner grid">
      <div class="intro-col">
        <p class="eyebrow">Partner With Us</p>
        <h2 class="section-title">Start a business inquiry.</h2>
        <p class="copy">
          Tell us about your business and the materials you're evaluating.
          A member of our export team will respond with pricing, lead times
          and sample availability.
        </p>

        <dl class="details">
          <div>
            <dt>Email</dt>
            <dd>{{ config.email }}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{{ config.phoneDisplay }}</dd>
          </div>
          <div>
            <dt>Works</dt>
            <dd>{{ config.address }}</dd>
          </div>
        </dl>
      </div>

      <form class="form" @submit.prevent="submit" v-if="!submitted">
        <div class="field">
          <label for="company">Company name</label>
          <input id="company" v-model="form.company" type="text" placeholder="Your company" />
        </div>

        <div class="field-row">
          <div class="field">
            <label for="country">Country</label>
            <input id="country" v-model="form.country" type="text" placeholder="Country of operation" />
          </div>
          <div class="field">
            <label for="volume">Order volume</label>
            <select id="volume" v-model="form.volume">
              <option value="" disabled>Select a range</option>
              <option v-for="v in config.volumeOptions" :key="v" :value="v">{{ v }}</option>
            </select>
          </div>
        </div>

        <div class="field">
          <span class="label">Materials of interest</span>
          <div class="material-chips">
            <button
              type="button"
              v-for="m in materials"
              :key="m.slug"
              class="mchip"
              :class="{ active: form.materials.includes(m.slug) }"
              @click="toggleMaterial(m.slug)"
            >
              {{ m.name }}
            </button>
          </div>
        </div>

        <div class="field">
          <label for="message">Message</label>
          <textarea id="message" v-model="form.message" rows="4" placeholder="Tell us about your requirement — application, specification, timeline."></textarea>
        </div>

        <p class="form-error" v-if="error">{{ error }}</p>

        <button type="submit" class="btn btn-outline-dark submit-btn">Submit Inquiry</button>
      </form>

      <div class="confirmation" v-else>
        <span class="eyebrow">Received</span>
        <h3>Thank you — your inquiry has been noted.</h3>
        <p>
          This is a demo build, so no message was actually sent. In production this
          form would route directly to our export team, who typically respond within
          one business day.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--stone-50);
}

.grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(2.5rem, 6vw, 5rem);
}

.copy {
  max-width: 42ch;
  margin-top: 1.4rem;
}

.details {
  margin: 3rem 0 0;
  padding-top: 2rem;
  border-top: 1px solid var(--paper-border);
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}
.details dt {
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}
.details dd {
  margin: 0.3rem 0 0;
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: var(--ink);
}

.form {
  background: var(--charcoal);
  padding: clamp(1.8rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.field, .field-row > .field {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
}

label, .label {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted-on-dark);
}

input, select, textarea {
  background: var(--charcoal-2);
  border: 1px solid var(--charcoal-border);
  color: var(--stone-50);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  padding: 0.85rem 1rem;
  outline: none;
  transition: border-color 0.4s var(--ease-slab);
}
input:focus, select:focus, textarea:focus {
  border-color: var(--gold-deep);
}
input::placeholder, textarea::placeholder {
  color: var(--stone-600);
}
textarea {
  resize: vertical;
  min-height: 6rem;
}
select {
  appearance: none;
}

.material-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-height: 9.5rem;
  overflow-y: auto;
  padding-top: 0.2rem;
}

.mchip {
  background: transparent;
  border: 1px solid var(--charcoal-border);
  color: var(--muted-on-dark);
  font-size: 0.72rem;
  padding: 0.45rem 0.8rem;
  transition: border-color 0.35s var(--ease-slab), color 0.35s var(--ease-slab), background 0.35s var(--ease-slab);
}
.mchip.active {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--charcoal);
}

.form-error {
  color: #d68a6a;
  font-size: 0.85rem;
}

.submit-btn {
  align-self: flex-start;
  border-color: rgba(245, 242, 236, 0.35);
  color: var(--stone-50);
  margin-top: 0.5rem;
}
.submit-btn:hover {
  border-color: var(--gold);
  color: var(--gold-light);
}

.confirmation {
  background: var(--charcoal);
  padding: clamp(2rem, 5vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}
.confirmation h3 {
  font-size: 1.5rem;
  color: var(--stone-50);
}
.confirmation p {
  color: var(--muted-on-dark);
  max-width: 46ch;
}

@media (max-width: 880px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .field-row {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
}
</style>
