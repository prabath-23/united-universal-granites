// Lightweight, dependency-free scroll reveal. Applies `.is-visible` to any
// element carrying the `.reveal` class once it enters the viewport. Deliberately
// slow/understated per brand direction — see .reveal transition timing in style.css.
export function initReveal(root = document) {
  const els = root.querySelectorAll('.reveal:not(.is-visible)')
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach((el) => el.classList.add('is-visible'))
    return
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  )
  els.forEach((el) => observer.observe(el))
  return observer
}
