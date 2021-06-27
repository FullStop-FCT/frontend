module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['https://storage.googleapis.com/imagens-helpin-hand'],
  },
  env: {
    REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  },
}