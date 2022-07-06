import { $axios } from '../lib/axios'

export const login = async (data) => {
  try {
    const response = await $axios.post('/users/login', data)
    return response
  } catch (error) {
    throw error
  }
}

export const register = async (data) => {
  try {
    const response = await $axios.post('/users/register', data)
    return response.status
  } catch (error) {
    throw error
  }
}

export const getSingleCourse = async (id) => {
  try {
    const response = await $axios.get(`/courses/fetch/${id}`)
    return response
  } catch (error) {
    throw error
  }
}

export const coursePusher = async (course) => {
  try {
    const response = await $axios.post('/courses', course)
    return response
  } catch (error) {
    throw error
  }
}

export const updateCourse = async (_id, course) => {
  try {
    const response = await $axios.patch(`/courses/${_id}`, course)
    return response
  } catch (error) {
    throw error
  }
}
export const allCourseFetcher = async () => {
  try {
    const response = await $axios.get('/courses/all')
    return response
  } catch (error) {
    throw error
  }
}

export const teacherCourses = async () => {
  try {
    const response = await $axios.get('/courses/me')
    return response
  } catch (error) {
    throw error
  }
}

export const courseRemover = async (id) => {
  try {
    const response = await $axios.delete(`/courses/${id}`)
    return response
  } catch (error) {
    throw error
  }
}

export const enrollRequestSender = async (id) => {
  try {
    const response = await $axios.post(`/courses/enroll_req/${id}`)
    return response
  } catch (error) {
    throw error
  }
}

export const categoryCourseFetcher = async (item) => {
  try {
    const response = await $axios.get(`/courses/category?cat=${item}`)
    return response
  } catch (error) {
    throw error
  }
}

export const studentCourseFetcher = async () => {
  try {
    const response = await $axios.get('/courses/student/me')
    return response
  } catch (error) {
    throw new error()
  }
}
