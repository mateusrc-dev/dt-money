import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://dt-money-ten-steel.vercel.app',
})
