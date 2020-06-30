import '../css/style.css'

function getDate() {
  if (process.env.NODE_ENV === 'development') {
    console.log('development')
  } else {
    console.log('production')
  }
  let date = new Date().getFullYear()
  console.log(date)
}
getDate()