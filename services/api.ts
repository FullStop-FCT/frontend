import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://helpinhand-318217.ey.r.appspot.com/rest/',
})

export const storageProfilePic = axios.create({
  baseURL: 'https://helpinhand-318217.ey.r.appspot.com/gcs/helpinhand-318217.appspot.com/',
})

