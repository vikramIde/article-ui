import request from '@/utils/request'

const bast_url = 'http://127.0.0.1:8000/'
// const bast_url = 'https://scrapper-vikram.herokuapp.com/'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: bast_url + '/api/auth',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: bast_url + '/api/auth/user/getinfo',
    method: 'get'
  })
}

