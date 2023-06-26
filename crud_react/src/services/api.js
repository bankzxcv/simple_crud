import axios from "axios"

export const API_URL = {
  service: "http://localhost:5001/api",
}

export const axiosInstance = axios.create({
  baseURL: API_URL.service,
  headers: {
    "Content-type": "application/json",
  },
})
