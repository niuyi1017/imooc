require('./index.scss')

let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth

let html = document.getElementsByTagName('html')[0]

html.style.fontSize = htmlWidth / 10 + 'px'

window.addEventListener('resize',(e) => {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  html.style.fontSize = htmlWidth / 10 + 'px'
})