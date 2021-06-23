const checkSupport = () => {
  return navigator.geolocation?true:false
}

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position.coords)
    }, (err) => {
      reject(err)
    })
  })
}

export default {checkSupport, getCurrentLocation}