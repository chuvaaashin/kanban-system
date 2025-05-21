export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return
  const savedTheme = localStorage.getItem('theme')
  const html = document.documentElement

  if (savedTheme === 'dark') {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
})
