module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['https://storage.googleapis.com/imagens-helpin-hand'],
  },
  env: {
    REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    CERTIFICATE_KEY: process.env.CERTIFICATE_KEY,
  },
  images: {
    loader: "imgix",
    path: "",
  }

}