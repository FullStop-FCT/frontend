import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://helpin-hand.ey.r.appspot.com/rest/',
})

export const storageProfilePic = axios.create({
  baseURL: 'https://helpin-hand.ey.r.appspot.com/gcs/imagens-helpin-hand/',
})

