import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://helpin-hand.ey.r.appspot.com/rest/',
})

export const storage = axios.create({
  baseURL: 'https://helpin-hand.ey.r.appspot.com/gcs/helpin-hand.appspot.com/',
})