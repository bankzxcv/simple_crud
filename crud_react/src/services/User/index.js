import { axiosInstance } from "../api"

export const getTotalUser = async ({ search = "" }) => {
  try {
    const url = "/user/count" + (search ? `?search=${search}` : "")
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getUser = async ({ search = "", skip = 0, limit = 10 }) => {
  try {
    const url = "/user?" + (search ? `search=${search}&` : "") + `skip=${skip}&limit=${limit}`
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getUserById = async id => {
  try {
    const response = await axiosInstance.get(`/user/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const createUser = async user => {
  try {
    const response = await axiosInstance.post("/user", user)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const updateUser = async user => {
  try {
    const response = await axiosInstance.put(`/user/${user.id}`, user)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteUser = async id => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
