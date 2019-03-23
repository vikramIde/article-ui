import request from '@/utils/request'

const bast_url = 'http://127.0.0.1:8000/api'
// const bast_url = 'https://scrapper-vikram.herokuapp.com/'

export function fetchList() {
  return request({
    url: bast_url + '/admin/users/get',
    method: 'get'
  })
}

export function fetchLocationList() {
  return request({
    url: bast_url + '/admin/locations/get',
    method: 'get'
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: bast_url + '/articles',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

export function updateUserStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: bast_url + '/admin/users/update/status',
    method: 'post',
    data
  })
}
