/* eslint-disable */
let defaultCity = "济南"
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {
  console.log(e)
}
export default {
  city: defaultCity
}